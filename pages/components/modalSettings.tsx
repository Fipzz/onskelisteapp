import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Card, Checkbox, Heading } from "@shopify/polaris";
import ColorPicker from "./colorPicker";
import SettingsTextField from "./settingsTextField";
import PositionSelector from "./positonSelector";
import { ContactsOutlined } from "@mui/icons-material";

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
  newModalTogglePosition: string;
  setNewModalTogglePosition: Function;
  newModalToggleBorderColor: string;
  setNewModalToggleBorderColor: Function;
  newModalCartButtonBorderColor: string;
  setNewModalCartButtonBorderColor: Function;
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
  newModalTogglePosition,
  setNewModalTogglePosition,
  newModalToggleBorderColor,
  setNewModalToggleBorderColor,
  newModalCartButtonBorderColor,
  setNewModalCartButtonBorderColor,
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
        paddingLeft: "1em",
        paddingRight: "1em",
      }}
    >
      <Card>
        <div style={{ paddingTop: "1em", paddingLeft: "1em" }}>
          <Heading>
            <b>Open wishlist Badge button</b>
          </Heading>
        </div>

        <div style={{ padding: "1em", display: "flex", flexDirection: "row" }}>
          <div style={{}}>
            <SettingsTextField
              titel={"Badge text"}
              text={newModalToggleText}
              setTextFunction={setNewModalToggleText}
            />
            <div style={{ paddingTop: "1em", paddingLeft: ".5em" }}>
              <Checkbox
                label={<b>Use icon for Badge</b>}
                checked={isModalIcon == "true" ? true : false}
                onChange={handleIsModalIcon}
              />{" "}
            </div>
          </div>
          <div style={{ paddingLeft: "1em", paddingRight: "1em" }}>
            <PositionSelector
              titel={"Bagde positon"}
              pos={newModalTogglePosition}
              setPositionFunction={setNewModalTogglePosition}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1em",
            }}
          >
            <ColorPicker
              titel={"Badge unactive color"}
              color={newModalToggleColor}
              setColor={setNewModalToggleColor}
            />
            <div style={{ paddingTop: "1em " }}>
              <ColorPicker
                titel={"Badge active color"}
                color={newModalToggleHoverColor}
                setColor={setNewModalToggleHoverColor}
              />
            </div>
          </div>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1em",
            }}
          >
            <ColorPicker
              titel={"Badge border color"}
              color={newModalToggleBorderColor}
              setColor={setNewModalToggleBorderColor}
            />
            <div style={{ paddingTop: "1em " }}>
              <ColorPicker
                titel={"Wishlist Modal Background Color"}
                color={newModalBackgroundColor}
                setColor={setNewModalBackgroundColor}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1em",
            }}
          >
            <ColorPicker
              titel={"Badge as text color"}
              color={newModalToggleTextColor}
              setColor={setNewModalToggleTextColor}
            />
          </div>
        </div>
      </Card>

      <div style={{ paddingTop: "1em" }}>
        <Card>
          <div style={{ paddingTop: "1em", paddingLeft: "1em" }}>
            <Heading>
              <b>Add to cart button</b>
            </Heading>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "1em",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1em",
              }}
            >
              <div style={{ paddingRight: "1em" }}>
                <SettingsTextField
                  titel={"Cart button text"}
                  text={newModalCartButtonText}
                  setTextFunction={setNewModalCartButtonText}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ColorPicker
                titel={"Add to cart color"}
                color={newModalCartButtonColor}
                setColor={setNewModalCartButtonColor}
              />
              <div style={{ paddingTop: "1em " }}>
                <ColorPicker
                  titel={"Add to cart hover color"}
                  color={newModalCartButtonHoverColor}
                  setColor={setNewModalCartButtonHoverColor}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1em",
                paddingBottom: "1em",
              }}
            >
              <ColorPicker
                titel={"Add to cart text color"}
                color={newModalCartButtonTextColor}
                setColor={setNewModalCartButtonTextColor}
              />
              <div style={{ paddingTop: "1em " }}>
                <ColorPicker
                  titel={"Add to cart border color"}
                  color={newModalCartButtonBorderColor}
                  setColor={setNewModalCartButtonBorderColor}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default buttonSettings;
