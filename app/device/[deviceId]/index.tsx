import DetailsEventList from "@/components/device-details/details-event-list.component";
import DetailsOverview from "@/components/device-details/details-overview.component";
import SensorOverview from "@/components/device-details/details-sensor-overview.component";
import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

const Device: FC = () => {
  const { deviceId } = useLocalSearchParams();

  return (
    <View>
      <DetailsOverview deviceName={deviceId as string}></DetailsOverview>
      <SensorOverview></SensorOverview>
      <DetailsEventList></DetailsEventList>
    </View>
  );
};

export default Device;
