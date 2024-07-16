<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import Poster from "$lib/components/Poster.svelte";
  import Watchlist from "$lib/components/Watchlist.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ModalButton from "$lib/components/ModalButton.svelte";
  import {
    formatRuntime,
    initializeModalArray,
    daysUntil,
    extractData,
  } from "$lib/helpers";

  export let data;
  let { userId, supabase } = extractData(data);

  const product = data.product;
  const cast = data.cast;
  const providers = data.providers;
  const release_dates = data.releaseDates;

  const chProviders = {
    rent: [],
    buy: [],
    flatrate: [],
  };

  if (providers.results && providers.results.CH) {
    const categories = ["rent", "buy", "flatrate"];

    // Durchlaufen der verschiedenen Kategorien (rent, buy, flatrate)
    categories.forEach((category) => {
      if (providers.results.CH[category]) {
        providers.results.CH[category].forEach((provider) => {
          chProviders[category].push({
            provider_id: provider.provider_id,
            provider_name: provider.provider_name,
            logo_path: provider.logo_path,
          });
        });
      }
    });
  }

  const crewDirecting = cast.crew.filter(
    (person) => person.department === "Directing" && person.job === "Director"
  );

  const crewWriting = cast.crew.filter(
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

  let showModal = initializeModalArray(product.length);
  function openModal(index) {
    showModal[index] = true;
    showModal = [...showModal];
  }
</script>

<svelte:head>
  <title>{product.title}</title>
  <meta name="description" content={product.tagline} />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    {product.title}
  </div>
  <div />
</header>

<!-- movie title -->
<div class="bg-egg-200 p-2">
  <h1 class="font-serif text-3xl py-1">{product.title}</h1>
  <div class="flex gap-4">
    <span
      >{product.release_date
        ? new Date(product.release_date).getFullYear()
        : ""}</span
    >
    <span>{daysUntil(product.release_date)}</span>
    <span>{formatRuntime(product.runtime)}</span>
  </div>
</div>

<!-- movie info with poster -->
<div class="bg-egg-100 p-2 flex gap-2">
  <div class="flex-shrink-0 w-28">
    <div class="relative">
      <Poster image={product.poster_path} title={product.title} />
      <div
        class="absolute top-1 right-1 w-8 aspect-square flex items-center justify-center bg-primary text-white rounded-md opacity-50 hover:opacity-100 transition-opacity"
      >
        <ModalButton index="1" {openModal} />
      </div>
    </div>
    <Modal bind:showModal={showModal[1]}>
      <h2 slot="header">{product.title}</h2>
      <Watchlist {userId} mediaId={product.id} {supabase} contentType="movie" />
    </Modal>
  </div>
  <div>
    <div class="overflow-auto mb-4">
      <div class="flex flex-wrap gap-x-2">
        {#each product.genres as genre}
          <div class="whitespace-nowrap">
            <span class="text-primary">#</span>{genre.name}
          </div>
        {/each}
      </div>
    </div>
    <p class="leading-tight">{product.overview}</p>
  </div>
</div>
{#if Object.values(chProviders).some((category) => category.length > 0)}
  <div class="p-2 bg-blue-200 text-egg-200">
    <div class="uppercase text-xs font-bold mb-1 mt-4">Watch now</div>
    <div>
      {#each Object.keys(chProviders) as category}
        {#if chProviders[category].length > 0}
          <div class="mb-4">
            <div class="text-sm font-semibold capitalize mb-2">
              {category}
            </div>
            <div class="flex flex-wrap gap-2">
              {#each chProviders[category] as provider}
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                  class="w-10 h-10"
                />
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{/if}

<!-- top billed cast -->
<div class="bg-egg-200 p-2">
  <div class="flex justify-between items-center">
    <h2 class="font-serif text-2xl">Cast</h2>
    <a href="/movie/{product.id}/cast/" class="text-sm">See All</a>
  </div>
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

<!-- top crew -->
<div class="bg-egg-100 p-2">
  <div class="flex justify-between items-center">
    <h2 class="font-serif text-2xl">Crew</h2>
    <a href="/movie/{product.id}/crew/" class="text-sm">See All</a>
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
