import { Machine } from "@/types/machine";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import { Card } from "../machine-card/card.styled";
import {
  LargeHeader,
  MediumText,
  MediumTextBold,
} from "../text-elements/text-elements.styled";
import { TextWrapper, Wrapper } from "./carousel.styled";

type Props = {
  groupSize: number;
  machines: Machine[];
  width: number;
  height: number;
};

const CarouselItem: FC<Props> = ({ groupSize, machines, width, height }) => {
  return (
    <Wrapper groupSize={groupSize} height={height}>
      {machines.map((x, index) => (
        <Link
          href={{
            pathname: "/(drawer)/device/[deviceId]",
            params: { deviceId: x.name },
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
                    <MediumTextBold>Status: </MediumTextBold>
                    <MediumText>{x.status}</MediumText>
                  </TextWrapper>
                </View>
              )}
            </View>
            <View style={{ position: "relative", width: 44, height: 45 }}>
              <Ionicons
                name="warning-outline"
                color="#000"
                size={45}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
              <Ionicons
                name="warning"
                color="#ffed9d"
                size={40}
                style={{ position: "absolute", top: 3, left: 3 }}
              />
            </View>
          </Card>
        </Link>
      ))}
    </Wrapper>
  );
};

export default CarouselItem;
