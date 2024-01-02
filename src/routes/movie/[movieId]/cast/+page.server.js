import { fetchFromAPI } from "$lib/api";

export const load = ({ fetch, params }) => {
  const fetchMovie = (id) => fetchFromAPI(fetch, `movie/${id}`);
  const fetchCast = (id) => fetchFromAPI(fetch, `movie/${id}/credits`);

  return {
    cast: fetchCast(params.movieId),
    product: fetchMovie(params.movieId),
  };
};
