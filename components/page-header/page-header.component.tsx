import { Ionicons } from "@expo/vector-icons";
import { FC, ReactNode } from "react";
import { Pressable } from "react-native";
import { LargeHeader } from "../text-elements/text-elements.styled";
import { StyledContainer, StyledIcon, Wrapper } from "./page-header.styled";

const PageHeader: FC<{
  children?: ReactNode | string;
  iconType?: keyof typeof Ionicons.glyphMap;
  title?: string;
  onPress?: () => void;
}> = ({ children, iconType, onPress, title }) => {
  return (
    <StyledContainer>
      <Wrapper>
        {!!title ||
          (!!children &&
            (!!title || typeof children === "string" ? (
              <LargeHeader>{title ?? children}</LargeHeader>
            ) : (
              children
            )))}
      </Wrapper>
      {!!iconType && (
        <Pressable style={{}} onPress={() => onPress && onPress()}>
          <StyledIcon name={iconType} />
        </Pressable>
      )}
    </StyledContainer>
  );
};

export default PageHeader;
