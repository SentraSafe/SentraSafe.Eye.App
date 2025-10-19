import { Machine } from "@/lib/api/machine/machine-api.types";
import { Link } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import IconOutlined from "../icons/icon-outlined.component";
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
            pathname: "/(drawer)/machines/[machineId]",
            params: { machineId: x.id },
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
                    <MediumTextBold>Intern lokation: </MediumTextBold>
                    <MediumText>{x.sublocation}</MediumText>
                  </TextWrapper>
                  <TextWrapper>
                    <MediumTextBold>Status: </MediumTextBold>
                    <MediumText>Running</MediumText>
                  </TextWrapper>
                </View>
              )}
            </View>
            <IconOutlined
              icon="warning"
              color="#ffed9d"
              size={45}
              outlineColor="#000"
            ></IconOutlined>
          </Card>
        </Link>
      ))}
    </Wrapper>
  );
};

export default CarouselItem;
