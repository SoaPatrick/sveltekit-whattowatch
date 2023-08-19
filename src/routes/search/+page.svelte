<script>
  export let data;

  const product = data.product;
  let searchQuery = "";

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

<input
  type="text"
  bind:value={searchQuery}
  placeholder="Suche..."
  on:keydown={handleKeyPress}
/>
<button on:click={handleSearch}>Suchen</button>

{#if product.length > 0}
  <h1>Suchergebnisse</h1>
  <ul>
    {#each product as result (result.id)}
      <li>
        <a href="{result.media_type}/{result.id}"
          >{result.title || result.name}</a
        >
        [{result.media_type.toUpperCase()}]
        {#if result.media_type === "movie" && result.release_date}
          - {new Date(result.release_date).getFullYear()}
        {:else if result.media_type === "tv" && result.first_air_date}
          - {new Date(result.first_air_date).getFullYear()}
        {/if}
      </li>
    {/each}
  </ul>
{/if}
