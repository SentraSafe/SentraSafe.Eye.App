import { Machine } from "@/types/machine";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Text } from "react-native";
import { Overview, OverviewLabel, Wrapper } from "./device-details.styled";

const DetailsOverview: FC<{ deviceName: string }> = ({ deviceName }) => {
  const machineDetails: Machine = {
    name: "Maskine 1",
    location: "Afdeling A1",
    status: "Running",
  };

  return (
    <Overview>
      <Wrapper>
        <OverviewLabel>Navn: </OverviewLabel>
        <Text>{deviceName}</Text>
      </Wrapper>
      <Wrapper>
        <OverviewLabel>Lokation: </OverviewLabel>
        <Text>{machineDetails.location}</Text>
      </Wrapper>
      <Wrapper>
        <OverviewLabel>Status: </OverviewLabel>
        <Ionicons name="play-circle-outline" style={{ color: "#0f1" }} />
        <Text> {machineDetails.status}</Text>
      </Wrapper>
    </Overview>
  );
};

export default DetailsOverview;
