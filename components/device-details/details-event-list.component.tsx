import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { LargeHeader } from "../text-elements/text-elements.styled";
import { AlarmContainer, Wrapper } from "./device-details.styled";

const DetailsEventList: FC = () => {
  const alarms = [
    {
      description: "Temperature too high",
      status: "critical",
    },
    {
      description: "Temperature too high",
      status: "warning",
    },
  ];

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
                color={item.status === "warning" ? "#ffed9d" : "#f33"}
              />
              <Text>{item.description}</Text>
            </Wrapper>
            <Wrapper>
              <Pressable
                style={{
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 35,
                  width: 35,
                  marginRight: 5,
                  backgroundColor: "#63c1ff",
                }}
              >
                <Ionicons
                  style={{ fontSize: 20, padding: 4 }}
                  name="information"
                  color="white"
                />
              </Pressable>
              <Pressable
                style={{
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 35,
                  width: 35,
                  marginRight: 5,
                  backgroundColor: "#ffd900",
                }}
              >
                <Ionicons
                  style={{ fontSize: 20, padding: 4 }}
                  name="create-outline"
                  color="white"
                />
              </Pressable>
              <Pressable
                style={{
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 35,
                  width: 35,
                  backgroundColor: "red",
                }}
              >
                <Ionicons
                  style={{ fontSize: 20 }}
                  name="trash-bin"
                  color="white"
                />
              </Pressable>
            </Wrapper>
          </AlarmContainer>
        )}
      ></FlatList>
    </View>
  );
};

export default DetailsEventList;
