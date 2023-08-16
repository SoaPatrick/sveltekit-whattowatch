<script>
  export let data;
  const { movies } = data;
</script>

<h1>Movies</h1>

<div class="grid">
  {#each movies as movie}
    <a href="/movie/{movie.id}">
      {#if movie.poster_path != null}
        <img
          src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{movie.poster_path}"
          loading="lazy"
          alt={movie.title}
        />
      {:else}
        <img
          src="https://placehold.co/300x450?text={movie.title}"
          loading="lazy"
          alt={movie.title}
        />
      {/if}
      <div class="rating">
        {movie.vote_average.toFixed(1)} ({movie.vote_count}) - {movie.popularity}
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
