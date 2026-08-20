import { config } from "@/config";
import { ApiError } from "@/exceptions/api-error";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${config.API_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json();

    throw new ApiError(
      data ?? "API request failed",
      response.status,
      data,
    );
  }

  return response.json();
}
