import { Measurement, Severity, SeverityEnum } from "../types/shared";

export const Severities: Severity[] = [
  { type: "Information", value: SeverityEnum.Information },
  { type: "Advarsel", value: SeverityEnum.Warning },
  { type: "Fejl", value: SeverityEnum.Error },
  { type: "Kritisk", value: SeverityEnum.Critical },
];

export const MeasurementTypes: Measurement[] = [
  { type: "Temperatur", value: 0 },
  { type: "Luftfugtighed", value: 1 },
];
