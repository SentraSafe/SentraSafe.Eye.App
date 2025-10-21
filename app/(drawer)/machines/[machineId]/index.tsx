import FloatingButton from "@/components/buttons/add-button.component";
import MeasurementOverview from "@/components/machine-details/measurement-overview/details-sensor-overview.component";
import DetailsOverview from "@/components/machine-details/overview/details-overview.component";
import { getMachine } from "@/lib/api/machine/machine-api";
import { Machine as MachineDetails } from "@/lib/api/machine/machine-api.types";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import useSignalR from "@/lib/hooks/signalr-clients/signalr-client-hook";
import { MeasurementData } from "@/lib/types/shared";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { FC, use, useCallback, useState } from "react";
import { View } from "react-native";

const MachineDetailsPage: FC = () => {
  const { machineId } = useLocalSearchParams();
  const { accessToken } = use(AuthenticationContext);

  const [machine, setMachine] = useState<MachineDetails>();
  const [measurements, setMeasurements] = useState<MeasurementData[]>();
  const { subscribe } = useSignalR<MeasurementData[]>("MachineHub");

  const callback = useCallback(() => {
    const init = async () => {
      const [machineResponse, measurementsResponse] = await Promise.all([
        getMachine(Number(machineId), accessToken),
        subscribe(
          "SubscribeToMachine",
          machineId as string,
          "update",
          (payload: MeasurementData) => {
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
        ),
      ]);
      if (measurementsResponse?.length) setMeasurements(measurementsResponse);
      const [machineData] = machineResponse;

      setMachine(machineData);
    };

    init();
  }, [accessToken, machineId, subscribe]);

  useFocusEffect(callback);

  return (
    <View style={{ flex: 1 }}>
      <DetailsOverview machine={machine}></DetailsOverview>
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
