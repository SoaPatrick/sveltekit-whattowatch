import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch, params }) => {
  const fetchPerson = (id) => fetchFromAPI(fetch, `person/${id}`);
  const fetchCombinedCredits = (id) =>
    fetchFromAPI(fetch, `person/${id}/combined_credits`);

  const personData = await fetchPerson(params.personId);
  const combinedCredits = await fetchCombinedCredits(params.personId);

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
