import { Container } from "@/components/containers/containers.styled";
import DetailsOverview from "@/components/device-details/details-overview.component";
import SensorOverview from "@/components/device-details/details-sensor-overview.component";
import { useLocalSearchParams } from "expo-router";
import { FC } from "react";

const Device: FC = () => {
  const { deviceId } = useLocalSearchParams();

  return (
    <Container>
      <DetailsOverview deviceName={deviceId as string}></DetailsOverview>
      <SensorOverview></SensorOverview>
    </Container>
  );
};

export default Device;
