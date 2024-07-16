import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch, params }) => {
  const seriesId = params.tvshowId;

  const fetchTvshow = (id) => fetchFromAPI(fetch, `tv/${id}`);
  const fetchTvshowExternalIds = (id) =>
    fetchFromAPI(fetch, `tv/${id}/external_ids`);
  const fetchTvshowCredits = (id) =>
    fetchFromAPI(fetch, `tv/${id}/aggregate_credits`);
  const fetchSeasonEpisodes = (seasonNumber) =>
    fetchFromAPI(fetch, `tv/${seriesId}/season/${seasonNumber}`);
  const fetchProviders = (id) =>
    fetchFromAPI(fetch, `tv/${id}/watch/providers`);

  const tvshow = await fetchTvshow(params.tvshowId);
  const externalIds = await fetchTvshowExternalIds(params.tvshowId);
  const tvshowCredits = await fetchTvshowCredits(params.tvshowId);
  const providers = await fetchProviders(params.tvshowId);

  const seasonsWithEpisodes = await Promise.all(
    tvshow.seasons.map(async (season) => {
      const episodes = await fetchSeasonEpisodes(season.season_number);
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
    providers: providers,
  };
};
