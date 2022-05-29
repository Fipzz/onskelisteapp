const { Shopify } = require("@shopify/shopify-api");
const {
  LoadSession,
  DeleteSession,
  StoreSession,
} = require("../pages/actions/restAPI.js");

const storeCallback = async (session) => {
  console.log(
    "Storeing session: " + session.shop + " with id: " + session.id + " #"
  );

  let currentSession = await loadCallback(session.id);

  if (currentSession) {
    if (session.accessToken) {
      var res = await StoreSession(
        session.id,
        session.shop,
        JSON.stringify(session)
      );
      return res;
    } else if (!currentSession.accessToken) {
      var res = await StoreSession(
        session.id,
        session.shop,
        JSON.stringify(session)
      );
      return res;
    } else if (currentSession.accessToken && !session.accessToken) {
      console.log("Trying to overide token");
      return true;
    }
  } else {
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
      return res;
    })
    .then((res) => {
      return res;
    });

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
