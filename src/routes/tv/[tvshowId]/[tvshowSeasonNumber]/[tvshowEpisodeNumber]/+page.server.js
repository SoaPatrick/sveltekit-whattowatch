export const load = ({ fetch, params }) => {
  const tvshowId = params.tvshowId;
  const seasonNumber = params.tvshowSeasonNumber;
  const episodeNumber = params.tvshowEpisodeNumber;

  const fetchTvshowEpisode = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvshowId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  return {
    product: fetchTvshowEpisode(),
  };
};
