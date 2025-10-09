import { FC } from "react";
import { Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { CenteredContainer, Container } from "../containers/containers.styled";
import { LargeHeader } from "../text-elements/text-elements.styled";
import { StyledText } from "./device-carousel.styled";

const DeviceCarousel: FC<{ title?: string }> = ({ title }) => {
  const devices = ["device 1", "device 2", "device3"];

  return (
    <Container>
      <LargeHeader>{title}</LargeHeader>
      <CenteredContainer>
        <PagerView style={{ width: "100%", height: "100%" }} initialPage={0}>
          {devices.map((device, index) => (
            <View key={index}>
              <Text>Sup</Text>
              <Container>
                <StyledText>{device}</StyledText>
              </Container>
            </View>
          ))}
        </PagerView>
      </CenteredContainer>
    </Container>
  );
};

export default DeviceCarousel;
