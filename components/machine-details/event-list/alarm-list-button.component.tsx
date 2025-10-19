import { Ionicons } from "@expo/vector-icons";
import {
  Href,
  RelativePathString,
  UnknownInputParams,
  useRouter,
} from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  href?: Href | { pathname: RelativePathString; params?: UnknownInputParams };
  onPress?: () => void;
};

const Button: FC<Props> = ({ icon, backgroundColor, href, onPress }) => {
  const router = useRouter();
  return (
    <Pressable
      style={{
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        width: 35,
        backgroundColor: backgroundColor,
      }}
      onPress={() => {
        if (onPress) onPress();
        if (href) router.push(href);
      }}
    >
      <Ionicons style={{ fontSize: 20 }} name={icon} color="white" />
    </Pressable>
  );
};

export default Button;
