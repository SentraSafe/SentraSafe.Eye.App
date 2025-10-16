export type GetMachineResponse = Machine;
export type GetMachinesRequestParams = MachineFilter;
export type SubmitCreateMachineRequestBody = CreateMachine;

export type Machine = {
  id: number;
  name: string;
  machineType: number;
  location: string;
  sublocation: string;
};

export type MachineFilter = {
  name?: string;
  machineType?: number;
  locationId?: number;
  sublocationId?: number;
};

export type CreateMachine = {
  name?: string;
  machineType?: number;
  locationId?: number;
  sublocationId?: number;
};
