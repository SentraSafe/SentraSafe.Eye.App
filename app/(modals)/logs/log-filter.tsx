import FormButton from "@/components/buttons/form-button.component";
import DatePickerInputGroup from "@/components/input-group/datepicker-input-group.component";
import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { LogFilter } from "@/lib/api/logs/logs-api.types";
import { Severities } from "@/lib/constants/shared";
import { LogFilterContext } from "@/lib/hooks/contexts/notification-context";
import { router } from "expo-router";
import { FC, use, useState } from "react";
import { ScrollView, View } from "react-native";

const AddAlarm: FC = () => {
  const { logFilter, setLogFilter } = use(LogFilterContext);
  const [filter, setFilter] = useState<LogFilter>({ ...logFilter });

  return (
    <ModalView>
      <ScrollView persistentScrollbar={true}>
        <DropdownInputGroup
          setValue={(value) =>
            setFilter({ ...filter, severity: value as number })
          }
          label={"Alvorlighed"}
          placeholder={"Vælg en alvorlighed"}
          values={Severities.map((x) => ({ label: x.type, value: x.value }))}
          initialValue={logFilter?.severity}
        />

        <DatePickerInputGroup
          label="Tidsstempel fra"
          placeholder="Vælg et tidspunkt"
          initialValue={logFilter.timeStampFrom}
          setValue={(date) => setFilter({ ...filter, timeStampFrom: date })}
        />
        <DatePickerInputGroup
          label="Tidsstempel til"
          placeholder="Vælg et tidspunkt"
          initialValue={logFilter.timeStampTo}
          setValue={(date) => setFilter({ ...filter, timeStampTo: date })}
        />

        <DatePickerInputGroup
          label="Tidsstempel fra"
          placeholder="Vælg et tidspunkt"
          initialValue={logFilter.handledFrom}
          setValue={(date) => setFilter({ ...filter, handledFrom: date })}
        />

        <DatePickerInputGroup
          label="Tidsstempel til"
          placeholder="Vælg et tidspunkt"
          initialValue={logFilter.handledTo}
          setValue={(date) => setFilter({ ...filter, handledTo: date })}
        />

        <DropdownInputGroup
          setValue={(value) => setFilter({ ...filter, isHandled: !!value })}
          label={"Håndteret"}
          placeholder={"Vælg en mulighed"}
          values={[
            { label: "Ja", value: true },
            { label: "Nej", value: false },
          ]}
          initialValue={logFilter?.handledBy}
        />

        <TextInputGroup
          setValue={(value) =>
            setFilter({ ...filter, handledBy: value as string })
          }
          label={"Håndteret af"}
          placeholder={"Håndteret af"}
          initialValue={logFilter?.handledBy}
        />
      </ScrollView>

      <View
        style={{
          alignItems: "center",
          paddingVertical: 20,
          borderTopColor: "#bdbdbdff",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <FormButton
          backgroundColor="#fff"
          color="#000"
          withLoader={true}
          onPress={() => {
            setLogFilter(null);
          }}
        >
          Ryd
        </FormButton>
        <FormButton
          withLoader={true}
          onPress={() => {
            setLogFilter(filter);
            router.dismiss();
          }}
        >
          Søg
        </FormButton>
      </View>
    </ModalView>
  );
};

export default AddAlarm;
