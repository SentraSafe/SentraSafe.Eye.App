import { Ionicons } from "@expo/vector-icons";
import { FC, ReactNode } from "react";
import { Pressable } from "react-native";
import { StyledContainer, StyledIcon, Wrapper } from "./page-header.styled";

const PageHeader: FC<{
  children?: ReactNode;
  iconType?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}> = ({ children, iconType, onPress }) => {
  return (
    <StyledContainer>
      <Wrapper>{children}</Wrapper>
      {!!iconType && (
        <Pressable onPress={() => onPress && onPress()}>
          <StyledIcon name={iconType} />
        </Pressable>
      )}
    </StyledContainer>
  );
};

export default PageHeader;
