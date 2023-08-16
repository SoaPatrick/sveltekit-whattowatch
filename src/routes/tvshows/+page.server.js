export const load = async () => {
  const fetchTvshows = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data.results;
  };

  return {
    movies: fetchTvshows(),
  };
};
