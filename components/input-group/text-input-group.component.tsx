import { FC } from "react";
import { InputModeOptions } from "react-native";
import { Container, Label, StyledTextInput } from "./input-group.styled";

type Props = {
  setValue?: (value: string) => void;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  disabled?: boolean;
  inputMode?: InputModeOptions;
};

const TextInputGroup: FC<Props> = ({
  label,
  placeholder,
  setValue,
  initialValue,
  disabled,
  inputMode = "text",
}) => {
  return (
    <Container>
      {!!label && <Label>{label}:</Label>}
      <StyledTextInput
        inputMode={inputMode}
        placeholder={placeholder}
        onChangeText={setValue}
        defaultValue={initialValue}
        readOnly={disabled}
      />
    </Container>
  );
};

export default TextInputGroup;
