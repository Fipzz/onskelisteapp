const SessionModel = require("./../models/SessionModel.js");
const { Shopify } = require("@shopify/shopify-api");
//const Cryptr = require("cryptr");
//const cryption = new Cryptr(process.env.ENCRYPTION_STRING);
const {
  LoadSession,
  DeleteSession,
  StoreSession,
} = require("../pages/actions/restAPI.js");

const storeCallback = async (session) => {
  console.log(
    "Storeing session: " + session.shop + " with id: " + session.id + " #"
  );
  console.log(session);

  let currentSession = await loadCallback(session.id);

  //console.log("Loaded current session:", currentSession);
  if (currentSession) {
    if (!currentSession.accessToken && session.accessToken) {
      //console.log("went here 2");
      var res = await StoreSession(
        session.id,
        session.shop,
        JSON.stringify(session)
      );
      return res;
    } else if (session.accessToken) {
      //console.log("went here 3");
      var res = await StoreSession(
        session.id,
        session.shop,
        JSON.stringify(session)
      );
      return res;
    } else if (!session.accessToken && currentSession.accessToken) {
      console.log("trying to override with no token");
      return true;
    }
    //console.log("went here 4");
    return true;
  } else {
    //console.log("went here 5");
    var res = await StoreSession(
      session.id,
      session.shop,
      JSON.stringify(session)
    );
    return res;
  }
};

const loadCallback = async (id) => {
  console.log("Now loading session with id: ", id);

  const res = await LoadSession(id)
    .then((res) => {
      //console.log("ss res ->", res);
      return res;
    })
    .then((res) => {
      //console.log("ss res 2->", res);
      return res;
    });

  //console.log("Session storage resulst -> ", res);
  return res;
};

const deleteCallback = async (id) => {
  console.log("Now deleting session with id: ", id);
  DeleteSession(id);
  return true;
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

module.exports = sessionStorage;
