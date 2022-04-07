import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Card, Checkbox } from "@shopify/polaris";
import ColorPicker from "./colorPicker";
import SettingsTextField from "./settingsTextField";

type PropsType = {
  newModalToggleText: string;
  setNewModalToggleText: Function;
  newModalToggleColor: string;
  setNewModalToggleColor: Function;
  newModalToggleIconURL: string;
  setNewModalToggleIconURL: Function;
  newModalToggleIsIcon: string;
  setNewModalToggleIsIcon: Function;
  newModalToggleHoverColor: string;
  setNewModalToggleHoverColor: Function;
  newModalToggleTextColor: string;
  setNewModalToggleTextColor: Function;
  newModalCartButtonColor: string;
  setNewModalCartButtonColor: Function;
  newModalCartButtonHoverColor: string;
  setNewModalCartButtonHoverColor: Function;
  newModalCartButtonText: string;
  setNewModalCartButtonText: Function;
  newModalCartButtonTextColor: string;
  setNewModalCartButtonTextColor: Function;
  newModalBackgroundColor: string;
  setNewModalBackgroundColor: Function;
};

const buttonSettings: FunctionComponent<PropsType> = ({
  newModalToggleText,
  setNewModalToggleText,
  newModalBackgroundColor,
  setNewModalBackgroundColor,
  newModalToggleColor,
  setNewModalToggleColor,
  newModalToggleIconURL,
  setNewModalToggleIconURL,
  newModalToggleIsIcon,
  setNewModalToggleIsIcon,
  newModalToggleHoverColor,
  setNewModalToggleHoverColor,
  newModalToggleTextColor,
  setNewModalToggleTextColor,
  newModalCartButtonColor,
  setNewModalCartButtonColor,
  newModalCartButtonHoverColor,
  setNewModalCartButtonHoverColor,
  newModalCartButtonText,
  setNewModalCartButtonText,
  newModalCartButtonTextColor,
  setNewModalCartButtonTextColor,
}) => {
  const [isModalIcon, setIsModalIcon] = useState(newModalToggleIsIcon);
  const handleIsModalIcon = useCallback((isModalIcon) => {
    setIsModalIcon(isModalIcon);
    setNewModalToggleIsIcon(isModalIcon);
  }, []);

  useEffect(() => {
    setIsModalIcon(newModalToggleIsIcon);
  }, [newModalToggleIsIcon]);

  return (
    <div
      style={{
        paddingTop: "1em",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ColorPicker
              titel={"Modal Background Color"}
              color={newModalBackgroundColor}
              setColor={setNewModalBackgroundColor}
            />
            <ColorPicker
              titel={"Modal Badge Color"}
              color={newModalToggleColor}
              setColor={setNewModalToggleColor}
            />
            <ColorPicker
              titel={"Modal badge hover color"}
              color={newModalToggleHoverColor}
              setColor={setNewModalToggleHoverColor}
            />
            <ColorPicker
              titel={"Modal badge text color"}
              color={newModalToggleTextColor}
              setColor={setNewModalToggleTextColor}
            />
          </div>
        </Card>
      </div>
      <div style={{ paddingLeft: "1em" }}>
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ColorPicker
              titel={"Add to cart color"}
              color={newModalCartButtonColor}
              setColor={setNewModalCartButtonColor}
            />
            <ColorPicker
              titel={"Add to cart hover color"}
              color={newModalCartButtonHoverColor}
              setColor={setNewModalCartButtonHoverColor}
            />{" "}
            <ColorPicker
              titel={"Add to cart text color"}
              color={newModalCartButtonTextColor}
              setColor={setNewModalCartButtonTextColor}
            />
          </div>
        </Card>
      </div>
      <div style={{ paddingLeft: "1em" }}>
        <Card>
          <SettingsTextField
            titel={"Cart button text"}
            text={newModalCartButtonText}
            setTextFunction={setNewModalCartButtonText}
          />

          <SettingsTextField
            titel={"Toggle badge text"}
            text={newModalToggleText}
            setTextFunction={setNewModalToggleText}
          />
          <div style={{ padding: "1em" }}>
            <Checkbox
              label="Use icon for Modal?"
              checked={isModalIcon == "true" ? true : false}
              onChange={handleIsModalIcon}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default buttonSettings;
