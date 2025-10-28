import { Log } from "@/lib/api/logs/logs-api.types";
import { Machine } from "@/lib/api/machine/machine-api.types";
import { MachineType } from "@/lib/constants/shared";
import { severityColor } from "@/lib/helpers/enum-helpers";
import { AlarmHubContext } from "@/lib/hooks/contexts/signalr-client.context";
import { SeverityEnum } from "@/lib/types/shared";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC, use, useEffect, useState } from "react";
import { View } from "react-native";
import IconOutlined from "../icons/icon-outlined.component";
import { Card } from "../machine-card/card.styled";
import {
  LargeHeader,
  MediumText,
  MediumTextBold,
} from "../text-elements/text-elements.styled";
import { TextWrapper, Wrapper } from "./carousel.styled";

type Props = {
  groupSize: number;
  machines: Machine[];
  width: number;
  height: number;
};

const CarouselItem: FC<Props> = ({ groupSize, machines, width, height }) => {
  const [severities, setSeverities] = useState<SeverityEnum[]>([]);
  const alarmConnection = use(AlarmHubContext);

  useEffect(() => {
    machines?.forEach(async (x, index) => {
      alarmConnection
        ?.invoke("SubscribeToAlarms", [x.id.toString()])
        .then((payload: Log[]) => {
          if (payload?.length) {
            setSeverities((prev) => [
              ...prev,
              payload?.sort((a, b) => a.severity - b.severity)[0]?.severity ??
                SeverityEnum.Information,
            ]);
          }
        });

      alarmConnection?.on("updateEvents", (payload) => {
        if (payload?.length) {
          setSeverities(payload[0].severity);
        }
      });
    });
    return () => alarmConnection?.off("updateEvents");
  }, [alarmConnection, machines]);

  return (
    <Wrapper groupSize={groupSize} height={height}>
      {machines.map((x, index) => (
        <Link
          href={{
            pathname: "/(drawer)/machines/[machineId]",
            params: { machineId: x.id },
          }}
          style={{ marginBottom: 10 }}
          key={index}
        >
          <Card
            width={groupSize > 1 ? width / groupSize : (width - 90) / groupSize}
            height={height / groupSize}
          >
            <View style={{ width: "100%", alignItems: "center" }}>
              <LargeHeader>{x.name}</LargeHeader>
              {groupSize === 1 && (
                <View style={{ marginTop: 10, width: "100%" }}>
                  <TextWrapper>
                    <MediumTextBold>Lokation: </MediumTextBold>
                    <MediumText>{x.location}</MediumText>
                  </TextWrapper>
                  <TextWrapper>
                    <MediumTextBold>Intern lokation: </MediumTextBold>
                    <MediumText>{x.sublocation}</MediumText>
                  </TextWrapper>
                  <TextWrapper>
                    <MediumTextBold>Maskine type: </MediumTextBold>
                    <MediumText>
                      {MachineType.find((y) => y.value === x.type)?.type}
                    </MediumText>
                  </TextWrapper>
                  <TextWrapper>
                    <MediumTextBold>Status: </MediumTextBold>
                    <Ionicons
                      name="play-circle-outline"
                      style={{
                        color: x?.status === "Healthy" ? "#0f1" : "#ff0000",
                        alignSelf: "center",
                      }}
                    />
                    <MediumText>{x?.status}</MediumText>
                  </TextWrapper>
                </View>
              )}
            </View>
            {severities[index] > SeverityEnum.Information && (
              <IconOutlined
                icon="warning"
                color={severityColor(
                  severities[index],
                  "#fff",
                  "#ffee00",
                  "#ff4848"
                )}
                size={45}
                outlineColor="#000"
              ></IconOutlined>
            )}
          </Card>
        </Link>
      ))}
    </Wrapper>
  );
};

export default CarouselItem;
