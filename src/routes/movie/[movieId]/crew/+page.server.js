export const load = ({ fetch, params }) => {
  const fetchMovie = async (id) => {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const movbieData = await movieRes.json();
    return movbieData;
  };

  const fetchCrew = async (id) => {
    const castRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const castData = await castRes.json();
    return castData;
  };

  return {
    cast: fetchCrew(params.movieId),
    product: fetchMovie(params.movieId),
  };
};
