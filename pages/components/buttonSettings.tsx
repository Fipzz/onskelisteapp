import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ChoiceList,
  Card,
  Icon,
  FormLayout,
  TextField,
  Checkbox,
  Heading,
} from "@shopify/polaris";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ColorPicker from "./colorPicker";
import PositionSelector from "./positonSelector";

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
  settings: Object;
  setSettings: Function;
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
  settings,
  setSettings,
}) => {
  const [selected, setSelected] = useState([newButtonStdIcon]);
  const [iconText, setIconText] = useState(newButtonText);
  const [useIconSelected, setUseIconSelected] = useState("");
  const handleTextChange = useCallback((newValue) => {
    setIconText(newValue);
    setNewButtonText(newValue);
  }, []);

  //init colors
  useEffect(() => {
    console.log(settings);
  }, [settings]);

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
              <b>Collection page</b>
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
              }}
            >
              <ChoiceList
                title={<b>Wishlist Icon</b>}
                choices={[
                  {
                    label: <FavoriteIcon />,
                    value: "heart",
                  },
                  {
                    label: <StarIcon />,
                    value: "star",
                  },
                  {
                    label: <BookmarkIcon />,
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
              <div style={{ padding: "1em", paddingTop: "2.8em" }}>
                <Checkbox
                  label={<b>Use custom icon</b>}
                  checked={isCustomCheck}
                  onChange={handleIsCustom}
                />
              </div>
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
              </div>
            </FormLayout>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default buttonSettings;
