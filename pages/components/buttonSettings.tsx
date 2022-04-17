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
    console.log("Upadated!!!!!!!!!!!!");
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
          display: "flex",
          justifyContent: "flex-start",
          padding: "1em",
        }}
      >
        <Card>
          <div
            style={{
              minWidth: "8.1em",
              padding: "1em",
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
            <div style={{ paddingTop: "1em" }}>
              <FormLayout>
                <ChoiceList
                  title={<b>Wishlist button as text?: </b>}
                  choices={[
                    { label: "Use Icon", value: "yes" },
                    { label: "Use Text", value: "no" },
                  ]}
                  selected={[useIconSelected]}
                  onChange={handleChoiceChange}
                />
                <b>Button text</b>
                <TextField
                  label="Button text"
                  type="text"
                  labelHidden
                  value={iconText}
                  disabled={newButtonIsIcon}
                  onChange={handleTextChange}
                  autoComplete="off"
                />
              </FormLayout>
              {console.log("ander er en steg", settings)}
              <PositionSelector
                titel={"Icon position"}
                pos={newButtonPosition}
                setPositionFunction={setNewButtonPosition}
              />
            </div>
          </div>
        </Card>
        <div style={{ marginLeft: "1em" }}>
          <Card>
            <ColorPicker
              titel={"Icon color"}
              color={newButtonColor}
              setColor={setNewButtonColor}
            />
            <ColorPicker
              titel={"Hover color"}
              color={newButtonHoverColor}
              setColor={setNewButtonHoverColor}
            />
            <ColorPicker
              titel={"Text color"}
              color={newButtonTextColor}
              setColor={setNewButtonTextColor}
            />
            <div style={{ paddingTop: "2em", padding: "1em" }}>
              <Checkbox
                label="Use custom icon?"
                checked={isCustomCheck}
                onChange={handleIsCustom}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default buttonSettings;
