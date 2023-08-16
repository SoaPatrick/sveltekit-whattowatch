export const load = async ({ fetch, params }) => {
  const seriesId = params.tvshowId;

  const fetchTvshow = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  const fetchTvshowExternalIds = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/external_ids?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  const fetchTvshowCredits = async (id) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  const fetchSeasonEpisodes = async (seriesId, seasonNumber) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data.episodes;
  };

  const tvshow = await fetchTvshow();
  const externalIds = await fetchTvshowExternalIds();
  const tvshowCredits = await fetchTvshowCredits();

  const seasonsWithEpisodes = await Promise.all(
    tvshow.seasons.map(async (season) => {
      const episodes = await fetchSeasonEpisodes(
        seriesId,
        season.season_number
      );
      return {
        ...season,
        episodes,
      };
    })
  );

  return {
    product: {
      ...tvshow,
      seasons: seasonsWithEpisodes,
    },
    credits: tvshowCredits,
    ids: externalIds,
  };
};
