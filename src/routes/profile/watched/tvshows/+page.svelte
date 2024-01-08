<script lang="ts">
  import Poster from "$lib/components/Poster.svelte";
  import Watchlist from "$lib/components/Watchlist.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import { initializeModalArray, extractData } from "$lib/helpers";
  import Watched from "$lib/components/Watched.svelte";

  export let data;
  const { series } = data.props;
  console.log(series);
  let { userId, supabase } = extractData(data);

  let showModal = initializeModalArray(series.length);

  function openModal(index) {
    showModal[index] = true;
    showModal = [...showModal];
  }

  function calculateProgress(watchedCount, totalEpisodes) {
    return (watchedCount / totalEpisodes) * 100;
  }
</script>

<svelte:head>
  <title>Watched</title>
</svelte:head>

<header
  class="fixed z-20 top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Watched</div>
  <div />
</header>

<div class="bg-egg-200 p-2">
  <div class="flex">
    <a href="../watched" class="p-2 bg-egg-100 block flex-1 text-center">
      Movies
    </a>
    <div class="p-2 block bg-primary flex-1 text-center text-egg-200">
      TV Shows
    </div>
  </div>
</div>

{#if data.session}
  {#if series.length > 0}
    <div class="bg-egg-100 p-2">
      <div class="grid grid-cols-3 gap-2">
        {#each series as episode, index}
          <div class="relative">
            <a href="/tv/{episode.id}">
              <Poster image={episode.poster_path} title={episode.title} />
            </a>
            <div
              class="absolute top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
            >
              <ModalButton {index} {openModal} />
            </div>
            <div class="w-full absolute bottom-0">
              <div class="bg-primary h-full p-1 text-sm text-egg-100">
                {episode.number_of_episodes_watched}/{episode.number_of_episodes}
                Episodes
              </div>
            </div>
          </div>
          <Modal bind:showModal={showModal[index]}>
            <h2 slot="header">{episode.title}</h2>
            <Watchlist
              {userId}
              mediaId={episode.id}
              {supabase}
              contentType="tv"
            />
          </Modal>
        {/each}
      </div>
    </div>
  {/if}
{/if}
