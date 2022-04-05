import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ChoiceList,
  Card,
  ColorPicker,
  Icon,
  FormLayout,
  TextField,
  Checkbox,
} from "@shopify/polaris";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { hsbToHex, rgbToHsb, RGBColor } from "@shopify/polaris";

type PropsType = {
  newButtonColor: string;
  setNewButtonColor: Function;
  newButtonHoverColor: string;
  setNewButtonHoverColor: Function;
  newButtonText: string;
  setNewButtonText: Function;
  newButtonTextColor: string;
  setNewButtonTextColor: Function;
  newButtonIsIcon: string;
  setNewButtonIsIcon: Function;
  newButtonIsCustom: string;
  setNewButtonIsCustom: Function;
  newButtonStdIcon: string;
  setNewButtonStdIcon: Function;
  newButtonActiveURL: string;
  setNewButtonActiveURL: Function;
  newButtonUnactiveURL: string;
  setNewButtonUnactiveURL: Function;
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
}) => {
  const [selected, setSelected] = useState([newButtonStdIcon]);
  const [iconColor, setIconColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });
  const [hoverColor, setHoverColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const [textColor, setTextColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const [iconText, setIconText] = useState(newButtonText);
  const [useIconSelected, setUseIconSelected] = useState("yes");
  const handleTextChange = useCallback((newValue) => {
    setIconText(newValue);
    setNewButtonText(newValue);
  }, []);

  //init colors
  useEffect(() => {}, []);

  const handleChoiceChange = useCallback((selections) => {
    setUseIconSelected(selections[0]);

    if (selections[0] === "true") {
      setNewButtonIsIcon(true);
    } else {
      setNewButtonIsIcon(false);
    }
  }, []);

  const handleChange = useCallback((value) => {
    setSelected(value);
    setNewButtonStdIcon(value[0]);
  }, []);

  const [isCustomCheck, setIsCustomCheck] = useState(false);
  const handleIsCustom = useCallback((isCustomCheck) => {
    setIsCustomCheck(isCustomCheck);
    setNewButtonIsCustom(isCustomCheck);
  }, []);

  //Load settings
  useEffect(() => {
    if (newButtonStdIcon !== "") setSelected([newButtonStdIcon]);
    if (newButtonText === "") setIconText(newButtonText);
  }, [newButtonStdIcon, newButtonText]);

  function buttonIconColorPicker() {
    setNewButtonColor(hsbToHex(iconColor));
    return <ColorPicker onChange={setIconColor} color={iconColor} />;
  }

  function buttonHoverColorPicker() {
    setNewButtonHoverColor(hsbToHex(hoverColor));
    return <ColorPicker onChange={setHoverColor} color={hoverColor} />;
  }
  function buttonTextColorPicker() {
    setNewButtonTextColor(hsbToHex(textColor));
    return <ColorPicker onChange={setTextColor} color={textColor} />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1em",
        }}
      >
        <Card>
          <div style={{ minWidth: "8.1em", padding: "1em" }}>
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
            {"Active->"} {newButtonStdIcon}
          </div>
        </Card>

        <Card title="Icon color">
          {buttonIconColorPicker()}
          {newButtonColor}
          {<br />}
          {newButtonIsIcon}
          {newButtonIsCustom}
          {/* {newButtonActiveURL}
            {newButtonUnactiveURL} */}
        </Card>

        <Card title="Hover color">
          {buttonHoverColorPicker()}
          {newButtonHoverColor}
        </Card>
        <Card title="Text color">
          {buttonTextColorPicker()}
          {newButtonTextColor}
        </Card>
      </div>
      <div style={{ padding: "1em", maxWidth: "30%" }}>
        <Card>
          <FormLayout>
            <ChoiceList
              title="Wishlist button as text?: "
              choices={[
                { label: "Use Icon", value: "no" },
                { label: "Use Text", value: "yes" },
              ]}
              selected={[useIconSelected]}
              onChange={handleChoiceChange}
            />
            <TextField
              label="Button text"
              type="text"
              labelHidden
              value={iconText}
              disabled={useIconSelected === "no"}
              onChange={handleTextChange}
              autoComplete="off"
            />
          </FormLayout>
        </Card>
        <Card>
          <Checkbox
            label="Use custom icon?"
            checked={isCustomCheck}
            onChange={handleIsCustom}
          />
        </Card>
      </div>
    </div>
  );
};

export default buttonSettings;
