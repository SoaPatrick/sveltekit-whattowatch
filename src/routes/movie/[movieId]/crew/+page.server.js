import { fetchFromAPI } from "$lib/api";

export const load = ({ fetch, params }) => {
  const fetchMovie = (id) => fetchFromAPI(fetch, `movie/${id}`);
  const fetchCrew = (id) => fetchFromAPI(fetch, `movie/${id}/credits`);

  return {
    cast: fetchCrew(params.movieId),
    product: fetchMovie(params.movieId),
  };
};
