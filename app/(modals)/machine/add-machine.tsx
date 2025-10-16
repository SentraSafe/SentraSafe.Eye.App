import FormButton from "@/components/buttons/form-button.component";
import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { submitCreateMachine } from "@/lib/api/machine/machine-api";
import { CreateMachine } from "@/lib/api/machine/machine-api.types";
import { LocationContext } from "@/lib/hooks/contexts/location-context";
import { router } from "expo-router";
import { FC, use, useMemo, useState } from "react";
import { View } from "react-native";

const AddMachine: FC = () => {
  const { locations } = use(LocationContext);
  const [machine, setMachine] = useState<CreateMachine>({});
  const [submitted, setSubmitted] = useState(false);

  const subLocations = useMemo(() => {
    return (
      locations.find((location) => location.id === machine?.locationId)
        ?.sublocations ?? locations.flatMap((x) => x.sublocations)
    );
  }, [locations, machine?.locationId]);

  return (
    <ModalView>
      <TextInputGroup
        label="Navn"
        placeholder="Navn på maskinen"
        setValue={(value) => setMachine({ ...machine, name: value as string })}
        disabled={submitted}
      ></TextInputGroup>
      <DropdownInputGroup
        setValue={(value) => {
          setMachine({ ...machine, locationId: value as number });
        }}
        label={"Lokation"}
        placeholder={"Vælg en lokation"}
        values={locations.map((x) => ({ label: x.name, value: x.id }))}
        disabled={submitted}
      />
      <DropdownInputGroup
        setValue={(value) =>
          setMachine({ ...machine, sublocationId: value as number })
        }
        label={"Intern lokation"}
        placeholder={"Vælg en intern lokation"}
        values={subLocations.map((subLocation) => ({
          label: subLocation.name,
          value: subLocation.id,
        }))}
        disabled={submitted}
      />
      <DropdownInputGroup
        setValue={(value) =>
          setMachine({ ...machine, machineType: value as number })
        }
        label={"Maskine type"}
        placeholder={"Vælg en maskine type"}
        values={[
          { label: "Server", value: 0 },
          { label: "Other", value: 1 },
        ]}
        disabled={submitted}
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FormButton
          withLoader={true}
          onPress={async () => {
            setSubmitted(true);
            const [, error] = await submitCreateMachine(machine);
            setSubmitted(false);

            if (!error) router.dismiss();
          }}
        >
          Tilføj
        </FormButton>
      </View>
    </ModalView>
  );
};

export default AddMachine;
