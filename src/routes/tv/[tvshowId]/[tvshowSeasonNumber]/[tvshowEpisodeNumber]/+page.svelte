<script>
  export let data;
  import Avatar from "$lib/components/Avatar.svelte";
  import Poster from "$lib/components/Poster.svelte";
  import Watchlist from "$lib/components/Watchlist.svelte";
  import Watched from "$lib/components/Watched.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import {
    formatEpisodeNumber,
    formatRuntime,
    formatSeasonNumber,
    truncateString,
    initializeModalArray,
    extractData,
  } from "$lib/helpers";

  const product = data.product;
  const seasonId = data.seasonId;

  const crewDirecting = product.crew.filter(
    (person) => person.department === "Directing" && person.job === "Director"
  );

  const crewWriting = product.crew.filter(
    (person) => person.department === "Writing"
  );

  const groupedCrew = new Map();
  crewWriting.forEach((person) => {
    if (!groupedCrew.has(person.id)) {
      groupedCrew.set(person.id, [person]);
    } else {
      groupedCrew.get(person.id).push(person);
    }
  });

  const crewWithCombinedJobs = [];
  groupedCrew.forEach((persons) => {
    const combinedJobs = persons.map((p) => p.job).join(" / ");
    crewWithCombinedJobs.push({
      ...persons[0],
      combinedJobs,
    });
  });

  let { userId, supabase } = extractData(data);
  let showModal = initializeModalArray(product.length);

  function openModal(index) {
    showModal[index] = true;
    showModal = [...showModal];
  }
</script>

<svelte:head>
  <title>{product.name}</title>
  <meta name="description" content={truncateString(product.overview, 150)} />
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
    <span>
      {formatSeasonNumber(product.season_number)}{formatEpisodeNumber(
        product.episode_number
      )}</span
    >
    <span>{formatRuntime(product.runtime)}</span>
  </div>
</div>

<!-- movie info with poster -->
<div class="bg-egg-100 p-2 flex gap-2">
  <div class="flex-shrink-0 w-28">
    <div class="relative">
      <Poster image={product.still_path} title={product.name} />
      <div
        class="absolute top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
      >
        <ModalButton index="1" {openModal} />
      </div>
    </div>
    <Modal bind:showModal={showModal[1]}>
      <h2 slot="header">{product.title}</h2>
      <Watchlist {userId} mediaId={seasonId} {supabase} contentType="tv" />
      <Watched
        {userId}
        mediaId={seasonId}
        season={product.season_number}
        episode={product.episode_number}
        {supabase}
        contentType="episode"
      />
    </Modal>
  </div>
  <div>
    <p class="leading-tight">{product.overview}</p>
  </div>
</div>

<!-- top billed cast -->
<div class="bg-egg-200 p-2">
  <div class="flex justify-between items-center">
    <h2 class="font-serif text-2xl">Cast</h2>
  </div>
  <div class="uppercase text-xs font-bold mb-1">Guest Stars</div>
  <div class="flex gap-2 overflow-auto">
    {#each product.guest_stars as person, index}
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

<!-- top crew -->
<div class="bg-egg-100 p-2">
  <div class="flex justify-between items-center">
    <h2 class="font-serif text-2xl">Crew</h2>
  </div>
  <div class="overflow-auto">
    <div class="flex gap-2">
      <div>
        <div class="uppercase text-xs font-bold mb-1">Directing</div>
        <div class="flex gap-2">
          {#each crewDirecting as person}
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
                  {person.job}
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
      <div>
        <div class="uppercase text-xs font-bold mb-1">Writing</div>
        <div class="flex gap-2">
          {#each crewWithCombinedJobs as person}
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
                  {person.combinedJobs}
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
