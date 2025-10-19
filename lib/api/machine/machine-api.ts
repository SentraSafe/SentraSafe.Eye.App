import {
  GetMachineResponse,
  GetMachinesRequestParams,
  GetMachinesResponse,
  SubmitCreateMachineRequestBody,
} from "./machine-api.types";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getMachines = async (
  requestParams?: GetMachinesRequestParams
): Promise<GetMachinesResponse> => {
  const url = new URL("/api/machine", baseUrl);
  const searchParams = new URLSearchParams({
    name: requestParams?.name ?? "",
    machineType: requestParams?.machineType?.toString() ?? "",
    location: requestParams?.locationId?.toString() ?? "",
    subLocation: requestParams?.sublocationId?.toString() ?? "",
  });
  url.search = searchParams.toString();
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const getMachine = async (id: number): Promise<GetMachineResponse> => {
  const url = new URL(`/api/machine/${id}`, baseUrl);
  const response = await fetch(url, { method: "GET" });

  console.log(response);

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const submitCreateMachine = async (
  machine: SubmitCreateMachineRequestBody
): Promise<GetMachineResponse> => {
  const url = new URL("/api/machine/", baseUrl);
  const response = await fetch(url, {
    body: JSON.stringify(machine),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};
