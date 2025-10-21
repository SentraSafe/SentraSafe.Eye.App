import { MeasurementTypes } from "@/lib/constants/shared";
import { MeasurementData } from "@/lib/types/shared";
import { FC } from "react";
import { Text, View } from "react-native";
import { MeasurementContainer, OverviewLabel } from "../machine-details.styled";

type Props = {
  measurements?: MeasurementData[];
};

const MeasurementOverview: FC<Props> = ({ measurements }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
      }}
    >
      {measurements?.map((measurement, index) => (
        <MeasurementContainer key={measurement.measurementType}>
          <OverviewLabel>
            {
              MeasurementTypes.find(
                (x) => x.value === measurement.measurementType
              )?.type
            }
          </OverviewLabel>
          <Text>{measurement.value}</Text>
        </MeasurementContainer>
      ))}
    </View>
  );
};

export default MeasurementOverview;
