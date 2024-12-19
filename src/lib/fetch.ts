import { toast } from 'react-toastify';

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorResponse = await response.json();

    const errorMessage =
      errorResponse.error?.message || `HTTP error! Status: ${response.status}`;

    toast.error(`Error: ${errorMessage}`);

    throw new Error(errorMessage);
  }

  const data = await response.json();

  return data;
}
