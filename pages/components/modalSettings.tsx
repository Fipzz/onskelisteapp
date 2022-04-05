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
  FormLayout,
  TextField,
  Checkbox,
} from "@shopify/polaris";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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
  return <div></div>;
};

export default buttonSettings;
