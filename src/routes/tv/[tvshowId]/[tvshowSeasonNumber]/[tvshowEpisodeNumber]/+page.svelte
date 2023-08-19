<script>
  export let data;
  import Avatar from "$lib/components/Avatar.svelte";
  import {
    formatEpisodeNumber,
    formatSeasonNumber,
    truncateString,
  } from "$lib/helpers";

  const product = data.product;
</script>

<svelte:head>
  <title>{product.name}</title>
  <meta name="description" content={truncateString(product.overview, 150)} />
  {#if product.still_path}
    <meta
      property="og:image"
      content="https://www.themoviedb.org/t/p/w227_and_h127_bestv2{product.still_path}"
    />
  {/if}
</svelte:head>

<a href="../">Back</a>
<h1>{product.name}</h1>
<div class="rating">
  {product.vote_average.toFixed(1)} ({product.vote_count})
</div>
<div>
  {formatSeasonNumber(product.season_number)}{formatEpisodeNumber(
    product.episode_number
  )}
</div>
<img
  src="https://www.themoviedb.org/t/p/w227_and_h127_bestv2{product.still_path}"
  alt={product.name}
  loading="lazy"
  height="127"
  width="227"
/>
<p>{product.overview}</p>

<div class="two-cols">
  {#if product.guest_stars}
    <div>
      <h2>Guest Stars</h2>
      {#each product.guest_stars as person}
        <li class="cast">
          <div class="poster">
            <Avatar image={person.profile_path} title={person.name} />
          </div>
          <div class="details">
            <a href="/person/{person.id}">{person.name}</a><br />as {person.character}
          </div>
        </li>
      {/each}
    </div>
  {/if}
  {#if product.crew}
    <div>
      <h2>Crew</h2>
      {#each product.crew as person}
        <li class="cast">
          <div class="poster">
            <Avatar image={person.profile_path} title={person.name} />
          </div>
          <div class="details">
            <a href="/person/{person.id}">{person.name}</a><br />{person.job}
          </div>
        </li>
      {/each}
    </div>
  {/if}
</div>

<style>
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

  .poster {
    flex-shrink: 0;
  }
</style>
