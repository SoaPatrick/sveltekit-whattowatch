import { fetchFromAPI } from "$lib/api";

export const load = ({ fetch, params }) => {
  const seasonNumber = params.tvshowSeasonNumber;
  const episodeNumber = params.tvshowEpisodeNumber;

  const fetchTvshowEpisode = (id) =>
    fetchFromAPI(
      fetch,
      `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`
    );
  const fetchSeasonEpisodes = (id) =>
    fetchFromAPI(fetch, `/tv/${id}/season/${seasonNumber}`);

  return {
    product: fetchTvshowEpisode(params.tvshowId),
    episodes: fetchSeasonEpisodes(params.tvshowId),
    seasonId: params.tvshowId,
  };
};
