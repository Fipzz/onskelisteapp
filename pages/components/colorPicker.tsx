import React, { FunctionComponent, useState } from "react";
import { Card, ColorPicker } from "@shopify/polaris";
import { hsbToHex } from "@shopify/polaris";
import { Title } from "@shopify/polaris/dist/types/latest/src/components/Page/components/Header/components";

type PropsType = {
  titel: string;
  color: string;
  setColor: Function;
};

const buttonSettings: FunctionComponent<PropsType> = ({
  color,
  setColor,
  titel,
}) => {
  const [currentColor, setCurrentColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  function ModalBackgroundColorPicker() {
    setColor(hsbToHex(currentColor));
    return <ColorPicker onChange={setCurrentColor} color={currentColor} />;
  }

  return (
    <Card title={titel}>
      {ModalBackgroundColorPicker()}
      {color}
    </Card>
  );
};

export default buttonSettings;
