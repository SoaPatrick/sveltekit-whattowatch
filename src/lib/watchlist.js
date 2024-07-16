// src/lib/watchlist.js
export async function isInWatchlist(supabase, userId, mediaId, contentType) {
  let watchlist, error;

  if (contentType === "movie") {
    ({ data: watchlist, error } = await supabase
      .from("watchlist")
      .select("movie_id")
      .eq("profile_id", userId)
      .eq("movie_id", mediaId));
  }

  if (contentType === "tv") {
    ({ data: watchlist, error } = await supabase
      .from("watchlist")
      .select("series_id")
      .eq("profile_id", userId)
      .eq("series_id", mediaId));
  }

  if (error) {
    throw error;
  }

  return watchlist && watchlist.length > 0;
}

export async function addToWatchlist(supabase, userId, mediaId, contentType) {
  let data = {
    profile_id: userId,
    added_date: new Date(),
  };

  if (contentType === "movie") {
    data.movie_id = mediaId;
    data.content_type_id = 1;
  }

  if (contentType === "tv") {
    data.series_id = mediaId;
    data.content_type_id = 2;
  }

  const { error } = await supabase.from("watchlist").insert(data);

  if (error) {
    throw error;
  }
}

export async function removeFromWatchlist(
  supabase,
  userId,
  mediaId,
  contentType
) {
  let error;

  if (contentType === "movie") {
    ({ error } = await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", mediaId)
      .eq("profile_id", userId));
  }

  if (contentType === "tv") {
    ({ error } = await supabase
      .from("watchlist")
      .delete()
      .eq("series_id", mediaId)
      .eq("profile_id", userId));
  }

  if (error) {
    throw error;
  }
}
