export type GetAlarmResponse = Alarm;
export type CreateAlarmRequestBody = CreateAlarm;

export type Alarm = {
  id: number;
  title: string;
  description: string;
  severity: number;
  measurementType: number;
  maximumValue: number;
};

export type CreateAlarm = {
  title?: string;
  description?: string;
  severity?: number;
  measurementType?: number;
  maximumValue?: number;
};
