import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ChoiceList } from "@shopify/polaris";

type PropsType = {
  titel: string;
  pos: string;
  setPositionFunction: Function;
};

const positonSelector: FunctionComponent<PropsType> = ({
  titel,
  pos,
  setPositionFunction,
}) => {
  const [selected, setSelected] = useState([pos]);
  const handleChange = useCallback((value) => {
    console.log(value);
    setSelected(value);
    setPositionFunction(value[0]);
  }, []);

  useEffect(() => {
    setSelected([pos]);
  }, [pos]);

  return (
    <div style={{ minWidth: "8em" }}>
      <ChoiceList
        title={<b>{titel}</b>}
        choices={[
          {
            label: "Top left",
            value: "0.75rem,auto,auto,0.75rem",
          },
          {
            label: "Top right",
            value: "0.75rem,0.75rem,auto,auto",
          },
          {
            label: "Bottom left",
            value: "auto,auto,0.75rem,0.75rem",
          },
          {
            label: "Bottom right",
            value: "auto,0.75rem,0.75rem,auto",
          },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    </div>
  );
};

export default positonSelector;
