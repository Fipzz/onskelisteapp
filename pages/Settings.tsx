import React, { useCallback, useState } from "react";
import ButtonSettings from "./components/buttonSettings";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import standardMerchant from "./assets/json/standardMerchant.json";
import { Button } from "@shopify/polaris";
import * as restAPI from "./actions/restAPI";

export default function Settings(props) {
  const API_URL = "wishlist-api-shopify.herokuapp.com";
  const [merchantSettings, setMerchantSettings] = useState(standardMerchant);
  const [shop, setShop] = useState();
  const [merchantID, setMerchantID] = useState();

  //New settings
  const [newMerchantButtonIcon, setNewMerchantButtonIcon] = useState("");

  const UpdateMerchantButtonIcon = (newObject) => {
    setNewMerchantButtonIcon(newObject);
  };

  function initMerchant() {
    props.axios_instance.get("/shop").then((res) => {
      setShop(res.data.body.shop.domain);
      setMerchantID(res.data.id);
      console.log("Merchant fetch shop: ", res);
      restAPI
        .getMerchantSettings(API_URL, res.data.body.shop.domain)
        .then((res) => {
          console.log("INIIT MERCHANT :) ----> ", res);
          setMerchantSettings(res);
        });
    });
  }

  useEffect(() => {
    initMerchant();
  }, []);

  async function saveSettings() {
    //Set new button settings object TILFØJ MERCHANTID TIL UPDATEMERCHANTSETTINGS CALL
    merchantSettings.settings.button.text = newMerchantButtonIcon;
    merchantSettings.merchantID = merchantID;

    const res = await restAPI.updateMerchantSettings(API_URL, merchantSettings);
    return res;
  }

  async function handleSaveSettings() {
    const result = await saveSettings();
    console.log("Result for saving settings: ", result);
  }

  return (
    <div>
      <ButtonSettings
        UpdateMerchantButtonIcon={UpdateMerchantButtonIcon}
        initValue={merchantSettings.settings.button.stdIcon}
      />

      <Button onClick={handleSaveSettings}>Save settings</Button>
    </div>
  );
}
