import {
  MediumText,
  MediumTextBold,
} from "@/components/text-elements/text-elements.styled";
import { Machine } from "@/lib/api/machine/machine-api.types";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Overview, Wrapper } from "../machine-details.styled";
import {MachineType} from "@/lib/constants/shared";

const DetailsOverview: FC<{ machine?: Machine }> = ({ machine }) => {
  return (
    <Overview>
      <Wrapper>
        <MediumTextBold>Navn: </MediumTextBold>
        <MediumText>{machine?.name}</MediumText>
      </Wrapper>
      <Wrapper>
        <MediumTextBold>Lokation: </MediumTextBold>
        <MediumText>{machine?.location}</MediumText>
      </Wrapper>
      <Wrapper>
        <MediumTextBold>Intern lokation: </MediumTextBold>
        <MediumText>{machine?.sublocation}</MediumText>
      </Wrapper>
        <Wrapper>
            <MediumTextBold>Maskine type: </MediumTextBold>
            <MediumText>{MachineType.find(x => x.value == machine?.type)?.value}</MediumText>
        </Wrapper>
      <Wrapper>
        <MediumTextBold>Status: </MediumTextBold>
        <Ionicons
          name="play-circle-outline"
          style={{
            color: machine?.status === "Healthy" ? "#0f1" : "#ff0000",
            alignSelf: "center",
          }}
        />
        <MediumText>{machine?.status}</MediumText>
      </Wrapper>
    </Overview>
  );
};

export default DetailsOverview;
