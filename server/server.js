import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion, DataType } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import restAPI, { createMerchant } from "./../pages/actions/restAPI.js";
import standardSettings from "./../pages/assets/json/standardSettings.json";

const cors = require("cors");
require("dotenv").config();

import mongoose from "mongoose";
const sessionStorage = require("./../utils/sessionStorage.js");

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("--> There was an error connecting to MongoDB:", err.message);
    } else {
      console.log("--> Connected to MongoDB");
    }
  }
);

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: sessionStorage,
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
console.log("Active shops: ", ACTIVE_SHOPIFY_SHOPS);

// Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
//   path: "/webhooks",
//   webhookHandler: async (topic, shop, body) =>
//     delete ACTIVE_SHOPIFY_SHOPS[shop],
// });

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        let id = ctx.state.shopify.id.split("_");

        createMerchant(id[1], shop, standardSettings).then((res) => {
          console.log(res);
        });

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("/products", async (ctx) => {
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
    const products = await client.get({
      path: "products",
    });

    ctx.body = products;
    ctx.status = 200;
  });

  router.get("/shop", async (ctx) => {
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    // Create a new client for the specified shop.
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const data = await client.get({
      path: "shop",
    });
    let id = session.id.split("_");
    data.id = id[1];
    data.token = session.accessToken;

    ctx.body = data;
    ctx.status = 200;
  });

  router.get("/getTheme", async (ctx) => {
    const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    // Create a new client for the specified shop.
    console.log(
      "Getting current theme with session: " +
        session.shop +
        " And accessToken: " +
        session.accessToken
    );

    console.log("TEST: ", process.env.NODE_ENV); // WORKS

    //Get list of themes for shop
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    const data = await client.get({
      path: "themes",
    });
    //Find main theme for shop
    let themeID;

    data.body.themes.forEach((theme) => {
      if ((theme.role = "main")) {
        themeID = theme.id;
      }
    });

    const ress = await client.get({
      path: "themes/" + themeID + "/assets",
      query: { "asset%5Bkey%5D": "assets/ajax-loader.gif" },
    });

    const result = await client.get({
      path: "themes/" + themeID + "/assets",
    });
    console.log(ress);
    ctx.body = ress;
    ctx.status = 200;
  });

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("/Dashboard", handleRequest);

  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;
    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
