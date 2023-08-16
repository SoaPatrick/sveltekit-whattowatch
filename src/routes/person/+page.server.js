export const load = async () => {
  const fetchPeople = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/person/week?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data.results;
  };

  return {
    movies: fetchPeople(),
  };
};
