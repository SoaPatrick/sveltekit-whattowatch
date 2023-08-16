<script>
  export let data;

  const product = data.product;

  const linkTypes = {
    tv: "tvshows",
    movie: "movies",
    person: "people",
  };
</script>

<h1>Suchergebnisse</h1>

<ul>
  {#each product as result (result.id)}
    <li>
      <a href={`/${linkTypes[result.media_type]}/${result.id}`}
        >{result.title || result.name}
      </a>
      [{result.media_type.toUpperCase()}]
      {#if result.media_type === "movie" && result.release_date}
        - {new Date(result.release_date).getFullYear()}
      {:else if result.media_type === "tv" && result.first_air_date}
        - {new Date(result.first_air_date).getFullYear()}
      {/if}
    </li>
  {/each}
</ul>
