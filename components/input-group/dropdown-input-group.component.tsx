import { Picker } from "@react-native-picker/picker";
import { FC } from "react";
import { Container, Label, StyledPickerContainer } from "./input-group.styled";

type Props = {
  setValue: (value: unknown) => void;
  label: string;
  placeholder: string;
  values: PickerItem[];
  initialValue?: any;
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
  initialValue,
}) => {
  return (
    <Container>
      <Label>{label}:</Label>
      <StyledPickerContainer>
        <Picker
          onValueChange={(value, index) => setValue(value)}
          selectedValue={initialValue}
        >
          <Picker.Item
            key="default"
            label="Vælg en mulighed"
            value={null}
            enabled={true}
            color="grey"
          />
          {values.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </StyledPickerContainer>
    </Container>
  );
};

export default DropdownInputGroup;
