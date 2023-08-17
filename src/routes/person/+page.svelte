<script>
  import Poster from "$lib/components/Poster.svelte";

  export let data;
  const { movies } = data;

  movies.sort((a, b) => b.popularity - a.popularity);
</script>

<h1>People</h1>

<div class="grid">
  {#each movies as movie}
    <a href="/person/{movie.id}">
      <Poster image={movie.profile_path} title={movie.name} />
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
