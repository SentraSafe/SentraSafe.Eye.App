import IconOutlined from "@/components/icons/icon-outlined.component";
import {
  MediumText,
  MediumTextBold,
} from "@/components/text-elements/text-elements.styled";
import { Machine } from "@/lib/api/machine/machine-api.types";
import { MachineType } from "@/lib/constants/shared";
import { severityColor } from "@/lib/helpers/enum-helpers";
import { SeverityEnum } from "@/lib/types/shared";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { View } from "react-native";
import { Overview, Wrapper } from "../machine-details.styled";

const DetailsOverview: FC<{ machine?: Machine; severity?: SeverityEnum }> = ({
  machine,
  severity,
}) => {
  return (
    <Overview>
      <View>
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
          <MediumText>
            {MachineType.find((x) => x.value == machine?.type)?.type}
          </MediumText>
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
      </View>

      {severity && severity > SeverityEnum.Information && (
        <IconOutlined
          icon="warning"
          color={severityColor(severity, "#fff", "#ffee00", "#ff4848")}
          size={45}
          outlineColor="#000"
        ></IconOutlined>
      )}
    </Overview>
  );
};

export default DetailsOverview;
