import React, { useCallback, useState } from "react";
import ButtonSettings from "./components/buttonSettings";
import { useEffect } from "react";
import standardMerchant from "./assets/json/standardMerchant.json";
import { Button } from "@shopify/polaris";
import * as restAPI from "./actions/restAPI";
import ModalSettings from "./components/modalSettings";
import ProductPageSettings from "./components/productPageSettings";

export default function Settings(props) {
  //const [loadingSettings, setLoadingSettings] = useState(true);
  const API_URL = "wishlist-api-shopify.herokuapp.com";
  const [merchantSettings, setMerchantSettings] = useState(standardMerchant);
  const [shop, setShop] = useState();
  const [token, setToken] = useState();
  const [merchantID, setMerchantID] = useState();

  //New variables : Wishlist Button
  const [newButtonBgColor, setNewButtonBgColor] = useState("");
  const [newButtonBgColorActive, setNewButtonBgColorActive] = useState("");
  const [newButtonTextColor, setNewButtonTextColor] = useState("");
  const [newButtonTextColorActive, setNewButtonTextColorActive] = useState("");
  const [newButtonBorderColor, setNewButtonBorderColor] = useState("");
  const [newButtonText, setNewButtonText] = useState("");
  const [newButtonIsIcon, setNewButtonIsIcon] = useState();
  const [newButtonIsCustom, setNewButtonIsCustom] = useState();
  const [newButtonStdIcon, setNewButtonStdIcon] = useState("");
  const [newButtonActiveURL, setNewButtonActiveURL] = useState("");
  const [newButtonUnactiveURL, setNewButtonUnactiveURL] = useState("");
  const [newButtonPosition, setNewButtonPosition] = useState(
    "0.75rem,0.75rem,auto,auto"
  );
  const [newButtonIconColor, setNewButtonIconColor] = useState("");

  //New variables : Modal
  const [newModalBackgroundColor, setNewModalBackgroundColor] = useState("");

  //New variables : Modal - Toggle
  const [newModalToggleBgColor, setNewModalToggleBgColor] = useState("");
  const [
    newModalToggleBgActiveColor,
    setNewModalToggleBgActiveColor,
  ] = useState("");
  const [newModalToggleTextColor, setNewModalToggleTextColor] = useState("");
  const [
    newModalToggleTextColorActive,
    setNewModalToggleTextColorActive,
  ] = useState("");
  const [newModalToggleText, setNewModalToggleText] = useState("");
  const [newModalToggleIconURL, setNewModalToggleIconURL] = useState("");
  const [newModalToggleIsIcon, setNewModalToggleIsIcon] = useState(false);
  const [newModalTogglePosition, setNewModalTogglePosition] = useState(
    "0.75rem,0.75rem,auto,auto"
  );
  const [newModalToggleBorderColor, setNewModalToggleBorderColor] = useState(
    ""
  );

  //New variables : Modal - Add to Cart
  const [newModalCartButtonBgColor, setNewModalCartButtonBgColor] = useState(
    ""
  );
  const [
    newModalCartButtonBgActiveColor,
    setNewModalCartButtonBgActiveColor,
  ] = useState("");
  const [newModalCartButtonText, setNewModalCartButtonText] = useState("");
  const [
    newModalCartButtonTextColor,
    setNewModalCartButtonTextColor,
  ] = useState("");
  const [
    newModalCartButtonTextColorActive,
    setNewModalCartButtonTextColorActive,
  ] = useState("");
  const [
    newModalCartButtonBorderColor,
    setNewModalCartButtonBorderColor,
  ] = useState("");

  //New variables : Product page - Wishlist button
  const [
    newProductPageBackgroundColor,
    setNewProductPageBackgroundColor,
  ] = useState("");
  const [
    newProductPageBackgroundColorActive,
    setNewProductPageBackgroundColorActive,
  ] = useState("");
  const [newProductPageTextColor, setNewProductPageTextColor] = useState("");
  const [
    newProductPageTextColorActive,
    setNewProductPageTextColorActive,
  ] = useState("");
  const [newProductPageBorderColor, setNewProductPageBorderColor] = useState(
    ""
  );
  const [newProductPageText, setNewProductPageText] = useState("");
  const [newProductPageIsCustom, setNewProductPageIsCustom] = useState();
  const [newProductPageStdIcon, setNewProductPageStdIcon] = useState("");
  const [
    newProductPageIconUnactiveUrl,
    setNewProductPageIconUnactiveUrl,
  ] = useState("");
  const [
    newProductPageIconActiveUrl,
    setNewProductPageIconActiveUrl,
  ] = useState("");
  const [newProductPageIconColor, setNewProductPageIconColor] = useState("");

  //Loads current settings for merchant
  function initMerchant() {
    props.axios_instance.get("/shop").then((res) => {
      setShop(res.data.body.shop.domain);
      setMerchantID(res.data.id);
      setToken(res.data.token);
      restAPI
        .getMerchantSettings(API_URL, res.data.body.shop.domain)
        .then((res) => {
          //console.log("Initialize merchant settings -> ", res);

          //Button settings
          setMerchantSettings(res);
          setNewButtonBgColor(res.settings.collectionSetting.bgColor);
          setNewButtonBgColorActive(
            res.settings.collectionSetting.bgColorActive
          );
          setNewButtonText(res.settings.collectionSetting.txt);
          setNewButtonTextColor(res.settings.collectionSetting.txtColor);
          setNewButtonTextColorActive(
            res.settings.collectionSetting.txtColorActive
          );
          setNewButtonBorderColor(res.settings.collectionSetting.borderColor);
          setNewButtonIsIcon(res.settings.collectionSetting.isIcon);
          setNewButtonIsCustom(res.settings.collectionSetting.isCustom);
          setNewButtonStdIcon(res.settings.collectionSetting.stdIcon);
          setNewButtonActiveURL(res.settings.collectionSetting.iconActiveUrl);
          setNewButtonUnactiveURL(
            res.settings.collectionSetting.iconUnactiveUrl
          );
          setNewButtonPosition(res.settings.collectionSetting.position);
          setNewButtonIconColor(res.settings.collectionSetting.iconColor);

          //Modal settings
          setNewModalBackgroundColor(res.settings.modalSetting.bgColor);
          setNewModalToggleBgColor(
            res.settings.modalSetting.toggleModalButton.bgColor
          );
          setNewModalToggleBgActiveColor(
            res.settings.modalSetting.toggleModalButton.bgColorActive
          );
          setNewModalToggleIconURL(
            res.settings.modalSetting.toggleModalButton.iconUrl
          );
          setNewModalToggleIsIcon(
            res.settings.modalSetting.toggleModalButton.isIcon
          );
          setNewModalToggleText(
            res.settings.modalSetting.toggleModalButton.txt
          );
          setNewModalToggleTextColor(
            res.settings.modalSetting.toggleModalButton.txtColor
          );
          setNewModalToggleTextColorActive(
            res.settings.modalSetting.toggleModalButton.txtColorActive
          );
          setNewModalCartButtonBgColor(
            res.settings.modalSetting.addToCartButton.bgColor
          );
          setNewModalCartButtonBgActiveColor(
            res.settings.modalSetting.addToCartButton.bgColorActive
          );
          setNewModalCartButtonText(
            res.settings.modalSetting.addToCartButton.txt
          );
          setNewModalCartButtonTextColor(
            res.settings.modalSetting.addToCartButton.txtColor
          );
          setNewModalCartButtonTextColorActive(
            res.settings.modalSetting.addToCartButton.txtColorActive
          );
          setNewModalToggleBorderColor(
            res.settings.modalSetting.toggleModalButton.borderColor
          );
          setNewModalTogglePosition(
            res.settings.modalSetting.toggleModalButton.position
          );
          setNewModalCartButtonBorderColor(
            res.settings.modalSetting.toggleModalButton.borderColor
          );

          //pdp settings
          setNewProductPageBackgroundColor(res.settings.pdpSetting.bgColor);
          setNewProductPageBackgroundColorActive(
            res.settings.pdpSetting.bgColorActive
          );
          setNewProductPageTextColor(res.settings.pdpSetting.txtColor);
          setNewProductPageTextColorActive(
            res.settings.pdpSetting.txtColorActive
          );
          setNewProductPageBorderColor(res.settings.pdpSetting.borderColor);
          setNewProductPageText(res.settings.pdpSetting.txt);
          setNewProductPageIsCustom(res.settings.pdpSetting.isCustom);
          setNewProductPageStdIcon(res.settings.pdpSetting.stdIcon);
          setNewProductPageIconUnactiveUrl(
            res.settings.pdpSetting.iconUnactiveUrl
          );
          setNewProductPageIconActiveUrl(res.settings.pdpSetting.iconActiveUrl);
          setNewProductPageIconColor(res.settings.pdpSetting.iconColor);
        });
    });
  }

  useEffect(() => {
    initMerchant();
  }, []);

  async function saveSettings() {
    //Set security settings
    merchantSettings.merchantID = merchantID;
    merchantSettings.websiteURL = shop;
    merchantSettings.token = token;

    //Set collection button to new settingss
    merchantSettings.settings.collectionSetting.bgColor = newButtonBgColor;
    merchantSettings.settings.collectionSetting.bgColorActive = newButtonBgColorActive;
    merchantSettings.settings.collectionSetting.txtColor = newButtonTextColor;
    merchantSettings.settings.collectionSetting.txtColorActive = newButtonTextColorActive;
    merchantSettings.settings.collectionSetting.borderColor = newButtonBorderColor;
    merchantSettings.settings.collectionSetting.txt = newButtonText;
    merchantSettings.settings.collectionSetting.isIcon = newButtonIsIcon;
    merchantSettings.settings.collectionSetting.isCustom = newButtonIsCustom;
    merchantSettings.settings.collectionSetting.stdIcon = newButtonStdIcon;
    merchantSettings.settings.collectionSetting.position = newButtonPosition;
    merchantSettings.settings.collectionSetting.iconActiveUrl = newButtonActiveURL;
    merchantSettings.settings.collectionSetting.iconUnactiveUrl = newButtonUnactiveURL;
    merchantSettings.settings.collectionSetting.iconColor = newButtonIconColor;

    //Set modal toggle button to new settingss
    merchantSettings.settings.modalSetting.bgColor = newModalBackgroundColor;
    merchantSettings.settings.modalSetting.toggleModalButton.bgColor = newModalToggleBgColor;
    merchantSettings.settings.modalSetting.toggleModalButton.bgColorActive = newModalToggleBgActiveColor;
    merchantSettings.settings.modalSetting.toggleModalButton.txtColor = newModalToggleTextColor;
    merchantSettings.settings.modalSetting.toggleModalButton.txtColorActive = newModalToggleTextColorActive;
    merchantSettings.settings.modalSetting.toggleModalButton.borderColor = newModalToggleBorderColor;
    merchantSettings.settings.modalSetting.toggleModalButton.txt = newModalToggleText;
    merchantSettings.settings.modalSetting.toggleModalButton.iconUrl = newModalToggleIconURL;
    merchantSettings.settings.modalSetting.toggleModalButton.isIcon = newModalToggleIsIcon;
    merchantSettings.settings.modalSetting.toggleModalButton.position = newModalTogglePosition;

    //Set add to cart button to new settings
    merchantSettings.settings.modalSetting.addToCartButton.bgColor = newModalCartButtonBgColor;
    merchantSettings.settings.modalSetting.addToCartButton.bgColorActive = newModalCartButtonBgActiveColor;
    merchantSettings.settings.modalSetting.addToCartButton.txtColor = newModalCartButtonTextColor;
    merchantSettings.settings.modalSetting.addToCartButton.txtColorActive = newModalCartButtonTextColorActive;
    merchantSettings.settings.modalSetting.addToCartButton.txt = newModalCartButtonText;
    merchantSettings.settings.modalSetting.addToCartButton.borderColor = newModalCartButtonBorderColor;

    //Set pdp add to wishlist button
    merchantSettings.settings.pdpSetting.bgColor = newProductPageBackgroundColor;
    merchantSettings.settings.pdpSetting.bgColorActive = newProductPageBackgroundColorActive;
    merchantSettings.settings.pdpSetting.txtColor = newProductPageTextColor;
    merchantSettings.settings.pdpSetting.txtColorActive = newProductPageTextColorActive;
    merchantSettings.settings.pdpSetting.borderColor = newProductPageBorderColor;
    merchantSettings.settings.pdpSetting.txt = newProductPageText;
    merchantSettings.settings.pdpSetting.isCustom = newProductPageIsCustom;
    merchantSettings.settings.pdpSetting.stdIcon = newProductPageStdIcon;
    merchantSettings.settings.pdpSetting.iconUnactiveUrl = newProductPageIconUnactiveUrl;
    merchantSettings.settings.pdpSetting.iconActiveUrl = newProductPageIconActiveUrl;
    merchantSettings.settings.pdpSetting.iconColor = newProductPageIconColor;

    const res = await restAPI.updateMerchantSettings(API_URL, merchantSettings);
    return res;
  }

  async function handleSaveSettings() {
    const result = await saveSettings();
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ButtonSettings
          newButtonColor={newButtonBgColor}
          setNewButtonColor={setNewButtonBgColor}
          newButtonHoverColor={newButtonBgColorActive}
          setNewButtonHoverColor={setNewButtonBgColorActive}
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
          newButtonPosition={newButtonPosition}
          setNewButtonPosition={setNewButtonPosition}
          newButtonBorderColor={newButtonBorderColor}
          setNewButtonBorderColor={setNewButtonBorderColor}
          newButtonIconColor={newButtonIconColor}
          setNewButtonIconColor={setNewButtonIconColor}
        />
        <ModalSettings
          newModalToggleText={newModalToggleText}
          setNewModalToggleText={setNewModalToggleText}
          newModalToggleColor={newModalToggleBgColor}
          setNewModalToggleColor={setNewModalToggleBgColor}
          newModalToggleIconURL={newModalToggleIconURL}
          setNewModalToggleIconURL={setNewModalToggleIconURL}
          newModalToggleIsIcon={newModalToggleIsIcon ? "true" : "false"}
          setNewModalToggleIsIcon={setNewModalToggleIsIcon}
          newModalToggleHoverColor={newModalToggleBgActiveColor}
          setNewModalToggleHoverColor={setNewModalToggleBgActiveColor}
          newModalToggleTextColor={newModalToggleTextColor}
          setNewModalToggleTextColor={setNewModalToggleTextColor}
          newModalCartButtonColor={newModalCartButtonBgColor}
          setNewModalCartButtonColor={setNewModalCartButtonBgColor}
          newModalCartButtonHoverColor={newModalCartButtonBgActiveColor}
          setNewModalCartButtonHoverColor={setNewModalCartButtonBgActiveColor}
          newModalCartButtonText={newModalCartButtonText}
          setNewModalCartButtonText={setNewModalCartButtonText}
          newModalCartButtonTextColor={newModalCartButtonTextColor}
          setNewModalCartButtonTextColor={setNewModalCartButtonTextColor}
          newModalBackgroundColor={newModalBackgroundColor}
          setNewModalBackgroundColor={setNewModalBackgroundColor}
          newModalTogglePosition={newModalTogglePosition}
          setNewModalTogglePosition={setNewModalTogglePosition}
          newModalToggleBorderColor={newModalToggleBorderColor}
          setNewModalToggleBorderColor={setNewModalToggleBorderColor}
          newModalCartButtonBorderColor={newModalCartButtonBorderColor}
          setNewModalCartButtonBorderColor={setNewModalCartButtonBorderColor}
        />

        <ProductPageSettings
          newProductPageBackgroundColor={newProductPageBackgroundColor}
          setNewProductPageBackgroundColor={setNewProductPageBackgroundColor}
          newProductPageBackgroundColorActive={
            newProductPageBackgroundColorActive
          }
          setNewProductPageBackgroundColorActive={
            setNewProductPageBackgroundColorActive
          }
          newProductPageTextColor={newProductPageTextColor}
          setNewProductPageTextColor={setNewProductPageTextColor}
          newProductPageTextColorActive={newProductPageTextColorActive}
          setNewProductPageTextColorActive={setNewProductPageTextColorActive}
          newProductPageBorderColor={newProductPageBorderColor}
          setNewProductPageBorderColor={setNewProductPageBorderColor}
          newProductPageText={newProductPageText}
          setNewProductPageText={setNewProductPageText}
          newProductPageIsCustom={newProductPageIsCustom}
          setNewProductPageIsCustom={setNewProductPageIsCustom}
          newProductPageStdIcon={newProductPageStdIcon}
          setNewProductPageStdIcon={setNewProductPageStdIcon}
          newProductPageIconUnactiveUrl={newProductPageIconUnactiveUrl}
          setNewProductPageIconUnactiveUrl={setNewProductPageIconUnactiveUrl}
          newProductPageIconActiveUrl={newProductPageIconActiveUrl}
          setNewProductPageIconActiveUrl={setNewProductPageIconActiveUrl}
          newProductPageIconColor={newProductPageIconColor}
          setNewProductPageIconColor={setNewProductPageIconColor}
        />
      </div>
      <div style={{ padding: "1em" }}>
        <Button onClick={handleSaveSettings}>Save settings</Button>
      </div>
    </div>
  );
}
