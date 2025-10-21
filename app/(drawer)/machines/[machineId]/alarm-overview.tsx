import FloatingButton from "@/components/buttons/add-button.component";
import IconOutlined from "@/components/icons/icon-outlined.component";
import Button from "@/components/machine-details/event-list/alarm-list-button.component";
import {
  AlarmContainer,
  Wrapper,
} from "@/components/machine-details/machine-details.styled";
import {
  LargeHeader,
  MediumTextBold,
} from "@/components/text-elements/text-elements.styled";
import { getAlarms, submitRemoveAlarm } from "@/lib/api/alarm/alarm-api";
import { Alarm } from "@/lib/api/alarm/alarm-api.types";
import { MeasurementTypes } from "@/lib/constants/shared";
import { severityColor } from "@/lib/helpers/enum-helpers";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import { UpdateAlarmContext } from "@/lib/hooks/contexts/alarm-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { FC, use, useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

const AlarmOverviewModal: FC = () => {
  const { machineId } = useLocalSearchParams();
  const { setAlarmToUpdate } = use(UpdateAlarmContext);
  const { accessToken } = use(AuthenticationContext);

  const [alarms, setAlarms] = useState<Alarm[]>();
  const [selectedItem, setSelectedItem] = useState<Alarm>();

  const callback = useCallback(() => {
    const init = async () => {
      const [alarmsResponse] = await getAlarms(Number(machineId), accessToken);

      setAlarms(alarmsResponse);
    };

    init();
  }, [accessToken, machineId]);

  useFocusEffect(callback);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <LargeHeader>Alarmer</LargeHeader>
      <FlatList
        data={alarms}
        renderItem={({ item }) => (
          <AlarmContainer>
            <Wrapper>
              <IconOutlined
                icon="warning"
                color={severityColor(
                  item.severity,
                  "#41aaff",
                  "#ffed9d",
                  "#f33"
                )}
                size={45}
                outlineColor="#000"
              ></IconOutlined>
              <View style={{ paddingHorizontal: 20 }}>
                <Wrapper>
                  <MediumTextBold>Titel: </MediumTextBold>
                  <Text>{item.title}</Text>
                </Wrapper>
                <Wrapper>
                  <MediumTextBold>Målingstype: </MediumTextBold>
                  <Text>
                    {
                      MeasurementTypes.find((x) => x.value === item.valueType)
                        ?.type
                    }
                  </Text>
                </Wrapper>
                <Wrapper style={{ marginBottom: 5 }}>
                  <MediumTextBold>Maksimale måling: </MediumTextBold>
                  <Text>{item.maximumValue}</Text>
                </Wrapper>
                <View style={{ maxWidth: 130 }}>
                  <MediumTextBold>Beskrivelse:</MediumTextBold>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={item.id === selectedItem?.id ? 5 : 1}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </Wrapper>
            <View style={{ gap: 10 }}>
              <Ionicons
                name="resize"
                size={25}
                style={{ alignSelf: "center" }}
                onPress={() => {
                  setSelectedItem(
                    item.id === selectedItem?.id ? undefined : item
                  );
                }}
              />

              <Button
                backgroundColor="#ffd900"
                onPress={() => setAlarmToUpdate(item)}
                href={{
                  pathname: "/(modals)/alarm/[alarmId]/edit-alarm",
                  params: { alarmId: Number(item.id) },
                }}
                icon="create-outline"
              />
              <Button
                backgroundColor="red"
                onPress={async () => {
                  if (!item.id) return;
                  const [, error] = await submitRemoveAlarm(
                    item.id,
                    accessToken
                  );

                  if (!error) callback();
                }}
                icon="trash-bin"
              />
            </View>
          </AlarmContainer>
        )}
      ></FlatList>
      <FloatingButton
        icon="add"
        href={{
          pathname: "/(modals)/alarm/[machineId]/add-alarm",
          params: { machineId: machineId as string },
        }}
      />
    </View>
  );
};

export default AlarmOverviewModal;
