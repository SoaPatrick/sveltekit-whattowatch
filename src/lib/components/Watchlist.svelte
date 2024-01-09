<script>
  export let userId;
  export let mediaId;
  export let supabase;
  export let contentType;
  import {
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  } from "$lib/watchlist";
  let inWatchlist = false;

  // Laden Sie den aktuellen Watchlist-Status beim Start der Komponente
  (async () => {
    inWatchlist = await isInWatchlist(supabase, userId, mediaId, contentType);
  })();

  async function toggleWatchlist() {
    if (inWatchlist) {
      await removeFromWatchlist(supabase, userId, mediaId, contentType);
      inWatchlist = false;
    } else {
      await addToWatchlist(supabase, userId, mediaId, contentType);
      inWatchlist = true;
    }
    window.location.reload();
  }
</script>

{#if userId}
  <button
    on:click={toggleWatchlist}
    class="hover:bg-gray-200 p-4 block w-full text-left"
    title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
  >
    {#if inWatchlist}
      Remove from Watchlist
    {:else}
      Add to Watchlist
    {/if}
  </button>
{/if}
