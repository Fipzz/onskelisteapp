import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChoiceList, Card, Icon } from "@shopify/polaris";

type PropsType = {
  initValue: string;
  UpdateMerchantButtonIcon: Function;
};

const buttonSettings: FunctionComponent<PropsType> = ({
  UpdateMerchantButtonIcon,
  initValue,
}) => {
  const [selected, setSelected] = useState([initValue]);

  const handleChange = useCallback((value) => {
    setSelected(value);
    UpdateMerchantButtonIcon(value[0]);
  }, []);

  return (
    <Card>
      <ChoiceList
        title="Wishlist Icon"
        choices={[
          {
            label: <img src={"pages/media/heartEmpty.png"} alt="Heart" />,
            value: "heart",
          },
          {
            label: <img src="./media/heartEmpty.svg" alt="Star" />,
            value: "star",
          },
          {
            label: <img src="pages/media/heartEmpty.svg" alt="Bookmark" />,
            value: "bookmark",
          },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    </Card>
  );
};

export default buttonSettings;
