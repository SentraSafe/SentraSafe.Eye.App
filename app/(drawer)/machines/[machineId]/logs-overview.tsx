import FloatingButton from "@/components/buttons/add-button.component";
import FormButton from "@/components/buttons/form-button.component";
import IconOutlined from "@/components/icons/icon-outlined.component";
import {
  EventContainer,
  Wrapper,
} from "@/components/machine-details/machine-details.styled";
import {
  LargeHeader,
  MediumTextBold,
} from "@/components/text-elements/text-elements.styled";
import { getLogs } from "@/lib/api/logs/logs-api";
import { Log } from "@/lib/api/logs/logs-api.types";
import { severityColor } from "@/lib/helpers/enum-helpers";
import { HandleAlarmContext } from "@/lib/hooks/contexts/alarm-context";
import { LogFilterContext } from "@/lib/hooks/contexts/notification-context";
import { SeverityEnum } from "@/lib/types/shared";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { FC, use, useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

const LogsOverview: FC = () => {
  const { machineId } = useLocalSearchParams();
  const { setLogToHandle: setAlarmToHandle } = use(HandleAlarmContext);
  const { logFilter } = use(LogFilterContext);
  const [logs, setLogs] = useState<Log[]>();
  const [selectedItem, setSelectedItem] = useState<Log>();

  const callback = useCallback(() => {
    const init = async () => {
      console.log(logFilter);
      const [logsResponse] = await getLogs({
        ...logFilter,
        machineId: Number(machineId),
      });

      setLogs(logsResponse);
    };

    init();
  }, [logFilter, machineId]);

  useFocusEffect(callback);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <LargeHeader>Hændelser</LargeHeader>
          <FormButton
            paddingHorizontal={30}
            paddingVertical={10}
            onPress={() => router.push("/(modals)/logs/log-filter")}
          >
            Filtre
          </FormButton>
        </View>

        <FlatList
          data={logs}
          renderItem={({ item }) => (
            <EventContainer>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Wrapper>
                  <IconOutlined
                    icon="warning"
                    color={severityColor(
                      item.isHandled ? SeverityEnum.Information : item.severity,
                      "#41aaff",
                      "#ffed9d",
                      "#f33"
                    )}
                    size={35}
                    outlineColor="#000"
                  ></IconOutlined>
                  <View style={{ paddingHorizontal: 20 }}>
                    <MediumTextBold>Tidspunkt: </MediumTextBold>
                    <Text>{item.timeStamp.toLocaleString()}</Text>
                    {item.value != null && (
                      <Wrapper>
                        <MediumTextBold>Årsag: </MediumTextBold>
                        <Text>{item.value}</Text>
                      </Wrapper>
                    )}
                    <Wrapper>
                      <MediumTextBold>Håndteret: </MediumTextBold>
                      <Text>{item.isHandled ? "Ja" : "Nej"}</Text>
                    </Wrapper>
                    {selectedItem === item && item.isHandled && (
                      <>
                        <MediumTextBold>Håndteret tidspunkt: </MediumTextBold>
                        <Text>{item.timeStamp.toLocaleString()}</Text>
                        <Wrapper>
                          <MediumTextBold>Håndteret af: </MediumTextBold>
                          <Text>{item.handledBy}</Text>
                        </Wrapper>
                        <MediumTextBold>Beskrivelse: </MediumTextBold>
                        <Text>{item.description}</Text>
                      </>
                    )}
                  </View>
                </Wrapper>
                <Ionicons
                  name="resize"
                  size={25}
                  style={{ alignSelf: "flex-start", marginTop: 10 }}
                  onPress={() => {
                    setSelectedItem(
                      item.id === selectedItem?.id ? undefined : item
                    );
                  }}
                />
              </View>
              {!item.isHandled && (
                <View style={{ alignSelf: "center", flex: 1, marginTop: 5 }}>
                  <FormButton
                    fontSize={15}
                    paddingVertical={10}
                    paddingHorizontal={40}
                    onPress={() => {
                      setAlarmToHandle(item);
                      router.push({
                        pathname: "/(modals)/logs/[logId]/handle-log",
                        params: { logId: item.id },
                      });
                    }}
                  >
                    Håndter
                  </FormButton>
                </View>
              )}
            </EventContainer>
          )}
        ></FlatList>
      </View>

      <FloatingButton icon="refresh" onPress={callback} />
    </View>
  );
};

export default LogsOverview;
