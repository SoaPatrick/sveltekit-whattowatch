<script>
  export let data;
  const { movies } = data;
</script>

<h1>TV SHows</h1>

<div class="grid">
  {#each movies as tv}
    <a href="/tv/{tv.id}">
      <img
        src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{tv.poster_path}"
        alt={tv.title}
      />
      <div class="rating">
        {tv.vote_average.toFixed(1)} ({tv.vote_count})
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
