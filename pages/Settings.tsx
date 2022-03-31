import React, { useCallback, useState } from "react";
import ItemSelector from "./components/ItemSelector";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import testData from "./assets/json/standardSettings.json";
import { Button } from "@shopify/polaris";
import * as RestAPI from "./actions/restAPI";

export default function Settings(props) {
  const API_URL = "wishlist-api-shopify.herokuapp.com";
  const [merchantSettings, setMerchantSettings] = useState(testData);
  const [shop, setShop] = useState();

  //New settings
  const [newMerchantButtonIcon, setNewMerchantButtonIcon] = useState("");

  const UpdateMerchantButtonIcon = (newObject) => {
    setNewMerchantButtonIcon(newObject);
  };

  function initMerchant() {
    props.axios_instance.get("/shop").then((res) => {
      setShop(res.data.body.shop.domain);
      RestAPI.getMerchantSettings(API_URL, res.data.body.shop.domain).then(
        (res) => {
          console.log("INIIT MERCHANT :) ----> ", res);
          setMerchantSettings(res);
        }
      );
    });
  }

  useEffect(() => {
    initMerchant();
    console.log(process.env.TEST);
  }, []);

  async function saveSettings() {
    //Set new button text
    merchantSettings.settings.button.text = newMerchantButtonIcon;

    const res = await props.axios_instance.get("/shop");

    merchantSettings.merchantID = "test1";
    merchantSettings.websiteURL = res.data.body.shop.domain;

    RestAPI.updateMerchantSettings(API_URL, merchantSettings);
    return res;
  }

  async function handleSaveSettings() {
    const result = await saveSettings();
    console.log("Result for saving settings: ", result);
  }

  return (
    <div>
      <ItemSelector UpdateMerchantButtonIcon={UpdateMerchantButtonIcon} />
      <Button onClick={handleSaveSettings}>Save settings</Button>
    </div>
  );
}
