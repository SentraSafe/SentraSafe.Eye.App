import { FC, ReactNode, useState } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
  buttonText?: string;
  children: ReactNode;
  onPress: (() => Promise<any>) | (() => any);
  withLoader?: boolean;
  fontSize?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  backgroundColor?: string;
  color?: string;
};

const FormButton: FC<Props> = ({
  buttonText,
  children,
  onPress,
  withLoader,
  fontSize = 20,
  paddingVertical = 10,
  paddingHorizontal = 20,
  backgroundColor = "#000",
  color = "#fff",
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Pressable
      style={{
        borderRadius: 10,
        backgroundColor: backgroundColor,
        paddingHorizontal: paddingHorizontal,
        justifyContent: "center",
        paddingVertical: paddingVertical,
        minWidth: "30%",
        flexDirection: "row",
        borderColor: "#000",
        borderWidth: 1,
      }}
      onPress={async () => {
        setLoading(true);
        await onPress();
        setLoading(false);
      }}
      disabled={withLoader && loading}
    >
      <Text style={{ color: color, fontSize: fontSize }}>
        {buttonText ?? children}
      </Text>
      {withLoader && loading && <ActivityIndicator />}
    </Pressable>
  );
};

export default FormButton;
