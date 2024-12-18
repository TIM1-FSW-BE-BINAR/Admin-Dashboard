export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
