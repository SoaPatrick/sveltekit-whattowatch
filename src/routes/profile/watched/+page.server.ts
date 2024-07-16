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
    .select('movie_id')
    .eq('profile_id', session.user.id)
    .eq('content_type_id', 1)
    .order('created_at', { ascending: false });

  if (error || !watched) return { status: 500 };

  // Holen Sie die Informationen für jeden Film in der Watched Liste
  const movies = await Promise.all(
    watched.map(async ({ movie_id }) => {
        return fetchFromAPI(fetch, `movie/${movie_id}`);
    })
  );

  return {
    props: {
      movies,
    },
  };
}