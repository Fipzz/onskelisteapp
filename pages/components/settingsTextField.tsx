import React, { FunctionComponent, useCallback } from "react";
import { Card, TextField } from "@shopify/polaris";

type PropsType = {
  titel: string;
  text: string;
  setTextFunction: Function;
};

const settingsTextField: FunctionComponent<PropsType> = ({
  titel,
  text,
  setTextFunction,
}) => {
  const handleTextChange = useCallback((newValue) => {
    setTextFunction(newValue);
  }, []);

  return (
    <div style={{}}>
      <b>{titel}</b>
      <div style={{ paddingTop: "1em" }}>
        <TextField
          label="Cart button text"
          type="text"
          labelHidden
          value={text}
          onChange={handleTextChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default settingsTextField;
