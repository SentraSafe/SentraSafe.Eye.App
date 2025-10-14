import { Fontisto, Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ViewButton } from "./filter-elements.styled";

type IoniconNames = keyof typeof Ionicons.glyphMap;
type FontistoIconNames = keyof typeof Fontisto.glyphMap;

type Props = {
  style?: StyleProp<ViewStyle>;
  selected: boolean;
  setSelected: () => void;
} & (
  | {
      iconSource: "Ionicons";
      icon: IoniconNames;
    }
  | {
      iconSource: "Fontisto";
      icon: FontistoIconNames;
    }
);

const FilterViewButton: FC<Props> = ({
  style,
  icon,
  iconSource,
  selected,
  setSelected,
}) => {
  const color = selected ? "#41aaff" : "#000";
  return (
    <ViewButton style={style} color={color} onPress={() => setSelected()}>
      {iconSource === "Ionicons" ? (
        <Ionicons color={color} style={{ fontSize: 25 }} name={icon} />
      ) : (
        <Fontisto color={color} style={{ fontSize: 25 }} name={icon} />
      )}
    </ViewButton>
  );
};

export default FilterViewButton;
