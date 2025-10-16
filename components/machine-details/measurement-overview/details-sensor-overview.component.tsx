import { Measurement } from "@/lib/types/shared";
import { FC } from "react";
import { Text, View } from "react-native";
import { MeasurementContainer, OverviewLabel } from "../machine-details.styled";

type Props = {
  measurements: Measurement[];
};

const MeasurementOverview: FC<Props> = ({ measurements }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
      }}
    >
      {measurements.map((measurement, index) => (
        <MeasurementContainer key={index}>
          <OverviewLabel>{measurement.measurementType}</OverviewLabel>
          <Text>{measurement.value}</Text>
        </MeasurementContainer>
      ))}
    </View>
  );
};

export default MeasurementOverview;
