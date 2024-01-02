<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import Watchlist from "$lib/components/watchlist.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import { initializeModalArray, extractData } from "$lib/helpers";

  export let data;

  const product = data.product;
  const castCredits = data.combinedCreditsCast;
  const crewCredits = data.combinedCreditsCrew;

  let { userId, supabase } = extractData(data);
  let showModalCast = initializeModalArray(castCredits.length);
  let showModalCrew = initializeModalArray(castCredits.length);

  function openModalCast(index) {
    showModalCast[index] = true;
    showModalCast = [...showModalCast];
  }
  function openModalCrew(index) {
    showModalCrew[index] = true;
    showModalCrew = [...showModalCrew];
  }
</script>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    Full Filmography
  </div>
  <div />
</header>

<div class="bg-egg-100 p-2">
  <h1>
    {product.name}
  </h1>
</div>
<div class="bg-egg-200 p-2 flex flex-col gap-2">
  {#each castCredits as credit, index}
    <div class="flex gap-2 items-start">
      <a href="/{credit.media_type}/{credit.id}" class="flex gap-2 w-full">
        <div class="w-24 flex-shrink-0">
          <Avatar
            image={credit.poster_path}
            title={credit.name || credit.title}
          />
        </div>
        <div class="flex flex-col justify-center">
          <div class="font-bold overflow-x-hidden text-ellipsis">
            {credit.name || credit.title}
          </div>
          {#if credit.media_type === "tv"}
            <div>
              {credit.first_air_date
                ? new Date(credit.first_air_date).getFullYear()
                : ""}
            </div>
          {:else if credit.media_type === "movie"}
            <div>
              {credit.release_date
                ? new Date(credit.release_date).getFullYear()
                : ""}
            </div>
          {/if}
          {#if credit.character}
            <div>
              {#if credit.media_type === "tv"}
                ({credit.episode_count} Episode{#if credit.episode_count > 1}s{/if})
              {/if}
              as {credit.character}
            </div>
          {/if}
        </div>
      </a>
      <ModalButton {index} openModal={openModalCast} />
    </div>
    <Modal bind:showModal={showModalCast[index]}>
      <h2 slot="header">{credit.name || credit.title}</h2>
      <Watchlist
        {userId}
        mediaId={credit.id}
        {supabase}
        contentType={credit.media_type}
      />
    </Modal>
  {/each}
</div>
<div class="bg-egg-100 p-2 flex flex-col gap-2">
  {#each crewCredits as credit, index}
    <div class="flex gap-2 items-start">
      <a href="/{credit.media_type}/{credit.id}" class="flex gap-2 w-full">
        <div class="w-24 flex-shrink-0">
          <Avatar
            image={credit.poster_path}
            title={credit.name || credit.title}
          />
        </div>
        <div class="flex flex-col justify-center">
          <div class="font-bold overflow-x-hidden text-ellipsis">
            {credit.name || credit.title}
          </div>
          <div class="overflow-x-hidden text-ellipsis">
            {credit.job}
          </div>
          {#if credit.media_type === "tv"}
            <div>
              {credit.first_air_date
                ? new Date(credit.first_air_date).getFullYear()
                : ""}
            </div>
          {:else if credit.media_type === "movie"}
            <div>
              {credit.release_date
                ? new Date(credit.release_date).getFullYear()
                : ""}
            </div>
          {/if}
          <div>{credit.popularity}</div>
        </div>
      </a>
      <ModalButton {index} openModal={openModalCrew} />
    </div>
    <Modal bind:showModal={showModalCrew[index]}>
      <h2 slot="header">{credit.name || credit.title}</h2>
      <Watchlist
        {userId}
        mediaId={credit.id}
        {supabase}
        contentType={credit.media_type}
      />
    </Modal>
  {/each}
</div>
