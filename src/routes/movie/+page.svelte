<script>
  import Poster from "$lib/components/Poster.svelte";
  import Watchlist from "$lib/components/Watchlist.svelte";
  import Watched from "$lib/components/Watched.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import { initializeModalArray, extractData } from "$lib/helpers";

  export let data;
  const { movies } = data;
  let { userId, supabase } = extractData(data);

  let showModal = initializeModalArray(movies.length);
  function openModal(index) {
    showModal[index] = true;
    showModal = [...showModal];
  }
</script>

<svelte:head>
  <title>Movies</title>
  <meta name="description" content="list of movies" />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Movies</div>
  <div />
</header>

<div class="bg-egg-200 p-2">
  <div class="grid grid-cols-3 gap-2">
    {#each movies as movie, index}
      <div class="relative">
        <a
          href="/movie/{movie.id}"
          class="hover:outline-2 hover:outline-primary"
        >
          <Poster image={movie.poster_path} title={movie.title} />
        </a>
        <div
          class="absolute top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
        >
          <ModalButton {index} {openModal} />
        </div>
      </div>
      <Modal bind:showModal={showModal[index]}>
        <h2 slot="header">{movie.title}</h2>
        <Watchlist {userId} mediaId={movie.id} {supabase} contentType="movie" />
        <Watched {userId} mediaId={movie.id} {supabase} contentType="movie" />
      </Modal>
    {/each}
  </div>
</div>
