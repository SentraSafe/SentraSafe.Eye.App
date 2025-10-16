import FormButton from "@/components/buttons/form-button.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { submitHandleAlarm } from "@/lib/api/alarm/alarm-api";
import { HandleAlarm } from "@/lib/api/alarm/alarm-api.types";
import { HandleAlarmContext } from "@/lib/hooks/contexts/alarm-context";
import { router } from "expo-router";
import { FC, use, useState } from "react";
import { View } from "react-native";

const HandleAlarmModal: FC = () => {
  const { alarmToHandle, setAlarmToHandle } = use(HandleAlarmContext);
  const [alarm, setAlarm] = useState<HandleAlarm>({
    id: alarmToHandle?.id,
    handledBy: alarmToHandle?.handledBy,
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <ModalView>
      <TextInputGroup
        label="Håndteret af"
        initialValue={alarm.handledBy}
        disabled={true}
      ></TextInputGroup>
      <TextInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, description: value as string })
        }
        label={"Beskrivelse"}
        placeholder={"Beskrivelse af problem og løsning"}
        disabled={submitted}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FormButton
          withLoader={true}
          onPress={async () => {
            setSubmitted(true);
            const [, error] = await submitHandleAlarm(alarm);
            setSubmitted(false);

            if (!error) {
              router.dismiss();
              setAlarmToHandle(null);
            }
          }}
        >
          Håndter
        </FormButton>
      </View>
    </ModalView>
  );
};

export default HandleAlarmModal;
