import { fetchFromAPI } from "$lib/api";

export const load = ({ fetch, params }) => {
  const fetchTvshow = (id) => fetchFromAPI(fetch, `tv/${id}`);
  const fetchTvshowEpisode = (id, seasonNumber) =>
    fetchFromAPI(fetch, `tv/${id}/season/${seasonNumber}`);

  return {
    tvshow: fetchTvshow(params.tvshowId),
    episodes: fetchTvshowEpisode(params.tvshowId, params.tvshowSeasonNumber),
  };
};
