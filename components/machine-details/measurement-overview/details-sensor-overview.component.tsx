import { MeasurementTypes } from "@/lib/constants/shared";
import { MeasurementData, MeasurementEnum } from "@/lib/types/shared";
import { FC } from "react";
import { FlatList, Text } from "react-native";
import { MeasurementContainer, OverviewLabel } from "../machine-details.styled";

type Props = {
  measurements?: MeasurementData[];
};

const MeasurementOverview: FC<Props> = ({ measurements }) => {
  return (
    <FlatList
      data={measurements?.filter(
        (x) => x.measurementType !== MeasurementEnum.UpTime
      )}
      numColumns={2}
      contentContainerStyle={{ flex: 1 }}
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        width: "100%",
      }}
      renderItem={({ item }) => (
        <MeasurementContainer>
          <OverviewLabel>
            {
              MeasurementTypes.find((x) => x.value === item.measurementType)
                ?.type
            }
          </OverviewLabel>
          <Text>{item.value}</Text>
        </MeasurementContainer>
      )}
    ></FlatList>
  );
};

export default MeasurementOverview;
