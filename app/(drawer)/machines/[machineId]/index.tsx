import AddButton from "@/components/buttons/add-button.component";
import DetailsEventList from "@/components/machine-details/event-list/details-alarm-list.component";
import MeasurementOverview from "@/components/machine-details/measurement-overview/details-sensor-overview.component";
import DetailsOverview from "@/components/machine-details/overview/details-overview.component";
import { getAlarms } from "@/lib/api/alarm/alarm-api";
import { Alarm } from "@/lib/api/alarm/alarm-api.types";
import { getMachine } from "@/lib/api/machine/machine-api";
import { Machine as MachineDetails } from "@/lib/api/machine/machine-api.types";
import useSignalR from "@/lib/hooks/signalr-clients/signalr-client-hook";
import { Measurement } from "@/lib/types/shared";
import { useLocalSearchParams } from "expo-router";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";

const MachineDetails: FC = () => {
  const { machineId } = useLocalSearchParams();

  const [machine, setMachine] = useState<MachineDetails>();
  const [alarms, setAlarms] = useState<Alarm[]>();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const { subscribe, unsubscribe } = useSignalR("MqttHub");

  useEffect(() => {
    subscribe(machineId as string, "update", (payload) => {
      console.log(payload);
      setMeasurements(payload);
    });

    return () => {
      unsubscribe(machineId as string, "update");
    };
  }, [machineId, subscribe, unsubscribe]);

  useEffect(() => {
    const getData = async () => {
      const [machineResponse, alarmsResponse] = await Promise.all([
        getMachine(Number(machineId)),
        getAlarms(Number(machineId)),
      ]);

      const [machineData] = machineResponse;
      const [alarmData] = alarmsResponse;

      setMachine(machineData);
      setAlarms(alarmData);
    };
    getData();
  }, [machineId]);

  return (
    <View style={{ flex: 1 }}>
      <DetailsOverview machine={machine}></DetailsOverview>
      <MeasurementOverview measurements={measurements}></MeasurementOverview>
      <DetailsEventList
        machineId={Number(machine?.id)}
        alarms={alarms ?? []}
      ></DetailsEventList>
      <AddButton href="/(modals)/alarm/add-alarm" />
    </View>
  );
};

export default MachineDetails;
