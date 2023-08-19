export const load = async ({ fetch, params }) => {
  const fetchPerson = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${params.personId}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  const fetchCombinedCredits = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${
        params.personId
      }/combined_credits?api_key=${import.meta.env.VITE_KEY}`
    );
    const data = await res.json();
    return data;
  };

  const personData = await fetchPerson();
  const combinedCredits = await fetchCombinedCredits();

  const sortedCombinedCreditsCast = combinedCredits.cast.sort((a, b) => {
    const dateA = a.release_date || a.first_air_date;
    const dateB = b.release_date || b.first_air_date;
    if (dateA && dateB) {
      return new Date(dateB) - new Date(dateA);
    } else if (dateA) {
      return 1;
    } else if (dateB) {
      return -1;
    } else {
      return 0;
    }
  });

  const sortedCombinedCreditsCrew = combinedCredits.crew.sort((a, b) => {
    const dateA = a.release_date || a.first_air_date;
    const dateB = b.release_date || b.first_air_date;
    if (dateA && dateB) {
      return new Date(dateB) - new Date(dateA);
    } else if (dateA) {
      return 1;
    } else if (dateB) {
      return -1;
    } else {
      return 0;
    }
  });

  return {
    product: personData,
    combinedCreditsCrew: sortedCombinedCreditsCrew,
    combinedCreditsCast: sortedCombinedCreditsCast,
  };
};
