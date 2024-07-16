<script>
  import Poster from "$lib/components/Poster.svelte";
  import Watchlist from "$lib/components/Watchlist.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import {
    formatDate,
    truncateString,
    calculateAge,
    initializeModalArray,
    extractData,
  } from "$lib/helpers";

  export let data;
  let { userId, supabase } = extractData(data);

  const product = data.product;
  const sortedCreditsByVote = data.sortedCreditsByVote;

  let showModal = initializeModalArray(sortedCreditsByVote.length);
  function openModal(index) {
    showModal[index] = true;
    showModal = [...showModal];
  }
</script>

<svelte:head>
  <title>{product.name}</title>
  <meta name="description" content={truncateString(product.biography, 150)} />
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
  <div class="flex gap-4" />
</div>

<!-- movie info with poster -->
<div class="bg-egg-100 p-2 flex gap-2">
  <div class="flex-shrink-0 w-28">
    <Poster image={product.profile_path} title={product.name} />
  </div>
  <div>
    <p class="leading-tight">{@html truncateString(product.biography, 200)}</p>
    <p class="mt-4">
      <span class="font-bold">Born: </span>{formatDate(product.birthday)} ({calculateAge(
        product.birthday
      )})
    </p>
  </div>
</div>

<!-- top billed cast -->
<div class="bg-egg-200 p-2">
  <div class="flex justify-between items-center">
    <h2 class="font-serif text-2xl">Filmography</h2>
    <a href="/person/{product.id}/credits/" class="text-sm">See All</a>
  </div>
  <div class="uppercase text-xs font-bold mb-1">Known For</div>
  <div class="flex gap-2 overflow-auto">
    {#each sortedCreditsByVote as credit, index}
      {#if index < 10}
        <div class="flex flex-col gap-1 w-24 flex-shrink-0 text-xs">
          <div class="relative">
            <a href="/{credit.media_type}/{credit.id}">
              <Poster image={credit.poster_path} title={credit.name} />
            </a>
            <div
              class="absolute top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
            >
              <ModalButton {index} {openModal} />
            </div>
          </div>
          <div class="text-center">
            <div class="font-bold overflow-x-hidden text-ellipsis">
              {credit.title || credit.name}
            </div>
          </div>
        </div>
        <Modal bind:showModal={showModal[index]}>
          <h2 slot="header">{credit.title || credit.name}</h2>
          <Watchlist
            {userId}
            mediaId={credit.id}
            {supabase}
            contentType="movie"
          />
        </Modal>
      {/if}
    {/each}
  </div>
</div>
