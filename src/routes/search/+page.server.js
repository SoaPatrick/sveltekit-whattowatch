import { fetchFromAPI } from "$lib/api";

export const load = ({ fetch, url }) => {
  const searchQuery = url.searchParams.get("query");

  if (searchQuery != null) {
    if (!isValidSearchQuery(searchQuery)) {
      return {
        status: 400,
        error: "Invalid search query",
      };
    }

    const fetchMovies = async () => {
      const endpoint = `search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

      const data = await fetchFromAPI(fetch, endpoint);
      const sortedResults = data.results.sort(
        (a, b) => b.popularity - a.popularity
      );

      return sortedResults;
    };

    return {
      product: fetchMovies(),
    };
  } else {
    return {
      product: [],
    };
  }
};

function isValidSearchQuery(query) {
  if (query.length < 2) {
    return false;
  }

  const validCharacters = /^[a-zA-Z0-9\s\-_',.!?&()]+$/;
  return validCharacters.test(query);
}
