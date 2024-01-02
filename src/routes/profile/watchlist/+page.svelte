<script lang="ts">
  import Poster from "$lib/components/Poster.svelte";
  import Watchlist from "$lib/components/Watchlist.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import { daysUntil, initializeModalArray, extractData } from "$lib/helpers";

  export let data;
  const { movies } = data.props;
  let { userId, supabase } = extractData(data);

  // Sortieren Sie das Array nach dem release_date Feld
  movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  // Erstellen Sie zwei leere Arrays
  let releasedMovies = [];
  let upcomingMovies = [];

  // Durchlaufen Sie das sortierte Array
  movies.forEach((movie) => {
    // Überprüfen Sie, ob das release_date vor oder nach dem aktuellen Datum liegt
    if (new Date(movie.release_date) <= new Date()) {
      // Wenn das release_date vor dem aktuellen Datum liegt, fügen Sie den Film zum releasedMovies Array hinzu
      releasedMovies.push(movie);
    } else {
      // Wenn das release_date nach dem aktuellen Datum liegt, fügen Sie den Film zum unreleasedMovies Array hinzu
      upcomingMovies.push(movie);
    }
  });

  let showModalReleased = initializeModalArray(releasedMovies.length);
  let showModalUpcoming = initializeModalArray(upcomingMovies.length);

  function openModalReleased(index) {
    showModalReleased[index] = true;
    showModalReleased = [...showModalReleased];
  }
  function openModalUpcoming(index) {
    showModalUpcoming[index] = true;
    showModalUpcoming = [...showModalUpcoming];
  }
</script>

<svelte:head>
  <title>Watchlist</title>
</svelte:head>

<header
  class="fixed z-20 top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Watchlist</div>
  <div />
</header>

<div class="bg-egg-200 p-2">
  <div class="flex">
    <div class="bg-primary p-2 block flex-1 text-center text-egg-200">
      Movies
    </div>
    <a
      href="./watchlist/tvshows"
      class="p-2 block bg-egg-100 flex-1 text-center">TV Shows</a
    >
  </div>
</div>

{#if data.session}
  {#if releasedMovies.length > 0}
    <div class="bg-egg-100 p-2">
      <h1 class="text-2xl font-bold my-4">Released</h1>
      <div class="grid grid-cols-3 gap-2">
        {#each releasedMovies as movie, index}
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
              <ModalButton {index} openModal={openModalReleased} />
            </div>
          </div>
          <Modal bind:showModal={showModalReleased[index]}>
            <h2 slot="header">{movie.title}</h2>
            <Watchlist
              {userId}
              mediaId={movie.id}
              {supabase}
              contentType="movie"
            />
          </Modal>
        {/each}
      </div>
    </div>
  {/if}
  {#if upcomingMovies.length > 0}
    <div class="bg-egg-200 p-2">
      <h1 class="text-2xl font-bold my-4">Upcoming</h1>
      <div class="grid grid-cols-3 gap-2">
        {#each upcomingMovies as movie, index}
          <div class="relative">
            <a
              href="/movie/{movie.id}"
              class="hover:outline-2 hover:outline-primary shadow"
            >
              <Poster image={movie.poster_path} title={movie.title} />
              <div
                class="absolute bottom-2 right-2 text-white font-bold text-shadow z-10"
              >
                {daysUntil(movie.release_date)}
              </div>
            </a>
            <div
              class="absolute z-20 top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
            >
              <ModalButton {index} openModal={openModalUpcoming} />
            </div>
          </div>
          <Modal bind:showModal={showModalUpcoming[index]}>
            <h2 slot="header">{movie.title}</h2>
            <Watchlist
              {userId}
              mediaId={movie.id}
              {supabase}
              contentType="movie"
            />
          </Modal>
        {/each}
      </div>
    </div>
  {/if}
{/if}

<style>
  .shadow:after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 20%
    );
  }
  .text-shadow {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>
