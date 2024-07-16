<script>
  import Poster from "$lib/components/Poster.svelte";

  export let data;
  const { people } = data;

  people.sort((a, b) => b.popularity - a.popularity);
</script>

<svelte:head>
  <title>People</title>
  <meta name="description" content="list of people" />
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">People</div>
  <div />
</header>

<div class="grid">
  {#each people as person}
    <a href="/person/{person.id}">
      <Poster image={person.profile_path} title={person.name} />
      <div class="rating">
        {person.popularity}
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
</style>
