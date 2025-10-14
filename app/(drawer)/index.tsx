import { Container } from "@/components/containers/containers.styled";
import FilterViewButton from "@/components/filter-elements/filter-view-button.component";
import CarouselItem from "@/components/machine-carousel/carousel-item.component";
import { LargeHeader } from "@/components/text-elements/text-elements.styled";
import { Machine } from "@/types/machine";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { interpolate } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  TAnimationStyle,
} from "react-native-reanimated-carousel";

export default function Index() {
  const windowDimensions = Dimensions.get("window");

  const initMachines: Machine[] = useMemo(
    () => [
      {
        name: "Machine 1",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 2",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 3",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 4",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 5",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 6",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 7",
        status: "Running",
        location: "B1",
      },
      {
        name: "Machine 8",
        status: "Running",
        location: "B1",
      },
    ],
    []
  );

  const [machines, setMachines] = useState<Machine[][]>(
    initMachines.map((x) => [x])
  );

  const [groupSize, setGroupSize] = useState(1);

  useEffect(() => {
    const arrangedMachines: Machine[][] = [];
    for (let i = 0; i < initMachines.length; i += groupSize) {
      arrangedMachines.push(initMachines.slice(i, i + groupSize));
    }
    setMachines(arrangedMachines);
  }, [initMachines, groupSize]);

  const carouselItemWidth = windowDimensions.width - 20;
  const carouselItemHeight = 300;

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const zIndex = interpolate(value, [-1, 0, 1], [0, 300, 0]);
      const translateX = interpolate(
        value,
        [-1, 0, 1],
        [
          -(carouselItemWidth / groupSize + 5),
          0,
          carouselItemWidth / groupSize + 5,
        ]
      );

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    [carouselItemWidth, groupSize]
  );

  const carousel = useRef<ICarouselInstance>(null);

  useEffect(() => {
    carousel.current?.scrollTo({ index: 0 });
  }, [groupSize]);

  const router = useRouter();

  return (
    <GestureHandlerRootView>
      <Container style={{ marginLeft: 10, marginRight: 10, height: "100%" }}>
        <LargeHeader style={{ marginBottom: 20 }}>Oversigt</LargeHeader>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#000",
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => router.push("/(modals)/machine/machine-filter")}
          >
            <Text style={{ color: "#fff" }}>Filtre</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FilterViewButton
              iconSource="Ionicons"
              icon="square"
              selected={groupSize === 1}
              setSelected={() => setGroupSize(1)}
              style={{ borderStartStartRadius: 10, borderStartEndRadius: 10 }}
            />
            <FilterViewButton
              iconSource="Ionicons"
              icon="grid"
              selected={groupSize === 2}
              setSelected={() => setGroupSize(2)}
              style={{ borderEndStartRadius: 10, borderEndEndRadius: 10 }}
            />
          </View>
        </View>

        <Carousel
          ref={carousel}
          data={machines}
          renderItem={({ item }) => (
            <CarouselItem
              width={carouselItemWidth}
              height={carouselItemHeight}
              groupSize={groupSize}
              machines={item}
            />
          )}
          width={carouselItemWidth}
          loop={false}
          height={carouselItemHeight}
          snapEnabled={false}
          pagingEnabled={true}
          style={{ width: windowDimensions.width }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 1,
          }}
          customAnimation={animationStyle}
        ></Carousel>
      </Container>
      <Pressable
        style={{
          borderRadius: 100,
          backgroundColor: "#000",
          position: "absolute",
          bottom: 40,
          left: (windowDimensions.width - 50) / 2,
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onPress={() => router.push("/(modals)/machine/add-machine")}
      >
        <Ionicons name="add" color="#fff" style={{ fontSize: 22 }} />
      </Pressable>
    </GestureHandlerRootView>
  );
}
