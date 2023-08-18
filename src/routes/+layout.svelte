<script>
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

<header>
  <h1>What To Watch</h1>
  <div>
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
  </div>
</header>

<div class="container">
  <slot />
</div>
<footer>
  <img src="/tmdb-logo.svg" alt="TMDB" />
  <div>
    This product uses the TMDB API but is not endorsed or certified by TMDB.
  </div>
</footer>

<style global>
  .container {
    width: 1200px;
    max-width: calc(100% - 40px);
    margin: 0 auto;
    padding: 50px 20px;
    flex: 1;
  }

  header,
  footer {
    background: #ddd;
    padding: 50px 20px;
  }

  header {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: start;
    justify-content: space-between;
  }

  h1 {
    margin: 0;
  }

  nav {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  }

  footer img {
    width: 200px;
    height: auto;
  }
</style>
