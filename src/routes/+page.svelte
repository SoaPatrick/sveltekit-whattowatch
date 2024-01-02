<script>
  export let data;
  const combinedProviders = [...data.movieProviders, ...data.tvProviders]
    .filter(
      (provider) =>
        provider.display_priorities &&
        provider.display_priorities.CH !== undefined
    )
    .map((provider) => ({
      logo_path: provider.logo_path,
      provider_name: provider.provider_name,
      provider_id: provider.provider_id,
      display_priority: provider.display_priorities.CH,
      provider_type: {
        tv: data.tvProviders.some(
          (p) =>
            p.provider_id === provider.provider_id &&
            p.provider_name === provider.provider_name
        ),
        movie: data.movieProviders.some(
          (p) =>
            p.provider_id === provider.provider_id &&
            p.provider_name === provider.provider_name
        ),
      },
    }));

  // Entfernen von Duplikaten basierend auf einer Kombination aus provider_id und provider_name
  const uniqueProviders = combinedProviders.filter(
    (provider, index, self) =>
      self.findIndex(
        (p) =>
          p.provider_id === provider.provider_id &&
          p.provider_name === provider.provider_name
      ) === index
  );

  // Sortieren der einzigartigen Provider nach 'display_priority'
  uniqueProviders.sort((a, b) => a.display_priority - b.display_priority);
</script>

<svelte:head>
  <title>Welcome to What to Watch</title>
  <meta name="description" content="This is a work in progress" />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    What to Watch
  </div>
  <div />
</header>

<div class="bg-egg-100 p-2">
  <h1 class="font-serif text-2xl my-2">Welcome to What to Watch</h1>
  <p class="pb-10">This is a work in progress...</p>

  <h3 class="font-serif text-xl my-2">Swiss Providers</h3>
  <div class="grid gap-2">
    {#each uniqueProviders as provider}
      <div class="flex gap-4 items-center">
        <img
          src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
          alt={provider.provider_name}
          class="w-20"
        />
        <div class="inline-grid">
          <span class="text-lg font-bold">{provider.provider_name}</span>
          <div>
            {#if provider.provider_type.tv}
              <span class="text-xs bg-cyan-35 p-1 rounded-md text-egg-100"
                >TV</span
              >
            {/if}
            {#if provider.provider_type.movie}
              <span
                class="text-xs bg-cyan-62 text-egg-100 p-1 rounded-md uppercase"
                >Film</span
              >
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
