export const apiResponse = <T, R>({
  data,
  status,
  message,
  error,
}: {
  status: number;
  data?: T | undefined;
  error?: R | undefined;
  message: string | undefined;
}) => {
  return {
    status: status || 500,
    data: data || undefined,
    error: error || undefined,
    message: message || "",
  };
};
