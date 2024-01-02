// src/lib/watched.js
export async function isInWatchedList(
  supabase,
  userId,
  mediaId,
  season,
  episode,
  contentType
) {
  let watched, error;

  if (contentType === "movie") {
    ({ data: watched, error } = await supabase
      .from("watched")
      .select("movie_id")
      .eq("profile_id", userId)
      .eq("movie_id", mediaId)
      .eq("content_type_id", 1));
  }

  if (contentType === "tv") {
    ({ data: watched, error } = await supabase
      .from("watched")
      .select("series_id")
      .eq("profile_id", userId)
      .eq("series_id", mediaId)
      .eq("content_type_id", 2));
  }

  if (contentType === "episode") {
    ({ data: watched, error } = await supabase
      .from("watched")
      .select("series_id")
      .eq("profile_id", userId)
      .eq("series_id", mediaId)
      .eq("season_number", season)
      .eq("episode_number", episode)
      .eq("content_type_id", 3));
  }

  if (error) {
    throw error;
  }

  return watched && watched.length > 0;
}

export async function markAsWatched(
  supabase,
  userId,
  mediaId,
  season,
  episode,
  contentType
) {
  let data = {
    profile_id: userId,
    watched_date: new Date(),
  };

  if (contentType === "movie") {
    data.movie_id = mediaId;
    data.content_type_id = 1;
  }

  if (contentType === "tv") {
    data.series_id = mediaId;
    data.content_type_id = 2;
  }

  if (contentType === "episode") {
    data.series_id = mediaId;
    data.season_number = season;
    data.episode_number = episode;
    data.content_type_id = 3;
  }

  const { error } = await supabase.from("watched").insert(data);

  if (error) {
    throw error;
  }
}

export async function markAsUnwatched(
  supabase,
  userId,
  mediaId,
  season,
  episode,
  contentType
) {
  let error;

  if (contentType === "movie") {
    ({ error } = await supabase
      .from("watched")
      .delete()
      .eq("movie_id", mediaId)
      .eq("profile_id", userId));
  }

  if (contentType === "tv") {
    ({ error } = await supabase
      .from("watched")
      .delete()
      .eq("series_id", mediaId)
      .eq("profile_id", userId));
  }

  if (contentType === "episode") {
    ({ error } = await supabase
      .from("watched")
      .delete()
      .eq("series_id", mediaId)
      .eq("season_number", season)
      .eq("episode_number", episode)
      .eq("profile_id", userId));
  }

  if (error) {
    throw error;
  }
}
