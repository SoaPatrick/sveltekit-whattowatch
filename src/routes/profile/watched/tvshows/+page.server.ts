import { fail, redirect } from '@sveltejs/kit'
import { fetchFromAPI } from "$lib/api";

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  // Holen Sie die Watched Movies des Benutzers aus der Datenbank
  const { data: watched, error } = await supabase
    .from('watched')
    .select('series_id')
    .eq('profile_id', session.user.id)
    .eq('content_type_id', 3)
    .order('created_at', { ascending: false });

  if (error || !watched) return { status: 500 };

  // Entfernen Sie Duplikate aus der watched Liste
  const uniqueSeriesIds = [...new Set(watched.map(item => item.series_id))];

  const watchedCounts = watched.reduce((counts, item) => {
    if (!counts[item.series_id]) {
      counts[item.series_id] = 0;
    }
    counts[item.series_id]++;
    return counts;
  }, {});

  const series = await Promise.all(
    uniqueSeriesIds.map(async (series_id) => {
      const seriesData = await fetchFromAPI(fetch, `tv/${series_id}`);
      return {
        ...seriesData,
        number_of_episodes_watched: watchedCounts[series_id],
      };
    })
  );
  
  return {
    props: {
      series,
    },
  };
}