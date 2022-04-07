import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Card,
  ColorPicker,
  Popover,
  Select,
  TextField,
} from "@shopify/polaris";
import { hsbToHex } from "@shopify/polaris";

type PropsType = {
  titel: string;
  color: string;
  setColor: Function;
};

const buttonSettings: FunctionComponent<PropsType> = ({
  color,
  setColor,
  titel,
}) => {
  const [colorAsText, setColorAsText] = useState("loading...");
  const [popoverActive, setPopoverActive] = useState(false);
  const [currentColor, setCurrentColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const handleColorPickerChange = useCallback((value) => {
    setCurrentColor(value);
    setColorAsText(hsbToHex(value));
    setColor(hsbToHex(value));
  }, []);

  const handleTextFieldChange = useCallback((value) => {
    setColorAsText(value);
  }, []);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  function test() {
    return (
      <div
        style={{
          minWidth: "1em",
          minHeight: "1em",
          backgroundColor: color,
        }}
      ></div>
    );
  }

  useEffect(() => {
    if (colorAsText == "loading..." || colorAsText == "") {
      setColorAsText(color);
    }
  }, [color]);

  const activator = (
    <div>
      {/*//@ts-ignore*/}
      <Button onClick={togglePopoverActive}>{test()}</Button>
    </div>
  );

  return (
    <div style={{ padding: "1em" }}>
      <TextField
        label={<b>{titel}</b>}
        type="text"
        value={colorAsText}
        onChange={handleTextFieldChange}
        autoComplete="off"
        connectedRight={
          <Popover
            active={popoverActive}
            activator={activator}
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
          >
            <Card>
              <div style={{ padding: "1em" }}>
                <ColorPicker
                  onChange={handleColorPickerChange}
                  color={currentColor}
                />
              </div>
            </Card>
          </Popover>
        }
      />
    </div>
  );
};

export default buttonSettings;
