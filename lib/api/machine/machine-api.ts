import {
  GetMachinesRequestParams,
  Machine,
  SubmitCreateMachineRequestBody,
} from "./machine-api.types";

const baseUrl = "http://10.131.9.151:6971";

export const getMachines = async (
  requestParams?: GetMachinesRequestParams
): Promise<Machine[]> => {
  const url = new URL("/api/machine", baseUrl);
  const searchParams = new URLSearchParams({
    name: requestParams?.name ?? "",
    machineType: requestParams?.machineType?.toString() ?? "",
    location: requestParams?.locationId?.toString() ?? "",
    subLocation: requestParams?.sublocationId?.toString() ?? "",
  });
  url.search = searchParams.toString();
  console.log(url);
  fetch(url, { method: "GET" }).catch((error) => {
    console.log(error);
  });
  const response = await fetch(url, { method: "GET" });
  console.log(response);

  return await response.json();
};

export const getMachine = async (id: number): Promise<Machine> => {
  const url = new URL(`/api/machine/${id}`, baseUrl);
  const response = await fetch(url, { method: "GET" });

  return await response.json();
};

export const submitCreateMachine = async (
  machine: SubmitCreateMachineRequestBody
): Promise<Machine> => {
  console.log(machine);
  const url = new URL("/api/machine/", baseUrl);
  const response = await fetch(url, {
    body: JSON.stringify(machine),
    method: "POST",
  });
  console.log(response);
  console.log(JSON.stringify(machine));

  return await response.json();
};
