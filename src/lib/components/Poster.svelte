<script>
  export let image;
  export let title;
  export let size = "default";
</script>

{#if image != null}
  <img
    src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{image}"
    alt={title}
    loading="lazy"
    height="450"
    width="300"
    class="poster-{size}"
  />
{:else}
  <img
    src="https://placehold.co/300x450?text={title}"
    alt={title}
    loading="lazy"
    height="450"
    width="300"
    class="poster-{size}"
  />
{/if}

<style>
  img {
    display: block;
  }
  .poster-small {
    width: 75px;
    height: auto;
  }
</style>
