export const updateMerchantSettings = (url, query) => {
  console.log(query);
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
  return fetch(`https://${baseURL}/app-settings/${merchantURL}`, {
    method: "GET",
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
    .catch((error) => console.warn(error));
};

export const validateMerchant = (merchantID, merchantURL, settings) => {
  return fetch(`https://{baseURL}/app-settings/${merchantURL}`, {
    method: "GET",
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
    .catch((error) => console.warn(error));
};
