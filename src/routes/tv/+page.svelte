<script>
  import Poster from "$lib/components/Poster.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import Watchlist from "$lib/components/watchlist.svelte";
  import { initializeModalArray, extractData } from "$lib/helpers";

  export let data;
  const { shows } = data;
  let { userId, supabase } = extractData(data);

  let showModal = initializeModalArray(shows.length);
  function openModal(index) {
    showModal[index] = true;
    showModal = [...showModal];
  }
</script>

<svelte:head>
  <title>Shows</title>
  <meta name="description" content="list of shows" />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Shows</div>
  <div />
</header>

<div class="bg-egg-200 p-2">
  <div class="grid grid-cols-3 gap-2">
    {#each shows as show, index}
      <div class="relative">
        <a href="/tv/{show.id}" class="hover:outline-2 hover:outline-primary">
          <Poster image={show.poster_path} title={show.name} />
        </a>
        <div
          class="absolute top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
        >
          <ModalButton {index} {openModal} />
        </div>
      </div>
      <Modal bind:showModal={showModal[index]}>
        <h2 slot="header">{show.name}</h2>
        <Watchlist {userId} mediaId={show.id} {supabase} contentType="tv" />
      </Modal>
    {/each}
  </div>
</div>
