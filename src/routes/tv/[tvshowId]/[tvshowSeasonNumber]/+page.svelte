<script>
  import {
    formatRuntime,
    isDateBeforeToday,
    truncateString,
  } from "$lib/helpers";
  import { page } from "$app/stores";
  import Avatar from "$lib/components/Avatar.svelte";

  export let data;
  $: product = data.tvshow;
  $: episodes = data.episodes;
  $: tvshowSeasonNumber = $page.params.tvshowSeasonNumber;
</script>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    All Episodes
  </div>
  <div />
</header>

<div class="bg-egg-100 p-2">
  <h1>
    {product.name} ({product.first_air_date
      ? new Date(product.first_air_date).getFullYear()
      : ""} - {#if !product.in_production}{product.last_air_date
        ? new Date(product.last_air_date).getFullYear()
        : ""}{/if})
  </h1>
</div>

<div class="bg-egg-200 p-2">
  <h2>Seasons</h2>
  <div class="flex gap-2 overflow-auto">
    {#each product.seasons as season}
      {#if season.season_number == tvshowSeasonNumber}
        <a
          href="/tv/{product.id}/{season.season_number}"
          class="flex-shrink-0 bg-primary text-egg-100 w-8 aspect-square flex items-center justify-center rounded-full"
          >{season.season_number}</a
        >
      {:else}
        <a
          href="/tv/{product.id}/{season.season_number}"
          class="flex-shrink-0 bg-[#fff] w-8 aspect-square flex items-center justify-center rounded-full"
          >{season.season_number}</a
        >
      {/if}
    {/each}
  </div>
</div>

<div class="bg-egg-100 p-2 flex flex-col gap-2">
  {#each episodes.episodes as episode}
    <a
      href="/tv/{product.id}/{episodes.season_number}/{episode.episode_number}"
      class="flex gap-2 w-full"
    >
      <div class="w-24 flex-shrink-0">
        <Avatar image={episode.still_path} title={episode.name} />
      </div>
      <div class="flex flex-col justify-center">
        <div class="font-bold overflow-x-hidden text-ellipsis">
          {episode.episode_number}. {episode.name}
        </div>
        <div class="overflow-x-hidden text-ellipsis">
          {episode.air_date}
          {#if episode.runtime}[{formatRuntime(episode.runtime)}]{/if}<br />
          {#if !isDateBeforeToday(episode.air_date)}
            –– UNAIRED
          {/if}
        </div>
        <div class="overflow-y-hidden text-ellipsis text-sm mt-1">
          {truncateString(episode.overview, 100)}
        </div>
      </div>
    </a>
  {/each}
</div>
