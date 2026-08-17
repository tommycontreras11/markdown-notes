import { config } from "@/config";
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

  if (!response.ok) throw new Error(`Api request failed: ${response.status}`);

  return response.json();
}
