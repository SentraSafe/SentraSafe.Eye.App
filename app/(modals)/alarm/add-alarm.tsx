import FormButton from "@/components/buttons/form-button.component";
import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { submitCreateAlarm } from "@/lib/api/alarm/alarm-api";
import { CreateAlarm } from "@/lib/api/alarm/alarm-api.types";
import { FC, useState } from "react";
import { View } from "react-native";

const AddAlarm: FC = () => {
  const [alarm, setAlarm] = useState<CreateAlarm>({});

  return (
    <ModalView>
      <TextInputGroup
        label="Titel"
        placeholder="Titel"
        setValue={(value) => setAlarm({ ...alarm, title: value as string })}
      ></TextInputGroup>
      <TextInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, description: value as string })
        }
        label={"Beskrivelse"}
        placeholder={"Beskrivelse"}
      />
      <DropdownInputGroup
        setValue={(value) => setAlarm({ ...alarm, severity: value as number })}
        label={"Alvorlighed"}
        placeholder={"Vælg en alvorlighed"}
        values={[{ label: "Kritisk", value: 1 }]}
      />
      <DropdownInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, measurementType: value as number })
        }
        label={"Målings type"}
        placeholder={"Vælg en målings type"}
        values={[{ label: "Temperatur", value: 1 }]}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FormButton onPress={() => submitCreateAlarm(alarm)}>Tilføj</FormButton>
      </View>
    </ModalView>
  );
};

export default AddAlarm;
