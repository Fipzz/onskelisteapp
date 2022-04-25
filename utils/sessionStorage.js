const SessionModel = require("./../models/SessionModel.js");
const { Shopify } = require("@shopify/shopify-api");
//const Cryptr = require("cryptr");
const {
  LoadSession,
  DeleteSession,
  StoreSession,
} = require("../pages/actions/restAPI.js");
//const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeCallback = async (session) => {
  //StoreSession(session.id, session.shop, cryption.encrypt(session));
  console.log(
    "Storeing session: " + JSON.stringify(session) + " as if encrypted: "
    //cryption.encrypt(JSON.stringify(session))
  );
  StoreSession(session.id, session.shop, JSON.stringify(session));
  return true;
};

const loadCallback = async (id) => {
  console.log("NOW LOADING SESSION: ", id);
  const res = await LoadSession(id)
    .then((res) => {
      let session = JSON.parse(res);
      console.log("ss res ->", session);
      return session;
    })
    .then((res) => {
      console.log("ss res 2->", res);
      return res;
    });
};

const deleteCallback = async (id) => {
  DeleteSession(id);
  return true;
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

module.exports = sessionStorage;
