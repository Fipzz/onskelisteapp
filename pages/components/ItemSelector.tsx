import React, { useCallback, useState } from "react";
import { ChoiceList, Card, Icon } from "@shopify/polaris";

const ItemSelector = () => {
  const [selected, setSelected] = useState(["hidden"]);

  const handleChange = useCallback((value) => setSelected(value), []);

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

export default ItemSelector;
