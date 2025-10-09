import { Card } from "@/components/card/card.styled";
import { Container } from "@/components/containers/containers.styled";
import { LargeHeader } from "@/components/text-elements/text-elements.styled";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";

type Machine = {
  name: string;
};

export default function Index() {
  const screenDimensions = Dimensions.get("screen");

  const initMachines: Machine[] = useMemo(
    () => [
      {
        name: "Machine 1",
      },
      {
        name: "Machine 2",
      },
      {
        name: "Machine 3",
      },
      {
        name: "Machine 4",
      },
      {
        name: "Machine 5",
      },
      {
        name: "Machine 6",
      },
      {
        name: "Machine 7",
      },
      {
        name: "Machine 8",
      },
    ],
    []
  );

  const [machines, setMachines] = useState<Machine[][]>(
    initMachines.map((x) => [x])
  );

  const [itemGroups, setItemGroups] = useState(2);

  useEffect(() => {
    const arrangedMachines: Machine[][] = [];
    for (let i = 0; i < initMachines.length; i += itemGroups) {
      arrangedMachines.push(initMachines.slice(i, i + itemGroups));
    }
    setMachines(arrangedMachines);
  }, [initMachines, itemGroups]);

  return (
    <GestureHandlerRootView>
      <Container style={{ marginLeft: 10, marginRight: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <LargeHeader>Oversigt</LargeHeader>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: itemGroups === 1 ? "#41aaff" : "#949494",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setItemGroups(1);
              }}
            >
              <Ionicons
                color={itemGroups === 1 ? "#41aaff" : "#949494"}
                style={{ fontSize: 25 }}
                name="grid"
              />
            </Pressable>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: itemGroups === 2 ? "#41aaff" : "#949494",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setItemGroups(2);
              }}
            >
              <Ionicons
                color={itemGroups === 2 ? "#41aaff" : "#949494"}
                style={{ fontSize: 25 }}
                name="grid"
              />
            </Pressable>
            <Pressable
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: itemGroups === 3 ? "#41aaff" : "#949494",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setItemGroups(3);
              }}
            >
              <Ionicons
                color={itemGroups === 3 ? "#41aaff" : "#949494"}
                style={{ fontSize: 25 }}
                name="grid"
              />
            </Pressable>
          </View>
        </View>

        <Carousel
          data={machines}
          renderItem={({ item }) => (
            <View style={{ width: 200 }}>
              {item.map((x, index) => (
                <Link
                  href={{
                    pathname: "/device/[deviceId]",
                    params: { deviceId: x.name },
                  }}
                  key={index}
                  style={{ marginBottom: 10 }}
                >
                  <Card width="130px">
                    <Ionicons
                      name="warning"
                      color="#ffed9d"
                      style={{ fontSize: 20 }}
                    />
                    <Text>{x.name}</Text>
                  </Card>
                </Link>
              ))}
            </View>
          )}
          width={250}
          loop={false}
          height={300}
          snapEnabled={false}
          pagingEnabled={true}
          style={{ width: screenDimensions.width }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 1,
          }}
        ></Carousel>
      </Container>
    </GestureHandlerRootView>
  );
}
