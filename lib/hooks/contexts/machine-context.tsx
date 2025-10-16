import {
  CreateMachine,
  MachineFilter,
} from "@/lib/api/machine/machine-api.types";
import { createContext, FC, ReactNode, useState } from "react";

type CreateMachineStore = {
  machine: CreateMachine;
  setMachine: any;
};

type MachineFilterStore = {
  machineFilter: MachineFilter;
  setMachineFilter: any;
};

const CreateMachineContext = createContext<CreateMachineStore>(
  {} as CreateMachineStore
);

const MachineFilterContext = createContext<MachineFilterStore>(
  {} as MachineFilterStore
);

const CreateMachineProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [machine, setMachine] = useState<CreateMachine>({});

  return (
    <CreateMachineContext value={{ machine, setMachine }}>
      {children}
    </CreateMachineContext>
  );
};

const MachineFilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [machineFilter, setMachineFilter] = useState<MachineFilter>({});

  return (
    <MachineFilterContext value={{ machineFilter, setMachineFilter }}>
      {children}
    </MachineFilterContext>
  );
};

export {
  CreateMachineContext,
  CreateMachineProvider,
  MachineFilterContext,
  MachineFilterProvider,
};
