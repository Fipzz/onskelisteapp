import Shopify from "@shopify/shopify-api";
import { MemorySessionStorage } from "@shopify/shopify-api/dist/auth/session";
import { Context } from "@shopify/shopify-api/dist/context";
import { getSessionToken } from "@shopify/app-bridge-utils";

const accessToken = "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";

const shop = Context.SESSION_STORAGE;

// export const getAccessToken = async () => {
//   const client = new Shopify.Clients.Rest(
//     "Context.SESSION_STORAGE",
//     accessToken
//   );

//   const data = await client.get({
//     path: "themes",
//   });
//   console.log(data);
//   return data;
// };

export const getAssetPath = async (url) => {
  const client = new Shopify.Clients.Rest(``, accessToken);
  console.log(client);
  const data = await client.get({
    path: "themes",
  });
  console.log(data);
  return data;
};

export const getShopInfo = async () => {
  const client = new Shopify.Clients.Rest(
    "grafikr-test-S.myshopify.com",
    accessToken
  );
  const data = await client.get({
    path: "shop",
  });
  console.log(data);
};
