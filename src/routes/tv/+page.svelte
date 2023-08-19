<script>
  import Poster from "$lib/components/Poster.svelte";

  export let data;
  const { movies } = data;
</script>

<svelte:head>
  <title>Shows</title>
  <meta name="description" content="list of shows" />
</svelte:head>

<h1>Shows</h1>

<div class="grid">
  {#each movies as tv}
    <a href="/tv/{tv.id}">
      <Poster image={tv.poster_path} title={tv.name} />
      <div class="rating">
        {tv.vote_average.toFixed(1)} ({tv.vote_count})
      </div>
    </a>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 30px;
  }

  @media (max-width: 500px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }
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
