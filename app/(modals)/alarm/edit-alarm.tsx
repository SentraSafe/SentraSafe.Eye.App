import FormButton from "@/components/buttons/form-button.component";
import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { submitUpdateAlarm } from "@/lib/api/alarm/alarm-api";
import { CreateAlarm } from "@/lib/api/alarm/alarm-api.types";
import { UpdateAlarmContext } from "@/lib/hooks/contexts/alarm-context";
import { router } from "expo-router";
import { FC, use, useState } from "react";
import { View } from "react-native";

const AddAlarm: FC = () => {
  const { alarmToUpdate, setAlarmToUpdate } = use(UpdateAlarmContext);
  const [alarm, setAlarm] = useState<CreateAlarm>({ ...alarmToUpdate });
  const [submitted, setSubmitted] = useState(false);

  return (
    <ModalView>
      <TextInputGroup
        label="Titel"
        placeholder="Titel"
        setValue={(value) => setAlarm({ ...alarm, title: value as string })}
        initialValue={alarmToUpdate?.title}
        disabled={submitted}
      ></TextInputGroup>
      <TextInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, description: value as string })
        }
        label={"Beskrivelse"}
        placeholder={"Beskrivelse"}
        initialValue={alarmToUpdate?.description}
        disabled={submitted}
      />
      <DropdownInputGroup
        setValue={(value) => setAlarm({ ...alarm, severity: value as number })}
        label={"Alvorlighed"}
        placeholder={"Vælg en alvorlighed"}
        values={[{ label: "Kritisk", value: 1 }]}
        initialValue={alarmToUpdate?.severity}
        disabled={submitted}
      />
      <DropdownInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, measurementType: value as number })
        }
        label={"Målings type"}
        placeholder={"Vælg en målings type"}
        values={[{ label: "Temperatur", value: 1 }]}
        initialValue={alarmToUpdate?.measurementType}
        disabled={submitted}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FormButton
          withLoader={true}
          onPress={async () => {
            setSubmitted(true);
            const [, error] = await submitUpdateAlarm(alarm);
            setSubmitted(false);

            if (!error) {
              router.dismiss();
              setAlarmToUpdate(null);
            }
          }}
        >
          Tilføj
        </FormButton>
      </View>
    </ModalView>
  );
};

export default AddAlarm;
