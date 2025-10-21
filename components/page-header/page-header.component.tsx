import { Ionicons } from "@expo/vector-icons";
import { FC, ReactElement, ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";
import { LargeHeader } from "../text-elements/text-elements.styled";
import { StyledContainer, StyledIcon, Wrapper } from "./page-header.styled";

const PageHeader: FC<{
  icon?: () => ReactElement<PressableProps>;
  children?: ReactNode | string;
  iconType?: keyof typeof Ionicons.glyphMap;
  title?: string;
  onPress?: () => void;
}> = ({ children, iconType, onPress, title, icon }) => {
  const iconElement = icon && icon();

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
      {icon
        ? iconElement
        : !!iconType && (
            <Pressable onPress={() => onPress && onPress()}>
              <StyledIcon name={iconType} />
            </Pressable>
          )}
    </StyledContainer>
  );
};

export default PageHeader;
