import AddButton from "@/components/buttons/add-button.component";
import { Container } from "@/components/containers/containers.styled";
import FilterViewButton from "@/components/filter-elements/filter-view-button.component";
import CarouselItem from "@/components/machine-carousel/carousel-item.component";
import { LargeHeader } from "@/components/text-elements/text-elements.styled";
import { getLocations } from "@/lib/api/location/location-api";
import { getMachines } from "@/lib/api/machine/machine-api";
import { Machine } from "@/lib/api/machine/machine-api.types";
import { LocationContext } from "@/lib/hooks/contexts/location-context";
import { MachineFilterContext } from "@/lib/hooks/contexts/machine-context";
import { useRouter } from "expo-router";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { interpolate } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  TAnimationStyle,
} from "react-native-reanimated-carousel";

export default function Index() {
  const windowDimensions = Dimensions.get("window");

  const [machines, setMachines] = useState<Machine[]>([]);

  const { setLocations } = use(LocationContext);
  const { machineFilter } = use(MachineFilterContext);

  const [groupSize, setGroupSize] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const [machinesResponse, locationsResponse] = await Promise.all([
        getMachines(machineFilter),
        getLocations(),
      ]);

      setMachines(machinesResponse);
      setLocations(locationsResponse);
    };
    getData();
  }, [machineFilter, setLocations]);

  const arrangedMachines = useMemo(() => {
    const arrangedMachines: Machine[][] = [];
    for (let i = 0; i < machines.length; i += groupSize) {
      arrangedMachines.push(machines.slice(i, i + groupSize));
    }
    return arrangedMachines;
  }, [machines, groupSize]);

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
          data={arrangedMachines}
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
      <AddButton href="/(modals)/machine/add-machine" />
    </GestureHandlerRootView>
  );
}
