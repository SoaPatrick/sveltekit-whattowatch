<script>
  import Poster from "$lib/components/Poster.svelte";

  export let data;
  const { movies } = data;
</script>

<svelte:head>
  <title>Movies</title>
  <meta name="description" content="list of movies" />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Movies</div>
  <div />
</header>

<div class="bg-egg-200 p-2">
  <div class="grid grid-cols-3 gap-2">
    {#each movies as movie}
      <a href="/movie/{movie.id}" class="hover:outline-2 hover:outline-primary">
        <Poster image={movie.poster_path} title={movie.title} />
      </a>
    {/each}
  </div>
</div>
