<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import Poster from "$lib/components/Poster.svelte";
  import {
    formatEpisodeNumber,
    formatRuntime,
    formatSeasonNumber,
    isDateBeforeToday,
    truncateString,
  } from "$lib/helpers";
  export let data;

  const product = data.product;
  const cast = data.credits;
  const ids = data.ids;

  const nextEpisode = product.next_episode_to_air;
  const seasons = product.seasons;
  console.log(product);
</script>

<svelte:head>
  <title>{product.name}</title>
  <meta name="description" content={product.tagline} />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    {product.name}
  </div>
  <div />
</header>

<!-- movie title -->
<div class="bg-egg-200 p-2">
  <h1 class="font-serif text-3xl py-1">{product.name}</h1>
  <div class="flex gap-4">
    <span
      >{#if product.type === "Miniseries"}Mini-Series{:else}TV Series{/if}</span
    >
    <span
      >{product.first_air_date
        ? new Date(product.first_air_date).getFullYear()
        : ""} - {#if !product.in_production}{product.last_air_date
          ? new Date(product.last_air_date).getFullYear()
          : ""}{/if}</span
    >
  </div>
</div>

<!-- movie info with poster -->
<div class="bg-egg-100 p-2 flex gap-2">
  <div class="flex-shrink-0 w-28">
    <Poster image={product.poster_path} title={product.name} />
    <a
      href="https://www.imdb.com/title/{ids.imdb_id}"
      target="_blank"
      class="mt-2 block"
      ><svg
        id="home_img"
        class="ipc-logo"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="32"
        viewBox="0 0 64 32"
        version="1.1"
        ><g fill="#F5C518"
          ><rect x="0" y="0" width="100%" height="100%" rx="4" /></g
        ><g
          transform="translate(8.000000, 7.000000)"
          fill="#000000"
          fill-rule="nonzero"
          ><polygon points="0 18 5 18 5 0 0 0" /><path
            d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"
          /><path
            d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"
          /><path
            d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"
          /></g
        ></svg
      ></a
    >
  </div>
  <div>
    <div class="overflow-x-auto mb-4">
      <ul class="flex flex-wrap gap-x-2">
        {#each product.genres as genre}
          <li class="whitespace-nowrap">
            <span class="text-primary">#</span>{genre.name}
          </li>
        {/each}
      </ul>
    </div>
    <p class="leading-tight">{truncateString(product.overview, 150)}</p>
  </div>
</div>

<!-- episode guide -->
<a
  href="/tv/{product.id}/{product.seasons[0].season_number}"
  class="bg-cyan-62 color p-2 flex justify-between"
>
  <div class="font-bold">Episode Guide</div>
  <div>
    {product.number_of_episodes}
  </div>
</a>

<!-- top billed cast -->
<div class="bg-egg-200 p-2">
  <h2 class="font-serif text-2xl">Cast</h2>
  <div class="uppercase text-xs font-bold mb-1">Top billed cast</div>
  <div class="flex gap-2 overflow-auto">
    {#each cast.cast as person, index}
      {#if index < 10}
        <a
          href="/person/{person.id}"
          class="flex flex-col gap-1 w-24 flex-shrink-0 text-xs"
        >
          <Avatar image={person.profile_path} title={person.name} />
          <div class="text-center">
            <div class="font-bold overflow-x-hidden text-ellipsis">
              {person.name}
            </div>
            <div class="overflow-x-hidden text-ellipsis">
              {person.character}
            </div>
          </div>
        </a>
      {/if}
    {/each}
  </div>
</div>

<!-- top billed cast -->
<div class="bg-egg-100 p-2">
  <h2 class="font-serif text-2xl">Cast</h2>
  <div class="uppercase text-xs font-bold mb-1">Created by</div>
  <div class="flex gap-2 overflow-auto">
    {#each product.created_by as person, index}
      {#if index < 10}
        <a
          href="/person/{person.id}"
          class="flex flex-col gap-1 w-24 flex-shrink-0 text-xs"
        >
          <Avatar image={person.profile_path} title={person.name} />
          <div class="text-center">
            <div class="font-bold overflow-x-hidden text-ellipsis">
              {person.name}
            </div>
          </div>
        </a>
      {/if}
    {/each}
  </div>
</div>
