import { ApiResponse } from "../shared-api.types";

export type GetMachineResponse = ApiResponse<Machine, string>;
export type GetMachinesResponse = ApiResponse<Machine[], string>;
export type GetMachinesRequestParams = MachineFilter;
export type SubmitCreateMachineRequestBody = CreateMachine;

export type Machine = {
  id: number;
  name: string;
  type: number;
  location: string;
  sublocation: string;
  status: string;
};

export type MachineFilter = {
  name?: string;
  type?: number;
  locationId?: number;
  sublocationId?: number;
};

export type CreateMachine = {
  name?: string;
  type?: number;
  locationId?: number;
  sublocationId?: number;
};
