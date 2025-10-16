import { FC, ReactNode, useState } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
  buttonText?: string;
  children: ReactNode;
  onPress: (() => Promise<any>) | (() => any);
  withLoader?: boolean;
};

const FormButton: FC<Props> = ({
  buttonText,
  children,
  onPress,
  withLoader,
}) => {
  const [loading, setLoading] = useState(false);

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
      onPress={async () => {
        setLoading(true);
        await onPress();
        setLoading(false);
      }}
      disabled={withLoader && loading}
    >
      <Text style={{ color: "#fff", fontSize: 20 }}>
        {buttonText ?? children}
      </Text>
      {withLoader && loading && <ActivityIndicator />}
    </Pressable>
  );
};

export default FormButton;
