import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { FC } from "react";
import { Dimensions, Pressable } from "react-native";

type Props = {
  href?: Href;
  icon: keyof typeof Ionicons.glyphMap;
  align?: "left" | "center" | "right";
  backgroundColor?: string;
  color?: string;
  onPress?: () => void;
};

type Position = {
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
};

const FloatingButton: FC<Props> = ({
  onPress,
  href,
  icon,
  align = "center",
  backgroundColor = "#000",
  color = "#fff",
}) => {
  const windowDimensions = Dimensions.get("window");
  const router = useRouter();

  let position: Position = { bottom: 60 };

  switch (align) {
    case "left":
      position = {
        ...position,
        left: (windowDimensions.width - 60) / 5,
      };
      break;
    case "center":
      position = {
        ...position,
        left: (windowDimensions.width - 60) / 2,
      };
      break;
    case "right":
      position = {
        ...position,
        right: (windowDimensions.width - 60) / 5,
      };
      break;
  }

  return (
    <Pressable
      style={{
        ...position,
        borderRadius: 100,
        backgroundColor: backgroundColor,
        position: "absolute",
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "#868686",
      }}
      onPress={() => {
        if (onPress) onPress();
        if (href) router.push(href);
      }}
    >
      <Ionicons name={icon} color={color} style={{ fontSize: 22 }} />
    </Pressable>
  );
};

export default FloatingButton;
