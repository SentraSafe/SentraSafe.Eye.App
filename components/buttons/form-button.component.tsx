import { FC, ReactNode } from "react";
import { Pressable, Text } from "react-native";

type Props = {
  buttonText?: string;
  children: ReactNode;
  onPress: () => void;
};

const FormButton: FC<Props> = ({ buttonText, children, onPress }) => {
  return (
    <Pressable
      style={{
        borderRadius: 10,
        backgroundColor: "#000",
        paddingHorizontal: 20,
        alignItems: "center",
        paddingVertical: 10,
        width: "30%",
      }}
      onPress={onPress}
    >
      <Text style={{ color: "#fff", fontSize: 20 }}>
        {buttonText ?? children}
      </Text>
    </Pressable>
  );
};

export default FormButton;
