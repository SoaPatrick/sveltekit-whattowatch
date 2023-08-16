<script>
  let searchQuery = "";

  function handleSearch() {
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }
</script>

<nav>
  <a href="/">Home</a>
  <a href="/movie">Movies</a>
  <a href="/tv">TV Shows</a>
  <a href="/person">People</a>
  <a href="/about">About</a>
</nav>

<input
  type="text"
  bind:value={searchQuery}
  placeholder="Suche..."
  on:keydown={handleKeyPress}
/>
<button on:click={handleSearch}>Suchen</button>

<div class="container">
  <slot />
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
