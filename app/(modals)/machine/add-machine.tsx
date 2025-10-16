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
      ></TextInputGroup>
      <DropdownInputGroup
        setValue={(value) => {
          console.log("value", value);
          setMachine({ ...machine, locationId: value as number });
          console.log("machine", machine);
        }}
        label={"Lokation"}
        placeholder={"Vælg en lokation"}
        values={locations.map((x) => ({ label: x.name, value: x.id }))}
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
      />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FormButton
          onPress={async () => {
            const [, error] = await submitCreateMachine(machine);

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
