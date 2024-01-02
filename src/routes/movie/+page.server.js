import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch }) => {
  const fetchMovies = async () => {
    const data = await fetchFromAPI(fetch, "trending/movie/week");
    return data.results;
  };

  return {
    movies: fetchMovies(),
  };
};
