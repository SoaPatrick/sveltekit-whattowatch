export const load = async ({ fetch, params }) => {
  const fetchPerson = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  const fetchMovieCredits = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();

    const combinedCredits = [...data.cast, ...data.crew];
    const sortedCredits = combinedCredits.sort((a, b) => {
      if (a.release_date && b.release_date) {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (a.release_date) {
        return -1;
      } else if (b.release_date) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedCredits;
  };

  const fetchTVCredits = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();

    const combinedCredits = [...data.cast, ...data.crew];
    const sortedCredits = combinedCredits.sort((a, b) => {
      if (a.first_air_date && b.first_air_date) {
        return new Date(b.first_air_date) - new Date(a.first_air_date);
      } else if (a.first_air_date) {
        return -1;
      } else if (b.first_air_date) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedCredits;
  };

  const personData = await fetchPerson(params.personId);
  const sortedMovieCredits = await fetchMovieCredits(params.personId);
  const sortedTVCredits = await fetchTVCredits(params.personId);

  return {
    product: personData,
    movieCredits: sortedMovieCredits,
    tvCredits: sortedTVCredits,
  };
};
