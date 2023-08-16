export const load = async () => {
  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data.results;
  };

  return {
    movies: fetchMovies(),
  };
};
