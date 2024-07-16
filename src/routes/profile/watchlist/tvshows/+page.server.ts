import { fail, redirect } from '@sveltejs/kit'
import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  // Holen Sie die Watchlist des Benutzers aus der Datenbank
  const { data: watchlist, error } = await supabase
    .from('watchlist')
    .select('series_id')
    .eq('profile_id', session.user.id)
    .eq('content_type_id', 2);

  if (error || !watchlist) return { status: 500 };

  // Holen Sie die gesehenen Episoden des Benutzers aus der Datenbank
  const { data: watchedEpisodes, error: watchedEpisodesError } = await supabase
    .from('watched')
    .select('series_id, season_number, episode_number')
    .eq('profile_id', session.user.id)
    .eq('content_type_id', 3);



  if (watchedEpisodesError || !watchedEpisodes) return { status: 500 };

  // Holen Sie die Informationen für jede Serie in der Watchlist
  const series = await Promise.all(
    watchlist.map(async ({ series_id }) => {
      const seriesData = await fetchFromAPI(fetch, `tv/${series_id}`);

      // Holen Sie die Episodeninformationen für jede Staffel
      const seasons = await Promise.all(
        seriesData.seasons.map(async (season) => {
          const seasonData = await fetchFromAPI(fetch, `tv/${series_id}/season/${season.season_number}`);
          return {
            ...season,
            episodes: seasonData.episodes,
          };
        })
      );

      // Sammeln Sie alle Episoden der Serie in einem Array
      const allEpisodes = seasons.flatMap(season => season.episodes);

      // Finden Sie die erste Episode, die nicht gesehen wurde
      const nextEpisode = allEpisodes.find(
        (episode) => !watchedEpisodes.some(watchedEpisode => 
          watchedEpisode.series_id === series_id && 
          watchedEpisode.season_number === episode.season_number && 
          watchedEpisode.episode_number === episode.episode_number)
      );

      // Teilen Sie die nächste Episode in zwei Gruppen: ausgestrahlt und nicht ausgestrahlt
      const today = new Date();
      const airedNextEpisode = nextEpisode && nextEpisode.air_date && new Date(nextEpisode.air_date) <= today ? nextEpisode : null;
      const unairedNextEpisode = nextEpisode && (!nextEpisode.air_date || new Date(nextEpisode.air_date) > today) ? nextEpisode : null;

      // Fügen Sie die nächste Episode zu den Seriendaten hinzu
      return {
        ...seriesData,
        seasons,
        nextEpisode: {
          aired: airedNextEpisode,
          unaired: unairedNextEpisode,
        },
      };
    })
  );

  let nextEpisodesAired = [];
  let nextEpisodesUnaired = [];

  series.forEach(serie => {
    if (serie.nextEpisode.aired !== null) {
      nextEpisodesAired.push({
        ...serie.nextEpisode.aired,
        show_name: serie.name,
        poster_path: serie.poster_path,
      });
    }
    if (serie.nextEpisode.unaired !== null) {
      nextEpisodesUnaired.push({
        ...serie.nextEpisode.unaired,
        show_name: serie.name,
        poster_path: serie.poster_path,
      });
    }
  });

  nextEpisodesAired.sort((a, b) => {
    if (a.air_date === null) return 1; // Wenn a.air_date null ist, setzen Sie es ans Ende
    if (b.air_date === null) return -1; // Wenn b.air_date null ist, setzen Sie es an den Anfang
    return new Date(a.air_date) - new Date(b.air_date); // Andernfalls sortieren Sie nach air_date
  });

  nextEpisodesUnaired.sort((a, b) => {
    if (a.air_date === null) return 1; // Wenn a.air_date null ist, setzen Sie es ans Ende
    if (b.air_date === null) return -1; // Wenn b.air_date null ist, setzen Sie es an den Anfang
    return new Date(a.air_date) - new Date(b.air_date); // Andernfalls sortieren Sie nach air_date
  });

  return {
    props: {
      nextEpisodesAired, // Geben Sie das `nextEpisodesAired` Array zurück
      nextEpisodesUnaired, // Geben Sie das `nextEpisodesUnaired` Array zurück      
    },
  };
}