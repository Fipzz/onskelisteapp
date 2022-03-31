/**
 * Based on the Redis example from shopify-node-api [Accessed: May 19, 2021]
 * https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md
 */

const SessionModel = require("./../models/SessionModel.js");
const { Shopify } = require("@shopify/shopify-api");
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeCallback = async (session) => {
  const result = await SessionModel.findOne({ id: session.id });

  console.log("Went in here and stored: ", session);

  if (result === null) {
    await SessionModel.create({
      id: session.id,
      session: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    });
  } else {
    await SessionModel.findOneAndUpdate(
      { id: session.id },
      {
        session: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      }
    );
  }

  return true;
};

const loadCallback = async (id) => {
  const sessionResult = await SessionModel.findOne({ id });
  if (sessionResult.session.length > 0) {
    return JSON.parse(cryption.decrypt(sessionResult.session));
  }
  return undefined;
};

const deleteCallback = async (id) => {
  await SessionModel.deleteMany({ id });
  return true;
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

module.exports = sessionStorage;
