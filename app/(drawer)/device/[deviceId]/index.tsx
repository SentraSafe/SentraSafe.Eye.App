import AddButton from "@/components/buttons/add-button.component";
import DetailsEventList from "@/components/machine-details/event-list/details-event-list.component";
import DetailsOverview from "@/components/machine-details/overview/details-overview.component";
import SensorOverview from "@/components/machine-details/sensor-overview/details-sensor-overview.component";
import { getAlarms } from "@/lib/api/alarm/alarm-api";
import { Alarm } from "@/lib/api/alarm/alarm-api.types";
import { getMachine } from "@/lib/api/machine/machine-api";
import { Machine } from "@/lib/api/machine/machine-api.types";
import { useLocalSearchParams } from "expo-router";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";

const Device: FC = () => {
  const { machineId } = useLocalSearchParams();

  const [machine, setMachine] = useState<Machine>();
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    const getData = async () => {
      const [machineResponse, alarmsResponse] = await Promise.all([
        getMachine(Number(machineId)),
        getAlarms(Number(machineId)),
      ]);

      setMachine(machineResponse);
      setAlarms(alarmsResponse ?? []);
    };
    getData();
  }, [machineId]);

  return (
    <View style={{ flex: 1 }}>
      <DetailsOverview machine={machine}></DetailsOverview>
      <SensorOverview></SensorOverview>
      <DetailsEventList
        machineId={Number(machine?.id)}
        alarms={alarms}
      ></DetailsEventList>
      <AddButton href="/(modals)/alarm/add-alarm" />
    </View>
  );
};

export default Device;
