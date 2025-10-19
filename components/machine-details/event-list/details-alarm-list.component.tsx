import FormButton from "@/components/buttons/form-button.component";
import IconOutlined from "@/components/icons/icon-outlined.component";
import { Alarm } from "@/lib/api/alarm/alarm-api.types";
import { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { LargeHeader } from "../../text-elements/text-elements.styled";
import { EventContainer, Wrapper } from "../machine-details.styled";

type Props = {
  machineId: number;
  alarms: Alarm[];
};

const DetailsEventList: FC<Props> = ({ alarms, machineId }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
      }}
    >
      <LargeHeader>Hændelser</LargeHeader>

      <FlatList
        data={alarms}
        renderItem={({ item }) => (
          <EventContainer>
            <Wrapper>
              <IconOutlined
                icon="warning"
                color={item.severity === 1 ? "#ffed9d" : "#f33"}
                size={30}
                outlineColor="#000"
              ></IconOutlined>
              <Text>{item.title}</Text>
            </Wrapper>
            <FormButton
              fontSize={15}
              paddingVertical={10}
              paddingHorizontal={0}
              onPress={() => {}}
            >
              Håndter
            </FormButton>
          </EventContainer>
        )}
      ></FlatList>
    </View>
  );
};

export default DetailsEventList;
