<script>
  import { getInitials } from "$lib/helpers";

  export let image;
  export let title;
</script>

{#if image}
  <img
    src="https://www.themoviedb.org/t/p/w138_and_h175_face{image}"
    alt={title}
    class="avatar"
    loading="lazy"
    height="138"
    width="175"
  />
{:else}
  <img
    src="https://placehold.co/138x175?text={getInitials(title)}"
    alt={title}
    class="avatar"
    loading="lazy"
    height="138"
    width="175"
  />
{/if}

<style>
  .avatar {
  }
</style>
