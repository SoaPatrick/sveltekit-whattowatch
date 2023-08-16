<script>
  export let data;

  const product = data.product;
  const movieCredits = data.movieCredits;
  const tvCredits = data.tvCredits;
</script>

<h1>{product.name}</h1>
<img
  src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{product.profile_path}"
  alt={product.name}
/>
<p>
  <a href="https://www.imdb.com/name/{product.imdb_id}" target="_blank">IMDB</a>
</p>
<p>{@html product.biography}</p>
<h2>Movie Credits</h2>
<div class="grid">
  {#each movieCredits as credit}
    <a href="/movies/{credit.id}">
      {#if credit.poster_path != null}
        <img
          src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{credit.poster_path}"
          loading="lazy"
          alt={credit.original_title}
        />
      {:else}
        <img
          src="https://placehold.co/300x450?text={credit.original_title}"
          loading="lazy"
          alt={credit.original_title}
        />
      {/if}
      <div class="rating">
        {credit.vote_average.toFixed(1)} ({credit.vote_count})
      </div>
    </a>
  {/each}
</div>

<h2>TV Credits</h2>
<div class="grid">
  {#each tvCredits as credit}
    <a href="/tvshows/{credit.id}">
      {#if credit.poster_path != null}
        <img
          src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{credit.poster_path}"
          loading="lazy"
          alt={credit.original_name}
        />
      {:else}
        <img
          src="https://placehold.co/300x450?text={credit.original_name}"
          loading="lazy"
          alt={credit.original_name}
        />
      {/if}
      <div class="rating">
        {credit.vote_average.toFixed(1)} ({credit.vote_count})
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
