<script>
  import { getInitials } from "$lib/helpers";

  export let image;
  export let title;
</script>

{#if image}
  <img
    src="https://www.themoviedb.org/t/p/w132_and_h132_face{image}"
    alt={title}
    class="avatar"
    loading="lazy"
    height="132"
    width="132"
  />
{:else}
  <img
    src="https://placehold.co/132x132?text={getInitials(title)}"
    alt={title}
    class="avatar"
    loading="lazy"
    height="132"
    width="132"
  />
{/if}

<style>
  .avatar {
    border-radius: 50%;
    width: 75px;
    height: auto;
    aspect-ratio: 1;
  }
</style>
