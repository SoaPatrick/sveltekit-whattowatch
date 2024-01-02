export const fetchFromAPI = async (fetch: Function, endpoint: string): Promise<any> => {
  const hasQueryParams = endpoint.includes('?');
  const separator = hasQueryParams ? '&' : '?';
  const url = `https://api.themoviedb.org/3/${endpoint}${separator}api_key=${import.meta.env.VITE_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return await response.json();
};