import standardSession from "../assets/json/standardSession.json";
import stdMerchant from "../../pages/assets/json/standardMerchant.json";

const restAPI = "wishlist-api-shopify.herokuapp.com";

export const updateMerchantSettings = (url, query) => {
  //Debug
  if (process.env.NODE_ENV == "development") {
    console.log("Here are the updated settings being sent --> \n", query);
  }

  return fetch(`https://${url}/app-settings`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((ress) => {
      return ress.json();
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
};

export const getMerchantSettings = (baseURL, merchantURL) => {
  return fetch(
    `https://${baseURL}/app-settings/all?websiteURL=${merchantURL}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
};

export const createMerchant = (merchantID, websiteURL, settings) => {
  console.log("Trying to create new user # ");
  const newMerchant = stdMerchant;

  newMerchant.merchantID = merchantID;
  newMerchant.websiteURL = websiteURL;
  newMerchant.settings = settings;

  return fetch(`https://${restAPI}/app-settings/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newMerchant),
  })
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.log("Merchant already exitst! #");
    });
};

export const StoreSession = (id, websiteURL, session) => {
  let query = standardSession;
  query.id = id;
  query.shop = websiteURL;
  query.session = JSON.parse(session);

  return fetch(`https://${restAPI}/session`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.warn(error);
      console.log("ERROR STOREING SESSION");
    });
};

export const LoadSession = async (id) => {
  var result = await fetch(`https://${restAPI}/session?id=${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.noSession) {
        return undefined;
      } else {
        return res;
      }
    });

  return result;
};

export const DeleteSession = (id) => {
  //console.log("Now deleteing -> ", id);
  return fetch(`https://${restAPI}/session?id=${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => {
      console.warn(error);
      console.log("ERROR DELETING SESSION");
    });
};
