export const load = ({ fetch, params }) => {
  const seriesId = params.tvshowId;

  const tvshowId = params.tvshowId;
  const seasonNumber = params.tvshowSeasonNumber;

  const fetchTvshow = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  const fetchTvshowEpisode = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvshowId}/season/${seasonNumber}?api_key=${
        import.meta.env.VITE_KEY
      }`
    );
    const data = await res.json();
    return data;
  };

  return {
    tvshow: fetchTvshow(),
    episodes: fetchTvshowEpisode(),
  };
};
