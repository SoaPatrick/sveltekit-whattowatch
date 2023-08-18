export const load = ({ fetch, url }) => {
  const searchQuery = url.searchParams.get("query");

  if (!isValidSearchQuery(searchQuery)) {
    return {
      status: 400,
      error: "Invalid search query",
    };
  }

  const fetchSearchResults = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await response.json();

    const sortedResults = data.results.sort(
      (a, b) => b.popularity - a.popularity
    );

    return sortedResults;
  };

  return {
    product: fetchSearchResults(),
  };
};

function isValidSearchQuery(query) {
  if (query.length < 2) {
    return false;
  }

  const validCharacters = /^[a-zA-Z0-9\s\-_',.!?&()]+$/;
  return validCharacters.test(query);
}
