<script>
  export let userId;
  export let mediaId;
  export let supabase;
  export let contentType;
  export let season = null;
  export let episode = null;
  import {
    isInWatchedList,
    markAsWatched,
    markAsUnwatched,
  } from "$lib/watched";
  let isWatched = false;

  $: {
    if (season !== undefined && episode !== undefined) {
      loadWatchedStatus();
    }
  }

  async function loadWatchedStatus() {
    isWatched = await isInWatchedList(
      supabase,
      userId,
      mediaId,
      season,
      episode,
      contentType
    );
  }

  async function toggleWatched() {
    if (isWatched) {
      await markAsUnwatched(
        supabase,
        userId,
        mediaId,
        season,
        episode,
        contentType
      );
      isWatched = false;
    } else {
      await markAsWatched(
        supabase,
        userId,
        mediaId,
        season,
        episode,
        contentType
      );
      isWatched = true;
    }
    window.location.reload();
  }
</script>

{#if userId}
  <button
    on:click={toggleWatched}
    class="hover:bg-gray-200 p-4 block w-full text-left"
    title={isWatched ? "Mark as Unwatched" : "Mark as Watched"}
  >
    {#if isWatched}
      Mark as Unwatched
    {:else}
      Mark as Watched
    {/if}
  </button>
{/if}
