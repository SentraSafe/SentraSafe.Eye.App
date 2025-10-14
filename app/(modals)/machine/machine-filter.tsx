import DropdownInputGroup from "@/components/input-group/dropdown-input-group.component";
import TextInputGroup from "@/components/input-group/text-input-group.component";
import { ModalView } from "@/components/modal/modal.styled";
import { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";

const MachineFilter: FC = () => {
  const [nameValue, setNameValue] = useState<string | null>(null);
  const [locationValue, setLocationValue] = useState<string | null>(null);
  const [subLocationValue, setSubLocationValue] = useState<string | null>(null);
  const [machineTypeValue, setMachineTypeValue] = useState<string | null>(null);

  return (
    <ModalView>
      <TextInputGroup
        label="Navn"
        placeholder="Navn på maskinen"
        setValue={setNameValue}
      ></TextInputGroup>
      <DropdownInputGroup
        setValue={setLocationValue}
        label={"Lokation"}
        placeholder={"Vælg en lokation"}
        values={[{ label: "Aarhus", value: 1 }]}
      />
      <DropdownInputGroup
        setValue={setLocationValue}
        label={"Intern lokation"}
        placeholder={"Vælg en intern lokation"}
        values={[{ label: "Aarhus", value: 1 }]}
      />
      <DropdownInputGroup
        setValue={setLocationValue}
        label={"Maskine type"}
        placeholder={"Vælg en maskine type"}
        values={[{ label: "Aarhus", value: 1 }]}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Pressable
          style={{
            borderRadius: 10,
            backgroundColor: "#000",
            paddingHorizontal: 20,
            alignItems: "center",
            paddingVertical: 10,
            width: "30%",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Søg</Text>
        </Pressable>
      </View>
    </ModalView>
  );
};
export default MachineFilter;
