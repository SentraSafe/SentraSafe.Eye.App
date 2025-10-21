import { Log } from "@/lib/api/logs/logs-api.types";
import { Machine } from "@/lib/api/machine/machine-api.types";
import { severityColor } from "@/lib/helpers/enum-helpers";
import useSignalR from "@/lib/hooks/signalr-clients/signalr-client-hook";
import { SeverityEnum } from "@/lib/types/shared";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import IconOutlined from "../icons/icon-outlined.component";
import { Card } from "../machine-card/card.styled";
import {
  LargeHeader,
  MediumText,
  MediumTextBold,
} from "../text-elements/text-elements.styled";
import { TextWrapper, Wrapper } from "./carousel.styled";
import {MachineType} from "@/lib/constants/shared";

type Props = {
  groupSize: number;
  machines: Machine[];
  width: number;
  height: number;
};

const CarouselItem: FC<Props> = ({ groupSize, machines, width, height }) => {
  const { subscribe, unsubscribe } = useSignalR<Log[]>("AlarmHub");
  const [severities, setSeverities] = useState<SeverityEnum[]>([]);

  useEffect(() => {
    machines?.forEach(async (x, index) => {
      const eventLogs = await subscribe(
        "SubscribeToAlarms",
        [`${x.id}`],
        "updateEvents",
        (eventLogs: Log[]) => {
          if (eventLogs?.length) {
            setSeverities((prev: SeverityEnum[]) => {
              return machines.map((x, thisIndex) => {
                if (index !== thisIndex) return prev[thisIndex];

                return eventLogs.sort((a, b) => a.severity - b.severity)[0]
                  ?.severity;
              });
            });
          }
        }
      );

      setSeverities((prev) => [
        ...prev,
        eventLogs?.sort((a, b) => a.severity - b.severity)[0]?.severity ??
          SeverityEnum.Information,
      ]);
    });
  }, [machines, subscribe]);

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
                    <MediumText>{MachineType.find(y => y.value == x.type)?.value}</MediumText>
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
