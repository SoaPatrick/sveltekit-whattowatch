<script>
  export let data;

  const product = data.product;
  const cast = data.cast;

  cast.cast.sort((a, b) => a.order - b.order);
  cast.crew.sort((a, b) => b.popularity - a.popularity);

  function getInitials(name) {
    const names = name.split(" ");
    const initials = names.map((part) => part.charAt(0));
    return initials.join("").toUpperCase();
  }
</script>

<h1>{product.title}</h1>
<h2>{product.tagline}</h2>
<img
  src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{product.poster_path}"
  alt={product.title}
/>
<div>{product.runtime} Min.</div>
<p>
  <a href="https://www.imdb.com/title/{product.imdb_id}" target="_blank">IMDB</a
  >
</p>
<p>{product.overview}</p>

<div class="grid">
  <div class="cast-row">
    <h2>Cast ({cast.cast.length})</h2>
    <ul class="cast-list">
      {#each cast.cast as person}
        <li class="cast">
          {#if person.profile_path}
            <img
              src="https://www.themoviedb.org/t/p/w132_and_h132_face{person.profile_path}"
              alt={person.name}
              class="avatar"
            />
          {:else}
            <img
              src="https://placehold.co/132x132?text={getInitials(person.name)}"
              alt={person.name}
              class="avatar"
            />
          {/if}
          <div class="details">
            <a href="/people/{person.id}">{person.name}</a><br
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
          {#if person.profile_path}
            <img
              src="https://www.themoviedb.org/t/p/w132_and_h132_face{person.profile_path}"
              alt={person.name}
              class="avatar"
            />
          {:else}
            <img
              src="https://placehold.co/132x132?text={getInitials(person.name)}"
              alt={person.name}
              class="avatar"
            />
          {/if}
          <div class="details">
            <a href="/people/{person.id}">{person.name}</a><br />{person.job}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .cast-list {
    list-style-type: none;
    padding-left: 0;
  }

  .avatar {
    border-radius: 50%;
    width: 75px;
    aspect-ratio: 1;
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
</style>
