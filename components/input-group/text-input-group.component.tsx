import { FC } from "react";
import { Container, Label, StyledTextInput } from "./input-group.styled";

type Props = {
  setValue: (value: string) => void;
  label: string;
  placeholder: string;
};

const TextInputGroup: FC<Props> = ({ label, placeholder, setValue }) => {
  return (
    <Container>
      <Label>{label}:</Label>
      <StyledTextInput placeholder={placeholder} onChangeText={setValue} />
    </Container>
  );
};

export default TextInputGroup;
