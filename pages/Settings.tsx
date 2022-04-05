import React, { useCallback, useState } from "react";
import ButtonSettings from "./components/buttonSettings";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import standardMerchant from "./assets/json/standardMerchant.json";
import { Button } from "@shopify/polaris";
import * as restAPI from "./actions/restAPI";
import ModalSettings from "./components/modalSettings";

export default function Settings(props) {
  const [loadingSettings, setLoadingSettings] = useState(true);
  const API_URL = "wishlist-api-shopify.herokuapp.com";
  const [merchantSettings, setMerchantSettings] = useState(standardMerchant);
  const [shop, setShop] = useState();
  const [themeID, setThemeID] = useState();
  const [merchantID, setMerchantID] = useState();

  //New variables : Wishlist Button
  const [newButtonColor, setNewButtonColor] = useState("");
  const [newButtonHoverColor, setNewButtonHoverColor] = useState("");
  const [newButtonText, setNewButtonText] = useState("");
  const [newButtonTextColor, setNewButtonTextColor] = useState("");
  const [newButtonIsIcon, setNewButtonIsIcon] = useState("");
  const [newButtonIsCustom, setNewButtonIsCustom] = useState("");
  const [newButtonStdIcon, setNewButtonStdIcon] = useState("");
  const [newButtonActiveURL, setNewButtonActiveURL] = useState("");
  const [newButtonUnactiveURL, setNewButtonUnactiveURL] = useState("");

  //New variables : Modal
  const [newModalBackgroundColor, setNewModalBackgroundColor] = useState("");

  //New variables : Modal - Toggle
  const [newModalToggleColor, setNewModalToggleColor] = useState("");
  const [newModalToggleIconURL, setNewModalToggleIconURL] = useState("");
  const [newModalToggleIsIcon, setNewModalToggleIsIcon] = useState("");
  const [newModalToggleHoverColor, setNewModalToggleHoverColor] = useState("");
  const [newModalToggleTextColor, setNewModalToggleTextColor] = useState("");

  //New variables : Modal - Add to Cart
  const [newModalCartButtonColor, setNewModalCartButtonColor] = useState("");
  const [
    newModalCartButtonHoverColor,
    setNewModalCartButtonHoverColor,
  ] = useState("");
  const [newModalCartButtonText, setNewModalCartButtonText] = useState("");
  const [
    newModalCartButtonTextColor,
    setNewModalCartButtonTextColor,
  ] = useState("");

  //Loads current settings for merchant
  function initMerchant() {
    props.axios_instance.get("/shop").then((res) => {
      setShop(res.data.body.shop.domain);
      setMerchantID(res.data.id);
      console.log("Merchant fetch shop: ", res);
      restAPI
        .getMerchantSettings(API_URL, res.data.body.shop.domain)
        .then((res) => {
          console.log("Initialize merchant settings -> ", res);
          setMerchantSettings(res);
          setNewButtonColor(res.settings.button.color);
          setNewButtonHoverColor(res.settings.button.hovorColor);
          setNewButtonText(res.settings.button.txt);
          setNewButtonTextColor(res.settings.button.txtColor);
          setNewButtonIsIcon(res.settings.button.isIcon);
          setNewButtonIsCustom(res.settings.button.isCustom);
          setNewButtonStdIcon(res.settings.button.stdIcon);
          setNewButtonActiveURL(res.settings.button.iconUnactiveUrl);
          setNewButtonUnactiveURL(res.settings.button.iconActiveUrl);
        });
    });
  }

  useEffect(() => {
    initMerchant();
  }, []);

  async function saveSettings() {
    //Set new button settings object
    merchantSettings.merchantID = merchantID;
    merchantSettings.settings.button.color = newButtonColor;
    merchantSettings.settings.button.hovorColor = newButtonHoverColor;
    merchantSettings.settings.button.txt = newButtonText;
    merchantSettings.settings.button.txtColor = newButtonTextColor;
    merchantSettings.settings.button.isIcon =
      newButtonIsIcon == "true" ? true : false;
    merchantSettings.settings.button.isCustom =
      newButtonIsCustom == "true" ? true : false;
    merchantSettings.settings.button.stdIcon = newButtonStdIcon;
    // merchantSettings.settings.button.iconActiveUrl
    // merchantSettings.settings.button.iconUnactiveUrl

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
        newButtonColor={newButtonColor}
        setNewButtonColor={setNewButtonColor}
        newButtonHoverColor={newButtonHoverColor}
        setNewButtonHoverColor={setNewButtonHoverColor}
        newButtonText={newButtonText}
        setNewButtonText={setNewButtonText}
        newButtonTextColor={newButtonTextColor}
        setNewButtonTextColor={setNewButtonTextColor}
        newButtonIsIcon={newButtonIsIcon}
        setNewButtonIsIcon={setNewButtonIsIcon}
        newButtonIsCustom={newButtonIsCustom}
        setNewButtonIsCustom={setNewButtonIsCustom}
        newButtonStdIcon={newButtonStdIcon}
        setNewButtonStdIcon={setNewButtonStdIcon}
        newButtonActiveURL={newButtonActiveURL}
        setNewButtonActiveURL={setNewButtonActiveURL}
        newButtonUnactiveURL={newButtonUnactiveURL}
        setNewButtonUnactiveURL={setNewButtonUnactiveURL}
      />
      <ModalSettings
        newModalToggleColor={newModalToggleColor}
        setNewModalToggleColor={setNewModalToggleColor}
        newModalToggleIconURL={newModalToggleIconURL}
        setNewModalToggleIconURL={setNewModalToggleIconURL}
        newModalToggleIsIcon={newModalToggleIsIcon}
        setNewModalToggleIsIcon={setNewModalToggleIsIcon}
        newModalToggleHoverColor={newModalToggleHoverColor}
        setNewModalToggleHoverColor={setNewModalToggleHoverColor}
        newModalToggleTextColor={newModalToggleTextColor}
        setNewModalToggleTextColor={setNewModalToggleTextColor}
        newModalCartButtonColor={newModalCartButtonColor}
        setNewModalCartButtonColor={setNewModalCartButtonColor}
        newModalCartButtonHoverColor={newModalCartButtonHoverColor}
        setNewModalCartButtonHoverColor={setNewModalCartButtonHoverColor}
        newModalCartButtonText={newModalCartButtonText}
        setNewModalCartButtonText={setNewModalCartButtonText}
        newModalCartButtonTextColor={newModalCartButtonTextColor}
        setNewModalCartButtonTextColor={setNewModalCartButtonTextColor}
        newModalBackgroundColor={newModalBackgroundColor}
        setNewModalBackgroundColor={setNewModalBackgroundColor}
      />
      <div style={{ padding: "1em" }}>
        <Button onClick={handleSaveSettings}>Save settings</Button>
      </div>
    </div>
  );
}
