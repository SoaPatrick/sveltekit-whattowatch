<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import Poster from "$lib/components/Poster.svelte";
  import {
    formatEpisodeNumber,
    formatRuntime,
    formatSeasonNumber,
    getInitials,
  } from "$lib/helpers";
  export let data;

  const product = data.product;
  const cast = data.credits;
  const ids = data.ids;

  const nextEpisode = product.next_episode_to_air;
  const seasons = product.seasons;

  function isDateBeforeToday(dateString) {
    const today = new Date();
    const dateToCompare = new Date(dateString);

    // Setze die Zeit auf Mitternacht, um nur das Datum zu vergleichen
    today.setHours(0, 0, 0, 0);
    dateToCompare.setHours(0, 0, 0, 0);

    return dateToCompare < today;
  }
</script>

<svelte:head>
  <title>{product.name}</title>
  <meta name="description" content={product.tagline} />
  {#if product.profile_path}
    <meta
      property="og:image"
      content="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{product.poster_path}"
    />
  {/if}
</svelte:head>

<h1>{product.name}</h1>
<h2>{product.tagline}</h2>
<Poster image={product.poster_path} title={product.name} />
<div>{formatRuntime(product.episode_run_time)}</div>
<p>
  <a href="https://www.imdb.com/title/{ids.imdb_id}" target="_blank">IMDB</a>
</p>
<p>{product.overview}</p>

<div class="two-cols">
  <div class="cast-row">
    <h2>Cast ({cast.cast.length})</h2>
    <ul class="cast-list">
      {#each cast.cast as person}
        <li class="cast">
          <div class="poster">
            <Avatar image={person.profile_path} title={person.name} />
          </div>
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
          <div class="poster">
            <Avatar image={person.profile_path} title={person.name} />
          </div>
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
      {#if nextEpisode.runtime}
        <li>{formatRuntime(nextEpisode.runtime)}</li>
      {/if}
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
              >, {episode.air_date} [{formatRuntime(episode.runtime)}]
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
  .two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 768px) {
    .two-cols {
      display: block;
    }
  }
  .cast-list {
    list-style-type: none;
    padding-left: 0;
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

  .poster {
    flex-shrink: 0;
  }
</style>
