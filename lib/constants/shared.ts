import {
  Machine,
  MachineEnum,
  Measurement,
  Severity,
  SeverityEnum,
} from "../types/shared";

export const Severities: Severity[] = [
  { type: "Information", value: SeverityEnum.Information },
  { type: "Advarsel", value: SeverityEnum.Warning },
  { type: "Fejl", value: SeverityEnum.Error },
  { type: "Kritisk", value: SeverityEnum.Critical },
];

export const MeasurementTypes: Measurement[] = [
  { type: "Temperatur", value: 0 },
  { type: "Luftfugtighed", value: 1 },
  { type: "Ram", value: 2 },
  { type: "Cpu", value: 3 },
  { type: "Disk", value: 4 },
];

export const MachineType: Machine[] = [
  { type: "Server", value: MachineEnum.Server },
  { type: "ConveyorSystem", value: MachineEnum.ConveyorSystem },
  { type: "ChemicalMixer", value: MachineEnum.ChemicalMixer },
  { type: "Other", value: MachineEnum.Other },
];
