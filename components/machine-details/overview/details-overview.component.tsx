import { Machine } from "@/lib/api/machine/machine-api.types";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Text } from "react-native";
import { Overview, OverviewLabel, Wrapper } from "../device-details.styled";

const DetailsOverview: FC<{ machine?: Machine }> = ({ machine }) => {
  return (
    <Overview>
      <Wrapper>
        <OverviewLabel>Navn: </OverviewLabel>
        <Text>{machine?.name}</Text>
      </Wrapper>
      <Wrapper>
        <OverviewLabel>Lokation: </OverviewLabel>
        <Text>{machine?.location}</Text>
      </Wrapper>
      <Wrapper>
        <OverviewLabel>Status: </OverviewLabel>
        <Ionicons name="play-circle-outline" style={{ color: "#0f1" }} />
        <Text> Running</Text>
      </Wrapper>
    </Overview>
  );
};

export default DetailsOverview;
