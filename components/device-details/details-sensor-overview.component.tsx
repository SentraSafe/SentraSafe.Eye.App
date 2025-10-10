import { FC } from "react";
import { Text, View } from "react-native";
import { OverviewLabel, SensorContainer } from "./device-details.styled";

type Sensor = {
  type: "temperature" | "humidity" | "other";
  currentReading: any;
};

const SensorOverview: FC = () => {
  const sensors: Sensor[] = [
    {
      type: "temperature",
      currentReading: 30,
    },
    {
      type: "humidity",
      currentReading: 40,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
      }}
    >
      {sensors.map((sensor, index) => (
        <SensorContainer key={index}>
          <OverviewLabel>{sensor.type}</OverviewLabel>
          <Text>{sensor.currentReading}</Text>
        </SensorContainer>
      ))}
    </View>
  );
};

export default SensorOverview;
