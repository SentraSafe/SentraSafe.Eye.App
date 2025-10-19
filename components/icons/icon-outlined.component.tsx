import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { View } from "react-native";

type Icon = keyof typeof Ionicons.glyphMap;

type Props = {
  color: string;
  outlineColor: string;
  size: number;
  icon: Icon;
};

const IconOutlined: FC<Props> = ({ color, outlineColor, size, icon }) => {
  return (
    <View style={{ position: "relative", width: size, height: size }}>
      <Ionicons
        name={(icon + "-outline") as Icon}
        color={outlineColor}
        size={size}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <Ionicons
        name={icon}
        color={color}
        size={size - 4}
        style={{ position: "absolute", top: 2.8, left: 2.5 }}
      />
    </View>
  );
};

export default IconOutlined;
