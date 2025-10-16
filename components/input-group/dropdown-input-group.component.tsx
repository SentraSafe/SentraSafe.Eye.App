import { Picker } from "@react-native-picker/picker";
import { FC } from "react";
import { Container, Label, StyledPickerContainer } from "./input-group.styled";

type Props = {
  setValue: (value: unknown) => void;
  label: string;
  placeholder: string;
  values: PickerItem[];
};

type PickerItem = {
  label: string;
  value: any;
};

const DropdownInputGroup: FC<Props> = ({
  label,
  placeholder,
  setValue,
  values,
}) => {
  return (
    <Container>
      <Label>{label}:</Label>
      <StyledPickerContainer>
        <Picker onValueChange={(value, index) => setValue(value)}>
          <Picker.Item key="default" label="" value={-1} />
          {values.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </StyledPickerContainer>
    </Container>
  );
};

export default DropdownInputGroup;
