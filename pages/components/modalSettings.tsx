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
} from "@shopify/polaris";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { hsbToHex } from "@shopify/polaris";
import ColorPicker from "./colorPicker";

type PropsType = {
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
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        paddingLeft: "1em",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ColorPicker
        titel={"Modal Background Color"}
        color={newModalBackgroundColor}
        setColor={setNewModalBackgroundColor}
      />
      <br />
      <ColorPicker
        titel={"Modal Badge Color"}
        color={newModalToggleColor}
        setColor={setNewModalToggleColor}
      />
      <br />
    </div>
  );
};

export default buttonSettings;
