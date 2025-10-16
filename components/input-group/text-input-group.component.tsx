import { FC } from "react";
import { Container, Label, StyledTextInput } from "./input-group.styled";

type Props = {
  setValue: (value: string) => void;
  label: string;
  placeholder: string;
  initialValue?: string;
};

const TextInputGroup: FC<Props> = ({
  label,
  placeholder,
  setValue,
  initialValue,
}) => {
  return (
    <Container>
      <Label>{label}:</Label>
      <StyledTextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={initialValue}
      />
    </Container>
  );
};

export default TextInputGroup;
