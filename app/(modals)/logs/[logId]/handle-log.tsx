import FormButton from "@/components/buttons/form-button.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { submitHandleLog } from "@/lib/api/logs/logs-api";
import { HandledLog } from "@/lib/api/logs/logs-api.types";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import { HandleAlarmContext } from "@/lib/hooks/contexts/alarm-context";
import { router } from "expo-router";
import { FC, use, useState } from "react";
import { View } from "react-native";

const HandleAlarmModal: FC = () => {
  const { logToHandle, setLogToHandle } = use(HandleAlarmContext);
  const { accessToken } = use(AuthenticationContext);

  const [handle, setHandle] = useState<HandledLog>({
    id: logToHandle?.id,
  } as HandledLog);
  const [submitted, setSubmitted] = useState(false);

  return (
    <ModalView>
      <TextInputGroup
        label="Håndteret af"
        placeholder="Håndteret af"
        setValue={(value) =>
          setHandle({ ...handle, handledBy: value as string })
        }
        initialValue={handle.handledBy}
        disabled={false}
      ></TextInputGroup>
      <TextInputGroup
        setValue={(value) =>
          setHandle({ ...handle, HandledFeedback: value as string })
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
            const [, error] = await submitHandleLog(handle, accessToken);
            setSubmitted(false);

            if (!error) {
              router.dismiss();
              setLogToHandle(null);
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
