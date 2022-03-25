import React, { useCallback, useState } from "react";
import ItemSelector from "./components/ItemSelector";
import { useEffect } from "react";
import settings from "./assets/json/merchantSettings.json";

export default function Settings() {
  const noMerchantSettings = true;

  useEffect(() => {
    //TODO get merchant settings...
    if (noMerchantSettings) {
      //TODO get merchant id...
    }
  });

  return (
    <div>
      <ItemSelector />
    </div>
  );
}
