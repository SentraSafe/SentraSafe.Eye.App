import FormButton from "@/components/buttons/form-button.component";
import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { submitCreateAlarm } from "@/lib/api/alarm/alarm-api";
import { CreateAlarm } from "@/lib/api/alarm/alarm-api.types";
import { MeasurementTypes, Severities } from "@/lib/constants/shared";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import { router, useLocalSearchParams } from "expo-router";
import { FC, use, useState } from "react";
import { View } from "react-native";

const AddAlarm: FC = () => {
  const { machineId } = useLocalSearchParams();
  const [alarm, setAlarm] = useState<CreateAlarm>({
    machineId: Number(machineId),
  });
  const [submitted, setSubmitted] = useState(false);
  const { accessToken } = use(AuthenticationContext);

  return (
    <ModalView>
      <TextInputGroup
        label="Titel"
        placeholder="Titel"
        setValue={(value) => setAlarm({ ...alarm, title: value as string })}
        disabled={submitted}
      ></TextInputGroup>
      <TextInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, description: value as string })
        }
        label={"Beskrivelse"}
        placeholder={"Beskrivelse"}
        disabled={submitted}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <DropdownInputGroup
            setValue={(value) =>
              setAlarm({ ...alarm, severity: value as number })
            }
            label={"Alvorlighed"}
            placeholder={"Vælg en alvorlighed"}
            values={Severities.map((x) => ({ label: x.type, value: x.value }))}
            disabled={submitted}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DropdownInputGroup
            setValue={(value) =>
              setAlarm({ ...alarm, valueType: value as number })
            }
            label={"Målings type"}
            placeholder={"Vælg en målings type"}
            values={MeasurementTypes.map((x) => ({
              label: x.type,
              value: x.value,
            }))}
            disabled={submitted}
          />
        </View>
      </View>
      <TextInputGroup
        setValue={(value) =>
          setAlarm({ ...alarm, maximumValue: Number(value) })
        }
        inputMode="numeric"
        label={"Maksimale værdi"}
        placeholder={"Maksimale værdi"}
        disabled={submitted}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FormButton
          withLoader={true}
          onPress={async () => {
            setSubmitted(true);
            const [, error] = await submitCreateAlarm(alarm, accessToken);
            setSubmitted(false);

            if (!error)
              router.dismissTo({
                pathname: "/(drawer)/machines/[machineId]/alarm-overview",
                params: { machineId: machineId as string },
              });
          }}
        >
          Tilføj
        </FormButton>
      </View>
    </ModalView>
  );
};

export default AddAlarm;
