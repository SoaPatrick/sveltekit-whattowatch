<script>
  import {
    formatEpisodeNumber,
    formatSeasonNumber,
    getInitials,
  } from "$lib/helpers";
  export let data;

  const product = data.product;
  const cast = data.credits;
  const ids = data.ids;

  const nextEpisode = product.next_episode_to_air;
  const seasons = product.seasons;
  console.log(seasons);

  function isDateBeforeToday(dateString) {
    const today = new Date();
    const dateToCompare = new Date(dateString);

    // Setze die Zeit auf Mitternacht, um nur das Datum zu vergleichen
    today.setHours(0, 0, 0, 0);
    dateToCompare.setHours(0, 0, 0, 0);

    return dateToCompare < today;
  }
</script>

<h1>{product.name}</h1>
<h2>{product.tagline}</h2>
{#if product.poster_path != null}
  <img
    src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{product.poster_path}"
    alt={product.original_name}
    loading="lazy"
    height="450"
    width="300"
  />
{:else}
  <img
    src="https://placehold.co/300x450?text={product.original_name}"
    alt={product.original_name}
    loading="lazy"
    height="450"
    width="300"
  />
{/if}
<div>{product.episode_run_time} Min.</div>
<p>
  <a href="https://www.imdb.com/title/{ids.imdb_id}" target="_blank">IMDB</a>
</p>
<p>{product.overview}</p>

<div class="grid">
  <div class="cast-row">
    <h2>Cast ({cast.cast.length})</h2>
    <ul class="cast-list">
      {#each cast.cast as person}
        <li class="cast">
          {#if person.profile_path}
            <img
              src="https://www.themoviedb.org/t/p/w132_and_h132_face{person.profile_path}"
              alt={person.name}
              class="avatar"
              loading="lazy"
              height="132"
              width="132"
            />
          {:else}
            <img
              src="https://placehold.co/132x132?text={getInitials(person.name)}"
              alt={person.name}
              class="avatar"
              loading="lazy"
              height="132"
              width="132"
            />
          {/if}
          <div class="details">
            <a href="/person/{person.id}">{person.name}</a><br
            />{person.character}
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <div class="crew-row">
    <h2>Crew ({cast.crew.length})</h2>
    <ul class="cast-list">
      {#each cast.crew as person}
        <li class="cast">
          {#if person.profile_path}
            <img
              src="https://www.themoviedb.org/t/p/w132_and_h132_face{person.profile_path}"
              alt={person.name}
              class="avatar"
              loading="lazy"
              height="132"
              width="132"
            />
          {:else}
            <img
              src="https://placehold.co/132x132?text={getInitials(person.name)}"
              alt={person.name}
              class="avatar"
              loading="lazy"
              height="132"
              width="132"
            />
          {/if}
          <div class="details">
            <a href="/person/{person.id}">{person.name}</a><br />{person.job}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<div>
  {#if nextEpisode != null}
    <h3>Next Episode</h3>
    <h4>{nextEpisode.name}</h4>
    <img
      src="https://www.themoviedb.org/t/p/w227_and_h127_bestv2{nextEpisode.still_path}"
      alt={nextEpisode.name}
      loading="lazy"
      height="127"
      width="227"
    />
    <ul>
      <li>{nextEpisode.air_date}</li>
      <li>
        {formatSeasonNumber(nextEpisode.season_number)}{formatEpisodeNumber(
          nextEpisode.episode_number
        )}
      </li>
      <li>{nextEpisode.runtime} Min.</li>
    </ul>
  {/if}

  {#if seasons != null}
    <h3>Seasons</h3>
    {#each seasons as season}
      <div>
        <h4>{season.name}</h4>
        <ul>
          {#each season.episodes as episode}
            <li>
              <a
                href="/tv/{product.id}/{season.season_number}/{episode.episode_number}"
              >
                {episode.episode_number} - {episode.name}</a
              >, {episode.air_date} [{episode.runtime}
              Min.]
              {#if !isDateBeforeToday(episode.air_date)}
                –– UNAIRED
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .cast-list {
    list-style-type: none;
    padding-left: 0;
  }

  .avatar {
    border-radius: 50%;
    width: 75px;
    aspect-ratio: 1;
  }

  .cast {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .details a {
    font-size: 1.25rem;
    font-weight: bold;
  }
</style>
