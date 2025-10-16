import { Alarm } from "@/lib/api/alarm/alarm-api.types";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { LargeHeader } from "../../text-elements/text-elements.styled";
import { AlarmContainer, Wrapper } from "../device-details.styled";
import Button from "./event-list-button.component";

type Props = {
  machineId: number;
  alarms: Alarm[];
};

const DetailsEventList: FC<Props> = ({ alarms, machineId }) => {
  return (
    <View
      style={{
        margin: 20,
      }}
    >
      <LargeHeader>Alarmer</LargeHeader>
      <FlatList
        data={alarms}
        renderItem={({ item }) => (
          <AlarmContainer>
            <Wrapper>
              <Ionicons
                style={{ fontSize: 20 }}
                name="warning"
                color={item.severity === 1 ? "#ffed9d" : "#f33"}
              />
              <Text>{item.description}</Text>
            </Wrapper>
            <Wrapper>
              <Button
                backgroundColor="#63c1ff"
                href={{
                  pathname:
                    "/(drawer)/device/[deviceId]/alarm-details/[alarmId]",
                  params: { deviceId: machineId, alarmId: item.id },
                }}
                icon="information"
              />
              <Button
                backgroundColor="#ffd900"
                href={".."}
                icon="create-outline"
              />
              <Button backgroundColor="red" href=".." icon="trash-bin" />
            </Wrapper>
          </AlarmContainer>
        )}
      ></FlatList>
    </View>
  );
};

export default DetailsEventList;
