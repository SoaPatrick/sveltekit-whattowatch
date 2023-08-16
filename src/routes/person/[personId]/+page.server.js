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

  let sortArray;
  if (personData.known_for_department === "Acting") {
    sortArray = combinedCredits.cast;
  } else {
    sortArray = combinedCredits.crew.filter(
      (credit) => credit.department === personData.known_for_department
    );
  }

  let filteredCredits;
  if (personData.known_for_department === "Acting") {
    filteredCredits = sortArray.filter(
      (item) =>
        (item.media_type === "tv" || item.media_type === "movie") &&
        ((item.media_type === "tv" &&
          item.episode_count > 20 &&
          item.character !== null) ||
          (item.media_type === "movie" &&
            item.character !== null &&
            item.order < 5))
    );
  } else {
    filteredCredits = sortArray;
  }

  // Zweite Liste erstellen: Sortieren nach 'popularity' absteigend
  const sortedCreditsByVote = filteredCredits
    .filter((item) => item.vote_count > 100)
    .sort((a, b) => {
      // Kombinierte Wertungsfunktion: vote_count * vote_average * popularity
      const weightVoteCount = 0.4;
      const weightVoteAverage = 0.3;
      const weightPopularity = 0.3;

      const scoreA =
        weightVoteCount * a.vote_count +
        weightVoteAverage * a.vote_average +
        weightPopularity * a.popularity;

      const scoreB =
        weightVoteCount * b.vote_count +
        weightVoteAverage * b.vote_average +
        weightPopularity * b.popularity;

      return scoreB - scoreA; // Absteigend sortieren
    })
    .slice(0, 8); // Die ersten 8 Einträge auswählen

  const uniqueIds = new Set();
  // Array filtern, um Duplikate zu entfernen
  const uniqueSortedCredits = sortedCreditsByVote.filter((item) => {
    if (uniqueIds.has(item.id)) {
      return false; // Bereits gesehene ID, überspringen
    }
    uniqueIds.add(item.id); // Neue ID zum Set hinzufügen
    return true; // Eindeutige ID, im Array behalten
  });

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
    sortedCreditsByVote: uniqueSortedCredits,
  };
};
