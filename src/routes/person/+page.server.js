import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch }) => {
  const fetchPeople = async () => {
    const data = await fetchFromAPI(fetch, "trending/person/week");
    return data.results;
  };

  return {
    people: await fetchPeople(),
  };
};
