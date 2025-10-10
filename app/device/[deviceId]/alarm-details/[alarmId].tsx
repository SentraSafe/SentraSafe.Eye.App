import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

const Alarm: FC = () => {
  const { deviceId } = useLocalSearchParams();

  return <View></View>;
};

export default Alarm;
