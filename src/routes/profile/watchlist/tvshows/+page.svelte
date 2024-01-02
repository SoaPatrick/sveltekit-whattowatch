<script lang="ts">
  import Avatar from "$lib/components/Avatar.svelte";
  import Watchlist from "$lib/components/watchlist.svelte";
  import Watched from "$lib/components/Watched.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";

  export let data;
  import {
    formatEpisodeNumber,
    formatSeasonNumber,
    isDateBeforeToday,
    formatRuntime,
    initializeModalArray,
    extractData,
    daysUntil,
  } from "$lib/helpers";
  const { nextEpisodesAired, nextEpisodesUnaired } = data.props;

  nextEpisodesAired.forEach((serie) => {
    console.log(serie);
  });

  let { userId, supabase } = extractData(data);
  let showModalAired = initializeModalArray(nextEpisodesAired.length);
  let showModalUnaired = initializeModalArray(nextEpisodesUnaired.length);

  function openModalAired(index: number) {
    showModalAired[index] = true;
    showModalAired = [...showModalAired];
  }

  function openModalUnaired(index: number) {
    showModalUnaired[index] = true;
    showModalUnaired = [...showshowModalUnairedModal];
  }
</script>

<svelte:head>
  <title>Watchlist</title>
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Watchlist</div>
  <div />
</header>

<div class="bg-egg-200 p-2">
  <div class="flex">
    <a href="../watchlist" class="p-2 block bg-egg-100 flex-1 text-center"
      >Movies</a
    >
    <div class="bg-primary p-2 block flex-1 text-center text-egg-200">
      TV Shows
    </div>
  </div>
</div>

{#if data.session}
  {#if nextEpisodesAired.length > 0}
    <div class="bg-egg-100 p-2">
      <h1 class="text-2xl font-bold my-4">Watch next</h1>
      <div class="grid grid-cols-1 gap-2">
        {#each nextEpisodesAired as episode, index}
          <div class="flex gap-2 items-start">
            <div class="flex gap-2 w-full">
              <div class="w-24 flex-shrink-0">
                <Avatar
                  image={episode.still_path || episode.poster_path}
                  title={episode.name}
                />
              </div>
              <div class="flex flex-col justify-center">
                <div>
                  <a
                    href="/tv/{episode.show_id}"
                    class="text-xs bg-blue-500 text-white rounded-xl inline-block py-1 px-2 mb-1"
                  >
                    {episode.show_name}
                  </a>
                </div>
                <div class="font-bold">
                  [{formatSeasonNumber(
                    episode.season_number
                  )}{formatEpisodeNumber(episode.episode_number)}]
                </div>
                <a
                  href="/tv/{episode.show_id}/{episode.season_number}/{episode.episode_number}"
                  class=" text-sm overflow-x-hidden text-ellipsis"
                >
                  {episode.name}
                </a>
                <div class="overflow-x-hidden text-ellipsis">
                  {episode.air_date}
                  {#if episode.runtime}[{formatRuntime(
                      episode.runtime
                    )}]{/if}<br />
                  {#if !isDateBeforeToday(episode.air_date)}
                    {daysUntil(episode.air_date)}
                  {/if}
                </div>
              </div>
            </div>
            <ModalButton {index} openModal={openModalAired} />
          </div>
          <Modal bind:showModal={showModalAired[index]}>
            <h2 slot="header">{episode.name}</h2>
            <Watchlist
              {userId}
              mediaId={episode.show_id}
              {supabase}
              contentType="tv"
            />
            <Watched
              {userId}
              mediaId={episode.show_id}
              season={episode.season_number}
              episode={episode.episode_number}
              {supabase}
              contentType="episode"
            />
          </Modal>
        {/each}
      </div>
    </div>
  {/if}
{/if}

{#if data.session}
  {#if nextEpisodesUnaired.length > 0}
    <div class="bg-egg-100 p-2">
      <h1 class="text-2xl font-bold my-4">Watch next</h1>
      <div class="grid grid-cols-1 gap-2">
        {#each nextEpisodesUnaired as episode, index}
          <div class="flex gap-2 items-start">
            <div class="flex gap-2 w-full">
              <div class="w-24 flex-shrink-0">
                <Avatar
                  image={episode.still_path || episode.poster_path}
                  title={episode.name}
                />
              </div>
              <div class="flex flex-col justify-center">
                <div>
                  <a
                    href="/tv/{episode.show_id}"
                    class="text-xs bg-blue-500 text-white rounded-xl inline-block py-1 px-2 mb-1"
                  >
                    {episode.show_name}
                  </a>
                </div>
                <div class="font-bold">
                  [{formatSeasonNumber(
                    episode.season_number
                  )}{formatEpisodeNumber(episode.episode_number)}]
                </div>
                <a
                  href="/tv/{episode.show_id}/{episode.season_number}/{episode.episode_number}"
                  class=" text-sm overflow-x-hidden text-ellipsis"
                >
                  {episode.name}
                </a>
                <div class="overflow-x-hidden text-ellipsis">
                  {episode.air_date}
                  {#if episode.runtime}[{formatRuntime(
                      episode.runtime
                    )}]{/if}<br />
                  {#if !isDateBeforeToday(episode.air_date)}
                    {daysUntil(episode.air_date)}
                  {/if}
                </div>
              </div>
            </div>
            <ModalButton {index} openModal={openModalUnaired} />
          </div>
          <Modal bind:showModal={showModalUnaired[index]}>
            <h2 slot="header">{episode.name}</h2>
            <Watchlist
              {userId}
              mediaId={episode.show_id}
              {supabase}
              contentType="tv"
            />
            <Watched
              {userId}
              mediaId={episode.show_id}
              season={episode.season_number}
              episode={episode.episode_number}
              {supabase}
              contentType="episode"
            />
          </Modal>
        {/each}
      </div>
    </div>
  {/if}
{/if}
