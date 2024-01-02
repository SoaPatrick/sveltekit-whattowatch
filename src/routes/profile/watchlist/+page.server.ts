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
    .select('movie_id')
    .eq('profile_id', session.user.id)
    .eq('content_type_id', 1);

  if (error || !watchlist) return { status: 500 };

  // Holen Sie die Informationen für jeden Film in der Watchlist
  const movies = await Promise.all(
    watchlist.map(async ({ movie_id }) => {
        return fetchFromAPI(fetch, `movie/${movie_id}`);
    })
  );

  return {
    props: {
      movies,
    },
  };
}