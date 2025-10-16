import { FlatListItem } from "@/components/alarm-details/alarm-log-list/alarm-log-list.styled";
import FormButton from "@/components/buttons/form-button.component";
import { Card, TextWrapper } from "@/components/card/card.styled";
import {
  LargeHeader,
  MediumTextBold,
} from "@/components/text-elements/text-elements.styled";
import { HandleAlarmContext } from "@/lib/hooks/contexts/alarm-context";
import { router, useLocalSearchParams } from "expo-router";
import { FC, use } from "react";
import { FlatList, Text, View } from "react-native";

const Alarm: FC = () => {
  const { alarmId } = useLocalSearchParams();

  const { setAlarmToHandle } = use(HandleAlarmContext);

  const alarmLogs = [
    {
      id: 1,
      timestamp: new Date(),
      measurement: 38,
      handled: false,
      handledBy: null,
    },
    {
      id: 2,
      timestamp: new Date(),
      measurement: 38,
      handled: false,
      handledBy: null,
    },
    {
      id: 3,
      timestamp: new Date(),
      measurement: 38,
      handled: true,
      handledBy: "Max Måneby",
    },
  ];

  return (
    <View>
      <LargeHeader>Alarm detaljer</LargeHeader>

      <Card>
        <TextWrapper>
          <MediumTextBold>Titel: </MediumTextBold>
          <Text>Max temperature 35C</Text>
        </TextWrapper>
        <TextWrapper>
          <MediumTextBold>Målingstype: </MediumTextBold>
          <Text>Temperatur</Text>
        </TextWrapper>
        <View>
          <MediumTextBold>Beskrivelse:</MediumTextBold>
          <Text>Udløses hvis temperaturen måles til 35 og derover</Text>
        </View>
      </Card>

      <LargeHeader>Hændelser</LargeHeader>
      <FlatList
        data={alarmLogs}
        renderItem={({ item }) => (
          <FlatListItem>
            <MediumTextBold>{item.timestamp.toLocaleString()}: </MediumTextBold>{" "}
            <Text>{item.measurement}</Text>
            <Text>{item.handled}</Text>
            <Text>{item.handledBy}</Text>
            {!item.handled && (
              <FormButton
                onPress={() => {
                  setAlarmToHandle({ id: item.id, handledBy: "Max Måneby" });
                  router.push("/(modals)/alarm/handle-alarm");
                }}
              >
                Håndter
              </FormButton>
            )}
          </FlatListItem>
        )}
      ></FlatList>
    </View>
  );
};

export default Alarm;
