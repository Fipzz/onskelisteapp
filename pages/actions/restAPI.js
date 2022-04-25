import stdMerchant from "../../pages/assets/json/standardMerchant.json";
const Cryptr = require("cryptr");
//const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

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
  console.log("Trying to create new user: ");
  const newMerchant = stdMerchant;
  console.log("Start populate: ", newMerchant);
  newMerchant.merchantID = merchantID;
  newMerchant.websiteURL = websiteURL;
  newMerchant.settings = settings;

  console.log("trying to send:", newMerchant);

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
    .catch((error) => console.warn(error));
};

export const StoreSession = (id, shop, session) => {
  return fetch(
    `https://${restAPI}/session?websiteURL=${shop}&session=${session}&sessionId=${id}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((res) => {
      //console.log("res -> ", res);
      return res.json();
    })
    .then((responseData) => {
      //console.log("responseData -> ", responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
};

export const LoadSession = (id) => {
  return fetch(`https://${restAPI}/session?sessionId=${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      //console.log("THE DATA?1 -> ", res);
      return res.json();
    })
    .then((res) => {
      console.log("THE DATA -> ", res);
      return res;
    })
    .catch((error) => console.warn(error));
};

export const DeleteSession = (id) => {
  return fetch(`https://${restAPI}/session?sessionId=${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      console.log("res -> ", res);
      return res.json();
    })
    .then((responseData) => {
      console.log("responseData -> ", responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
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
