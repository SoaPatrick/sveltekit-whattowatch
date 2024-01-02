<script>
  import { page } from "$app/stores";

  export let data;

  const product = data.product;
  let searchQuery = "";

  let URLSearchParams = $page.url.searchParams;
  const queryValue = URLSearchParams.get("query");

  function handleSearch() {
    if (isValidSearchQuery(searchQuery)) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    } else {
      alert("Invalid search query");
    }
  }

  function isValidSearchQuery(query) {
    if (query.length < 2) {
      return false;
    }

    const validCharacters = /^[a-zA-Z0-9\s\-_',.!?&()]+$/;
    return validCharacters.test(query);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }
</script>

<svelte:head>
  <title>Search</title>
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Suchen</div>
  <div />
</header>

<div class="bg-egg-100 p-2">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="Suche..."
    on:keydown={handleKeyPress}
    class="border-x border-y p-2 border-[#ccc] w-full"
  />
</div>

{#if product.length > 0}
  <div class="bg-egg-200 p-2">
    <h1 class="font-serif text-2xl my-2">Suchergebnisse ({product.length})</h1>
  </div>
  {#each product as result (result.id)}
    <a class="p-2 block odd:bg-egg-200" href="{result.media_type}/{result.id}"
      ><span class="font-bold block">{result.title || result.name}</span>
      [{result.media_type}]
      {#if result.media_type === "movie" && result.release_date}
        - {new Date(result.release_date).getFullYear()}
      {:else if result.media_type === "tv" && result.first_air_date}
        - {new Date(result.first_air_date).getFullYear()}
      {/if}
    </a>
  {/each}
{:else if queryValue !== null}
  <div class="bg-egg-200 p-2">
    <h1 class="font-serif text-2xl my-2">
      Keine Suchergebnisse für<br />
      {queryValue}
    </h1>
  </div>
{/if}
