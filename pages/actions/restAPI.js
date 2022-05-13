import standardSession from "../assets/json/standardSession.json";
import stdMerchant from "../../pages/assets/json/standardMerchant.json";
import { split } from "apollo-boost";
// const Cryptr = require("cryptr");
// const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

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
  //console.log("Start populate: ", newMerchant);

  newMerchant.merchantID = merchantID;
  newMerchant.websiteURL = websiteURL;
  newMerchant.settings = settings;

  //console.log("trying to send:", newMerchant);

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
      //console.warn(error);
      console.log("Merchant already exitst! #");
    });
};

export const StoreSession = (id, websiteURL, session) => {
  let query = standardSession;
  // let newID = id.split("_");

  query.id = id;
  query.websiteURL = websiteURL;
  query.session = JSON.parse(session);

  console.log("query like dis ->", query);

  return fetch(`https://${restAPI}/session`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((res) => {
      //console.log("res -> ", res);
      return res.json();
    })
    .then((res) => {
      console.log("responseData -> ", res);
      return res;
    })
    .catch((error) => {
      console.warn(error);
      console.log("ERROR STOREING SESSION");
    });
};

export const LoadSession = async (id) => {
  // let newID = id.split("_");

  var result = await fetch(`https://${restAPI}/session?id=${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      //console.log(res);
      return res.json();
    })
    .then((res) => {
      //console.log("load session res: ", res);
      if (res.noSession) {
        //console.log("No session found with res: ", res);
        return undefined;
      } else {
        //console.log("Session found with: ", res);
        return res;
      }
    });

  return result;
};

export const DeleteSession = (id) => {
  let newID = id.split("_");
  return fetch(`https://${restAPI}/session?id=${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      //console.log("res -> ", res);
      return res.json();
    })
    .then((responseData) => {
      //console.log("responseData -> ", responseData);
      return responseData;
    })
    .catch((error) => {
      console.warn(error);
      console.log("ERROR DELETING SESSION");
    });
};

// export const validateMerchant = (merchantURL) => {
//   return fetch(`https://${restAPI}/app-settings/${merchantURL}`, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((responseData) => {
//       return responseData;
//     })
//     .catch((error) => console.warn(error));
// };
