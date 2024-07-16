import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch }) => {
  const fetchMovieProviders = async () => {
    const data = await fetchFromAPI(fetch, "watch/providers/movie");
    return data.results;
  };

  const fetchTvProviders = async () => {
    const data = await fetchFromAPI(fetch, "watch/providers/tv");
    return data.results;
  };

  return {
    movieProviders: await fetchMovieProviders(),
    tvProviders: await fetchTvProviders(),
  };
};
