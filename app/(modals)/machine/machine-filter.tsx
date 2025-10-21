import FormButton from "@/components/buttons/form-button.component";
import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { MachineFilter } from "@/lib/api/machine/machine-api.types";
import { LocationContext } from "@/lib/hooks/contexts/location-context";
import { MachineFilterContext } from "@/lib/hooks/contexts/machine-context";
import { router } from "expo-router";
import { FC, use, useMemo, useState } from "react";
import { View } from "react-native";

const MachineFilterModal: FC = () => {
  const { machineFilter, setMachineFilter } = use(MachineFilterContext);
  const { locations } = use(LocationContext);

  const [filter, setFilter] = useState<MachineFilter>({ ...machineFilter });

  const subLocations = useMemo(() => {
    return (
      locations.find((location) => location.id === filter.locationId)
        ?.sublocations ?? locations.flatMap((x) => x.sublocations)
    );
  }, [filter.locationId, locations]);

  return (
    <ModalView>
      <TextInputGroup
        label="Navn"
        placeholder="Navn på maskinen"
        setValue={(value) => setFilter({ ...filter, name: value as string })}
        initialValue={filter.name}
      ></TextInputGroup>
      <DropdownInputGroup
        setValue={(value) =>
          setFilter({ ...filter, locationId: value as number })
        }
        label={"Lokation"}
        placeholder={"Vælg en lokation"}
        values={locations.map((location) => ({
          label: location.name,
          value: location.id,
        }))}
        initialValue={machineFilter.locationId}
      />
      <DropdownInputGroup
        setValue={(value) =>
          setFilter({ ...filter, sublocationId: value as number })
        }
        label={"Intern lokation"}
        placeholder={"Vælg en intern lokation"}
        values={subLocations.map((subLocation) => ({
          label: subLocation.name,
          value: subLocation.id,
        }))}
        initialValue={machineFilter.sublocationId}
      />
      <DropdownInputGroup
        setValue={(value) =>
          setFilter({ ...filter, type: value as number })
        }
        label={"Maskine type"}
        placeholder={"Vælg en maskine type"}
        values={[
          { label: "Server", value: 0 },
          { label: "Other", value: 1 },
        ]}
        initialValue={machineFilter.type}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <FormButton
          onPress={() => {
            setMachineFilter(filter);
            router.dismiss();
          }}
        >
          Søg
        </FormButton>
      </View>
    </ModalView>
  );
};
export default MachineFilterModal;
