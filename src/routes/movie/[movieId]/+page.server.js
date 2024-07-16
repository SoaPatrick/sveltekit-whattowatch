import { fetchFromAPI } from "$lib/api";
import { fail } from "@sveltejs/kit";

export const load = async ({
  fetch,
  params,
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  const fetchMovie = (id) => fetchFromAPI(fetch, `movie/${id}`);
  const fetchCast = (id) => fetchFromAPI(fetch, `movie/${id}/credits`);
  const fetchReleaseDates = (id) =>
    fetchFromAPI(fetch, `movie/${id}/release_dates`);
  const fetchProviders = (id) =>
    fetchFromAPI(fetch, `movie/${id}/watch/providers`);

  let inWatchlist = false;
  if (session) {
    const { data: watchlist, error } = await supabase
      .from("watchlist")
      .select("movie_id")
      .eq("profile_id", session.user.id)
      .eq("movie_id", params.movieId);
    if (watchlist && watchlist.length > 0) {
      inWatchlist = true;
    }
  }
  return {
    product: fetchMovie(params.movieId),
    cast: fetchCast(params.movieId),
    providers: fetchProviders(params.movieId),
    releaseDates: fetchReleaseDates(params.movieId),
    inWatchlist: inWatchlist,
  };
};

export const actions = {
  // ... Ihre vorhandenen Aktionen ...

  add: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const movieId = formData.get("movie_id");

    const session = await getSession();

    const { error } = await supabase.from("watchlist").insert({
      profile_id: session?.user.id,
      movie_id: movieId,
      added_date: new Date(),
      content_type_id: 1,
      // Setzen Sie hier weitere benötigte Felder
    });

    if (error) {
      return fail(500, {
        movieId,
      });
    }

    return {
      movieId,
    };
  },

  remove: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const movieId = formData.get("movie_id");

    const session = await getSession();

    const { error } = await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", movieId)
      .eq("profile_id", session?.user.id);

    if (error) {
      return fail(500, {
        movieId,
      });
    }

    return {
      movieId,
    };
  },
};
