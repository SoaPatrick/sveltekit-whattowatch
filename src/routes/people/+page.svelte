<script>
  export let data;
  const { movies } = data;

  movies.sort((a, b) => b.popularity - a.popularity);
</script>

<h1>Movies</h1>

<div class="grid">
  {#each movies as movie}
    <a href="/people/{movie.id}">
      {#if movie.profile_path != null}
        <img
          src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{movie.profile_path}"
          loading="lazy"
          alt={movie.name}
        />
      {:else}
        <img
          src="https://placehold.co/300x450?text={credit.original_title}"
          loading="lazy"
          alt={movie.name}
        />
      {/if}
      <div class="rating">
        {movie.popularity}
      </div>
    </a>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  a {
    position: relative;
  }

  a:hover {
    outline: 0.5rem solid rgba(255, 0, 0, 0.5);
  }

  .rating {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    display: block;
  }
</style>
