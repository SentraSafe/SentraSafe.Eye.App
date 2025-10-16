export type ApiResponse<TContent, TError> = [
  TContent | undefined,
  TError | undefined
];
