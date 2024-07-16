import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch }) => {
  const fetchTvshows = async () => {
    const data = await fetchFromAPI(fetch, "trending/tv/week");
    return data.results;
  };

  return {
    shows: await fetchTvshows(),
  };
};
