import {
  GetMachineResponse,
  GetMachinesRequestParams,
  GetMachinesResponse,
  SubmitCreateMachineRequestBody,
} from "./machine-api.types";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getMachines = async (
  requestParams: GetMachinesRequestParams | null,
  accessToken: string
): Promise<GetMachinesResponse> => {
  const url = new URL("/api/machine", baseUrl);
  const searchParams = new URLSearchParams({
    name: requestParams?.name ?? "",
    type: requestParams?.type?.toString() ?? "",
    locationId: requestParams?.locationId?.toString() ?? "",
    subocationId: requestParams?.sublocationId?.toString() ?? "",
  });
  url.search = searchParams.toString();
  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const getMachine = async (
  id: number,
  accessToken: string
): Promise<GetMachineResponse> => {
  const url = new URL(`/api/machine/${id}`, baseUrl);
  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const submitCreateMachine = async (
  machine: SubmitCreateMachineRequestBody,
  accessToken: string
): Promise<GetMachineResponse> => {
  const url = new URL("/api/machine/", baseUrl);
  const response = await fetch(url, {
    body: JSON.stringify(machine),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};
