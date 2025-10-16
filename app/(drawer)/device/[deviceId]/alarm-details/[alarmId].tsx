import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";

const Alarm: FC = () => {
  const { deviceId } = useLocalSearchParams();

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default Alarm;
