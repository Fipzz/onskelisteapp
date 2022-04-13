import React, { FunctionComponent, useCallback } from "react";
import { TextField } from "@shopify/polaris";

type PropsType = {
  titel: string;
  text: string;
  setTextFunction: Function;
};

const positonSelector: FunctionComponent<PropsType> = ({
  titel,
  text,
  setTextFunction,
}) => {
  const handleTextChange = useCallback((newValue) => {
    setTextFunction(newValue);
  }, []);

  return (
    <div style={{ padding: "1em" }}>
      <b>{titel}</b>
      <TextField
        label="Cart button text"
        type="text"
        labelHidden
        value={text}
        onChange={handleTextChange}
        autoComplete="off"
      />
    </div>
  );
};

export default positonSelector;
