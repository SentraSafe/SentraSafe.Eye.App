import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { FC } from "react";
import { Dimensions, Pressable } from "react-native";

type Props = {
  href: Href;
};

const AddButton: FC<Props> = ({ href }) => {
  const windowDimensions = Dimensions.get("window");
  const router = useRouter();
  return (
    <Pressable
      style={{
        borderRadius: 100,
        backgroundColor: "#000",
        position: "absolute",
        bottom: 40,
        left: (windowDimensions.width - 50) / 2,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
      onPress={() => router.push(href)}
    >
      <Ionicons name="add" color="#fff" style={{ fontSize: 22 }} />
    </Pressable>
  );
};

export default AddButton;
