import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ChoiceList,
  Card,
  FormLayout,
  TextField,
  Checkbox,
  Heading,
} from "@shopify/polaris";
import ColorPicker from "./colorPicker";
import PositionSelector from "./positonSelector";
import Base64 from "../assets/json/mediaAsBase64.json";

type PropsType = {
  newButtonColor: string;
  setNewButtonColor: Function;
  newButtonHoverColor: string;
  setNewButtonHoverColor: Function;
  newButtonText: string;
  setNewButtonText: Function;
  newButtonTextColor: string;
  setNewButtonTextColor: Function;
  newButtonIsIcon: boolean;
  setNewButtonIsIcon: Function;
  newButtonIsCustom: boolean;
  setNewButtonIsCustom: Function;
  newButtonStdIcon: string;
  setNewButtonStdIcon: Function;
  newButtonActiveURL: string;
  setNewButtonActiveURL: Function;
  newButtonUnactiveURL: string;
  setNewButtonUnactiveURL: Function;
  newButtonPosition: string;
  setNewButtonPosition: Function;
  newButtonBorderColor: string;
  setNewButtonBorderColor: Function;
  newButtonIconColor: string;
  setNewButtonIconColor: Function;
};

const buttonSettings: FunctionComponent<PropsType> = ({
  newButtonColor,
  setNewButtonColor,
  newButtonHoverColor,
  setNewButtonHoverColor,
  newButtonText,
  setNewButtonText,
  newButtonTextColor,
  setNewButtonTextColor,
  newButtonIsIcon,
  setNewButtonIsIcon,
  newButtonIsCustom,
  setNewButtonIsCustom,
  newButtonStdIcon,
  setNewButtonStdIcon,
  newButtonActiveURL,
  setNewButtonActiveURL,
  newButtonUnactiveURL,
  setNewButtonUnactiveURL,
  newButtonPosition,
  setNewButtonPosition,
  newButtonBorderColor,
  setNewButtonBorderColor,
  newButtonIconColor,
  setNewButtonIconColor,
}) => {
  const [selected, setSelected] = useState([newButtonStdIcon]);
  const [iconText, setIconText] = useState(newButtonText);
  const [useIconSelected, setUseIconSelected] = useState("");
  const handleTextChange = useCallback((newValue) => {
    setIconText(newValue);
    setNewButtonText(newValue);
  }, []);

  const handleChoiceChange = useCallback((selections) => {
    setUseIconSelected(selections[0]);
    if (selections[0] == "yes") {
      setNewButtonIsIcon(true);
    } else {
      setNewButtonIsIcon(false);
    }
  }, []);

  const handleChange = useCallback((value) => {
    setSelected(value);
    setNewButtonStdIcon(value[0]);

    if (value == "heart") {
      setNewButtonUnactiveURL(Base64.heartEmpty);
      setNewButtonActiveURL(Base64.heartFilled);
    } else if (value == "star") {
      setNewButtonUnactiveURL(Base64.starEmpty);
      setNewButtonActiveURL(Base64.starFilled);
    } else if (value == "bookmark") {
      setNewButtonUnactiveURL(Base64.bookmarkEmpty);
      setNewButtonActiveURL(Base64.bookmarkFilled);
    }
  }, []);

  const [isCustomCheck, setIsCustomCheck] = useState(newButtonIsCustom);
  const handleIsCustom = useCallback((isCustomCheck) => {
    setIsCustomCheck(isCustomCheck);
    setNewButtonIsCustom(isCustomCheck);
  }, []);

  //Load settings
  useEffect(() => {
    if (newButtonStdIcon !== "") setSelected([newButtonStdIcon]);
    setIconText(newButtonText);

    if (newButtonIsIcon) {
      setUseIconSelected("yes");
    } else {
      setUseIconSelected("no");
    }

    setIsCustomCheck(newButtonIsCustom);
  }, [newButtonStdIcon, newButtonText, newButtonIsCustom, newButtonIsIcon]);

  return (
    <div>
      <div
        style={{
          padding: "1em",
          width: "100%",
        }}
      >
        <Card>
          <div style={{ paddingTop: "1em", paddingLeft: "1em" }}>
            <Heading>
              <b>Collection page add to wishlist button</b>
            </Heading>
          </div>
          <div
            style={{
              padding: "1em",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                minWidth: "10em",
                alignItems: "center",
              }}
            >
              <ChoiceList
                title={<b>Wishlist Icon</b>}
                choices={[
                  {
                    label: (
                      <img
                        src={Base64.heartEmpty}
                        style={{ height: "3rem", width: "3rem" }}
                      />
                    ),
                    value: "heart",
                  },
                  {
                    label: (
                      <img
                        src={Base64.starEmpty}
                        style={{ height: "3rem", width: "3rem" }}
                      />
                    ),
                    value: "star",
                  },
                  {
                    label: (
                      <img
                        src={Base64.bookmarkEmpty}
                        style={{ height: "3rem", width: "3rem" }}
                      />
                    ),
                    value: "bookmark",
                  },
                ]}
                selected={selected}
                onChange={handleChange}
              />
            </div>
            <PositionSelector
              titel={"Icon position"}
              pos={newButtonPosition}
              setPositionFunction={setNewButtonPosition}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1em",
              }}
            >
              <ColorPicker
                titel={"Icon unactive color"}
                color={newButtonColor}
                setColor={setNewButtonColor}
              />
              <div style={{ paddingTop: "1em " }}>
                <ColorPicker
                  titel={"Icon active color"}
                  color={newButtonHoverColor}
                  setColor={setNewButtonHoverColor}
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
                titel={"Text color"}
                color={newButtonTextColor}
                setColor={setNewButtonTextColor}
              />
              <div style={{ paddingTop: "1em " }}>
                <ColorPicker
                  titel={"Border color"}
                  color={newButtonBorderColor}
                  setColor={setNewButtonBorderColor}
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
                titel={"Icon color"}
                color={newButtonIconColor}
                setColor={setNewButtonIconColor}
              />
            </div>
          </div>
          <div
            style={{
              paddingLeft: "1em ",
              paddingBottom: "1em",
            }}
          >
            <FormLayout>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div style={{ minWidth: "10em" }}>
                  <ChoiceList
                    title={<b>Use text button </b>}
                    choices={[
                      { label: "Use Icon", value: "yes" },
                      { label: "Use Text", value: "no" },
                    ]}
                    selected={[useIconSelected]}
                    onChange={handleChoiceChange}
                  />
                </div>
                <div>
                  <b>Button text</b>
                  <div style={{ paddingTop: "1em" }}>
                    <TextField
                      label="Button text"
                      type="text"
                      labelHidden
                      value={iconText}
                      disabled={newButtonIsIcon}
                      onChange={handleTextChange}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div style={{ paddingTop: "3.6rem", paddingLeft: "3rem" }}>
                  <Checkbox
                    label={<b>Use custom icon</b>}
                    checked={isCustomCheck}
                    onChange={handleIsCustom}
                  />
                </div>
              </div>
            </FormLayout>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default buttonSettings;
