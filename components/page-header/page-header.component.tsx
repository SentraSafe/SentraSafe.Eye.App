import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable } from "react-native";
import { LargeHeader } from "../text-elements/text-elements.styled";
import { StyledContainer, StyledIcon, Wrapper } from "./page-header.styled";

const PageHeader: FC<{
  children?: string;
  iconType?: keyof typeof Ionicons.glyphMap;
  title?: string;
  onPress?: () => void;
}> = ({ children, iconType, onPress, title }) => {
  return (
    <>
      <StyledContainer>
        <Wrapper>
          <LargeHeader>{title ?? children}</LargeHeader>
        </Wrapper>
        {!!iconType && (
          <Pressable onPress={() => onPress && onPress()}>
            <StyledIcon name={iconType} />
          </Pressable>
        )}
      </StyledContainer>
    </>
  );
};

export default PageHeader;
