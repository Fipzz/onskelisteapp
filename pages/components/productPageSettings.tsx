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
  newProductPageBackgroundColor: string;
  setNewProductPageBackgroundColor: Function;
  newProductPageBackgroundColorActive: string;
  setNewProductPageBackgroundColorActive: Function;
  newProductPageTextColor: string;
  setNewProductPageTextColor: Function;
  newProductPageTextColorActive: string;
  setNewProductPageTextColorActive: Function;
  newProductPageBorderColor: string;
  setNewProductPageBorderColor: Function;
  newProductPageText: string;
  setNewProductPageText: Function;
  newProductPageIsCustom: string;
  setNewProductPageIsCustom: Function;
  newProductPageStdIcon: string;
  setNewProductPageStdIcon: Function;
  newProductPageIconUnactiveUrl: string;
  setNewProductPageIconUnactiveUrl: Function;
  newProductPageIconActiveUrl: string;
  setNewProductPageIconActiveUrl: Function;
};

const productPageSettings: FunctionComponent<PropsType> = ({
  newProductPageBackgroundColor,
  setNewProductPageBackgroundColor,
  newProductPageBackgroundColorActive,
  setNewProductPageBackgroundColorActive,
  newProductPageTextColor,
  setNewProductPageTextColor,
  newProductPageTextColorActive,
  setNewProductPageTextColorActive,
  newProductPageBorderColor,
  setNewProductPageBorderColor,
  newProductPageText,
  setNewProductPageText,
  newProductPageIsCustom,
  setNewProductPageIsCustom,
  newProductPageStdIcon,
  setNewProductPageStdIcon,
  newProductPageIconUnactiveUrl,
  setNewProductPageIconUnactiveUrl,
  newProductPageIconActiveUrl,
  setNewProductPageIconActiveUrl,
}) => {
  return (
    <div>
      {/* <div
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
      </div> */}
    </div>
  );
};

export default productPageSettings;
