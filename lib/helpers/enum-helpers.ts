import { SeverityEnum } from "../types/shared";

export const severityColor = (
  severity: SeverityEnum = 0,
  defaultColor: string,
  warningColor: string,
  criticalColor: string
) => {
  const color =
    severity > SeverityEnum.Information
      ? severity > SeverityEnum.Warning
        ? criticalColor
        : warningColor
      : defaultColor;
  return color;
};
