<script>
  import Avatar from "$lib/components/Avatar.svelte";
  import Poster from "$lib/components/Poster.svelte";
  export let data;

  const product = data.product;
  const cast = data.cast;

  cast.cast.sort((a, b) => a.order - b.order);
  cast.crew.sort((a, b) => b.popularity - a.popularity);
</script>

<h1>{product.title}</h1>
<h2>{product.tagline}</h2>
<Poster image={product.poster_path} title={product.title} />
<div>{product.runtime} Min.</div>
<p>
  <a href="https://www.imdb.com/title/{product.imdb_id}" target="_blank">IMDB</a
  >
</p>
<p>{product.overview}</p>

<div class="two-cols">
  <div class="cast-row">
    <h2>Cast ({cast.cast.length})</h2>
    <ul class="cast-list">
      {#each cast.cast as person}
        <li class="cast">
          <div class="poster">
            <Avatar image={person.profile_path} title={person.name} />
          </div>
          <div class="details">
            <a href="/person/{person.id}">{person.name}</a><br
            />{person.character}
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <div class="crew-row">
    <h2>Crew ({cast.crew.length})</h2>
    <ul class="cast-list">
      {#each cast.crew as person}
        <li class="cast">
          <div class="poster">
            <Avatar image={person.profile_path} title={person.name} />
          </div>
          <div class="details">
            <a href="/person/{person.id}">{person.name}</a><br />{person.job}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 768px) {
    .two-cols {
      display: block;
    }
  }

  .cast-list {
    list-style-type: none;
    padding-left: 0;
  }

  .cast {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .details a {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .poster {
    flex-shrink: 0;
  }
</style>
