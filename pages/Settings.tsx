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
  const [newButtonIsIcon, setNewButtonIsIcon] = useState();
  const [newButtonIsCustom, setNewButtonIsCustom] = useState();
  const [newButtonStdIcon, setNewButtonStdIcon] = useState("");
  const [newButtonActiveURL, setNewButtonActiveURL] = useState("");
  const [newButtonUnactiveURL, setNewButtonUnactiveURL] = useState("");

  //New variables : Modal
  const [newModalBackgroundColor, setNewModalBackgroundColor] = useState("");

  //New variables : Modal - Toggle
  const [newModalToggleColor, setNewModalToggleColor] = useState("");
  const [newModalToggleHoverColor, setNewModalToggleHoverColor] = useState("");
  const [newModalToggleTextColor, setNewModalToggleTextColor] = useState("");
  const [newModalToggleText, setNewModalToggleText] = useState("");
  const [newModalToggleIconURL, setNewModalToggleIconURL] = useState("");
  const [newModalToggleIsIcon, setNewModalToggleIsIcon] = useState(false);

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

          //Button settings
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

          //Modal settings
          setNewModalBackgroundColor(res.settings.modal.bgColor);
          setNewModalToggleColor(res.settings.modal.toggleModalButton.color);
          setNewModalToggleIconURL(
            res.settings.modal.toggleModalButton.iconUrl
          );
          setNewModalToggleIsIcon(res.settings.modal.toggleModalButton.isIcon);
          setNewModalToggleHoverColor(
            res.settings.modal.toggleModalButton.hoverColor
          );
          setNewModalToggleText(res.settings.modal.toggleModalButton.txt);
          setNewModalToggleTextColor(
            res.settings.modal.toggleModalButton.txtColor
          );
          setNewModalCartButtonColor(res.settings.modal.addToCartButton.color);
          setNewModalCartButtonHoverColor(
            res.settings.modal.addToCartButton.hoverColor
          );
          setNewModalCartButtonText(res.settings.modal.addToCartButton.txt);
          setNewModalCartButtonTextColor(
            res.settings.modal.addToCartButton.txt
          );
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
    merchantSettings.settings.button.isIcon = newButtonIsIcon;
    merchantSettings.settings.button.isCustom = newButtonIsCustom;
    merchantSettings.settings.button.stdIcon = newButtonStdIcon;
    merchantSettings.settings.modal.bgColor = newModalBackgroundColor;
    merchantSettings.settings.modal.toggleModalButton.color = newModalToggleColor;
    merchantSettings.settings.modal.toggleModalButton.hoverColor = newModalToggleHoverColor;
    merchantSettings.settings.modal.toggleModalButton.txtColor = newModalToggleTextColor;
    merchantSettings.settings.modal.toggleModalButton.txt = newModalToggleText;
    merchantSettings.settings.modal.toggleModalButton.iconUrl = newModalToggleIconURL;
    merchantSettings.settings.modal.toggleModalButton.isIcon = newModalToggleIsIcon;

    merchantSettings.settings.modal.addToCartButton.color = newModalCartButtonColor;
    merchantSettings.settings.modal.addToCartButton.hoverColor = newModalCartButtonHoverColor;
    merchantSettings.settings.modal.addToCartButton.txtColor = newModalCartButtonTextColor;
    merchantSettings.settings.modal.addToCartButton.txt = newModalCartButtonText;

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
      <div style={{ display: "flex", flexDirection: "row" }}>
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
          newModalToggleText={newModalToggleText}
          setNewModalToggleText={setNewModalToggleText}
          newModalToggleColor={newModalToggleColor}
          setNewModalToggleColor={setNewModalToggleColor}
          newModalToggleIconURL={newModalToggleIconURL}
          setNewModalToggleIconURL={setNewModalToggleIconURL}
          newModalToggleIsIcon={newModalToggleIsIcon ? "true" : "false"}
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
      </div>
      <div style={{ padding: "1em" }}>
        <Button onClick={handleSaveSettings}>Save settings</Button>
      </div>
    </div>
  );
}
