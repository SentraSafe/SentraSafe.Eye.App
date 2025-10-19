import { Ionicons } from "@expo/vector-icons";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FC, useState } from "react";
import { Text } from "react-native";
import {
  Container,
  Label,
  StyledDatePickerContainer,
} from "./input-group.styled";

type Props = {
  initialValue?: Date;
  setValue: (value: any) => void;
  label?: string;
  placeholder: string;
};

const DatePickerInputGroup: FC<Props> = ({
  label,
  placeholder,
  setValue,
  initialValue,
}) => {
  const [date, setDate] = useState<Date>();

  const openDatepicker = (
    onChange: (event: DateTimePickerEvent, date?: Date) => void
  ) =>
    DateTimePickerAndroid.open({
      value: initialValue ?? new Date(),
      is24Hour: true,
      onChange: onChange,
      mode: "date",
    });

  const openTimepicker = (
    date: Date,
    onChange: (event: DateTimePickerEvent, date?: Date) => void
  ) =>
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      is24Hour: true,
      onChange: onChange,
      mode: "time",
    });

  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <StyledDatePickerContainer
        onPress={() =>
          openDatepicker(({ type, nativeEvent }, date) => {
            if (type === "set" && date) {
              setDate(date);
              setValue(date);
              openTimepicker(date, ({ type, nativeEvent }, date) => {
                if (type === "set" && date) {
                  setDate(date);
                  setValue(date);
                }
              });
            }
          })
        }
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {date?.toLocaleString() ??
            initialValue?.toLocaleString() ??
            placeholder}
        </Text>
        <Ionicons
          size={20}
          style={{ alignSelf: "center" }}
          name="calendar"
        ></Ionicons>
      </StyledDatePickerContainer>
    </Container>
  );
};

export default DatePickerInputGroup;
