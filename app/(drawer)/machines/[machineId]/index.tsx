import FloatingButton from "@/components/buttons/add-button.component";
import MeasurementOverview from "@/components/machine-details/measurement-overview/details-sensor-overview.component";
import DetailsOverview from "@/components/machine-details/overview/details-overview.component";
import { Log } from "@/lib/api/logs/logs-api.types";
import { getMachine } from "@/lib/api/machine/machine-api";
import { Machine as MachineDetails } from "@/lib/api/machine/machine-api.types";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import {
  AlarmHubContext,
  MachineHubContext,
} from "@/lib/hooks/contexts/signalr-client.context";
import { MeasurementData, SeverityEnum } from "@/lib/types/shared";
import { HubConnectionState } from "@microsoft/signalr";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { FC, use, useCallback, useState } from "react";
import { View } from "react-native";

const MachineDetailsPage: FC = () => {
  const { machineId } = useLocalSearchParams();
  const { accessToken } = use(AuthenticationContext);

  const alarmConnection = use(AlarmHubContext);
  const machineConnection = use(MachineHubContext);

  const [machine, setMachine] = useState<MachineDetails>();
  const [severity, setSeverity] = useState<SeverityEnum>();
  const [measurements, setMeasurements] = useState<MeasurementData[]>();

  const initAlarm = useCallback(() => {
    alarmConnection
      ?.invoke("SubscribeToAlarms", [machineId.toString()])
      .then((payload: Log[]) => {
        if (payload?.length) {
          setSeverity(payload[0].severity);
        }
      });

    alarmConnection?.on("updateEvents", (payload) => {
      if (payload?.length) {
        setSeverity(payload[0].severity);
      }
    });
  }, [alarmConnection, machineId]);

  const initMachine = useCallback(() => {
    machineConnection
      ?.invoke("SubscribeToMachine", machineId.toString())
      .then((payload: MeasurementData[]) => {
        if (payload) {
          setMeasurements(payload);
        }
      });

    machineConnection?.on("update", (payload: MeasurementData) => {
      if (payload) {
        setMeasurements((prev) => {
          if (prev)
            return [
              ...prev.filter(
                (x) => x.measurementType !== payload?.measurementType
              ),
              payload,
            ].sort((a, b) => a.measurementType - b.measurementType);
          return payload ? [payload] : [];
        });
      }
    });
  }, [machineConnection, machineId]);

  const callback = useCallback(() => {
    getMachine(Number(machineId), accessToken).then((response) => {
      const [data] = response;

      setMachine(data);
    });

    if (
      ![alarmConnection?.state, machineConnection?.state].every(
        (x) => x === HubConnectionState.Connected
      )
    )
      return;

    initAlarm();
    initMachine();

    return () => {
      alarmConnection?.off("updateEvents");
      machineConnection?.off("update");
    };
  }, [
    accessToken,
    alarmConnection,
    initAlarm,
    initMachine,
    machineConnection,
    machineId,
  ]);

  useFocusEffect(callback);

  return (
    <View style={{ flex: 1 }}>
      <DetailsOverview machine={machine} severity={severity}></DetailsOverview>
      <MeasurementOverview measurements={measurements}></MeasurementOverview>
      <FloatingButton
        icon="alarm"
        backgroundColor="#fff"
        color="#000"
        align="left"
        href={{
          pathname: "/(drawer)/machines/[machineId]/alarm-overview",
          params: { machineId: machineId as string },
        }}
      />
      <FloatingButton
        icon="newspaper"
        href={{
          pathname: "/(drawer)/machines/[machineId]/logs-overview",
          params: { machineId: machineId as string },
        }}
      />
      <FloatingButton
        icon="refresh"
        backgroundColor="#fff"
        color="#000"
        align="right"
        onPress={callback}
      />
    </View>
  );
};

export default MachineDetailsPage;
