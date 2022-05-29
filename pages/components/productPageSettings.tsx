import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChoiceList, Card, Checkbox, Heading } from "@shopify/polaris";

import ColorPicker from "./colorPicker";
import SettingsTextField from "./settingsTextField";
import Base64 from "../assets/json/mediaAsBase64.json";

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
  newProductPageIsCustom: boolean;
  setNewProductPageIsCustom: Function;
  newProductPageStdIcon: string;
  setNewProductPageStdIcon: Function;
  newProductPageIconUnactiveUrl: string;
  setNewProductPageIconUnactiveUrl: Function;
  newProductPageIconActiveUrl: string;
  setNewProductPageIconActiveUrl: Function;
  newProductPageIconColor: string;
  setNewProductPageIconColor: Function;
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
  newProductPageIconColor,
  setNewProductPageIconColor,
}) => {
  const [selected, setSelected] = useState([newProductPageStdIcon]);

  const handleChange = useCallback((value) => {
    setSelected(value);
    setNewProductPageStdIcon(value[0]);

    if (value == "heart") {
      setNewProductPageIconUnactiveUrl(Base64.heartEmpty);
      setNewProductPageIconActiveUrl(Base64.heartFilled);
    } else if (value == "star") {
      setNewProductPageIconUnactiveUrl(Base64.starEmpty);
      setNewProductPageIconActiveUrl(Base64.starFilled);
    } else if (value == "bookmark") {
      setNewProductPageIconUnactiveUrl(Base64.bookmarkEmpty);
      setNewProductPageIconActiveUrl(Base64.bookmarkFilled);
    }
  }, []);

  const [isCustomCheck, setIsCustomCheck] = useState(newProductPageIsCustom);
  const handleIsCustom = useCallback((isCustomCheck) => {
    setIsCustomCheck(isCustomCheck);
    setNewProductPageIsCustom(isCustomCheck);
  }, []);

  useEffect(() => {
    if (newProductPageStdIcon !== "") setSelected([newProductPageStdIcon]);

    setIsCustomCheck(newProductPageIsCustom);
  }, [newProductPageStdIcon, newProductPageIsCustom]);

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
              <b>Product page add to wishlist button</b>
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
                title={<b>Button Icon</b>}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1em",
              }}
            >
              <ColorPicker
                titel={"Button Unactive color"}
                color={newProductPageBackgroundColor}
                setColor={setNewProductPageBackgroundColor}
              />
              <div style={{ paddingTop: "1em " }}>
                <ColorPicker
                  titel={"Button active color"}
                  color={newProductPageBackgroundColorActive}
                  setColor={setNewProductPageBackgroundColorActive}
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
                titel={"Text unactive color"}
                color={newProductPageTextColor}
                setColor={setNewProductPageTextColor}
              />
              <div style={{ paddingTop: "1em " }}>
                <ColorPicker
                  titel={"Text active color"}
                  color={newProductPageTextColorActive}
                  setColor={setNewProductPageTextColorActive}
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
                titel={"Border color"}
                color={newProductPageBorderColor}
                setColor={setNewProductPageBorderColor}
              />

              <div style={{ paddingTop: "1em" }}>
                <ColorPicker
                  titel={"Icon color"}
                  color={newProductPageIconColor}
                  setColor={setNewProductPageIconColor}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "1em",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1em ",
              paddingBottom: "1em",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SettingsTextField
                titel={"Button text"}
                text={newProductPageText}
                setTextFunction={setNewProductPageText}
              />
              <div
                style={{
                  paddingLeft: "1em",
                  paddingTop: "2.7em",
                }}
              >
                <Checkbox
                  label={<b>Use custom icon</b>}
                  checked={isCustomCheck}
                  onChange={handleIsCustom}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default productPageSettings;
