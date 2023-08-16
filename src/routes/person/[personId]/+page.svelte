<script>
  export let data;

  const product = data.product;
  const castCredits = data.combinedCreditsCast;
  const crewCredits = data.combinedCreditsCrew;
  const sortedCreditsByVote = data.sortedCreditsByVote;

  let gender;
  if (product.gender == 1) {
    gender = "Unknown";
  }
  if (product.gender == 2) {
    gender = "Male";
  } else {
    gender = "Female";
  }

  const birthDate = new Date(product.birthday);

  // Optionen für die Darstellung des Datums
  const options = { year: "numeric", month: "long", day: "numeric" };

  // Datum formatieren
  const formattedBirthDate = birthDate.toLocaleDateString("en-US", options);

  const currentDate = new Date();

  // Differenz in Millisekunden zwischen den beiden Datumswerten
  const timeDiff = currentDate - birthDate;

  // Differenz in Jahren berechnen
  const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
</script>

<h1>{product.name}</h1>
<img
  src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2{product.profile_path}"
  alt={product.name}
/>
{#if product.imdb_id}
  <p>
    <a href="https://www.imdb.com/name/{product.imdb_id}" target="_blank"
      >IMDB</a
    >
  </p>
{/if}
<div><strong>Known for:</strong> {product.known_for_department}</div>
<div><strong>Gender:</strong> {gender}</div>
<div><strong>Birthday:</strong> {formattedBirthDate} ({age} years old)</div>
<div><strong>Place of Birth:</strong> {product.place_of_birth}</div>
<p>{@html product.biography}</p>

<h2>known for</h2>
<div class="grid">
  {#each sortedCreditsByVote as credit}
    <a href="/{credit.media_type}/{credit.id}">
      {#if credit.poster_path != null}
        <img
          src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{credit.poster_path}"
          loading="lazy"
          alt={credit.name}
        />
      {:else}
        <img
          src="https://placehold.co/300x450?text={credit.name}"
          loading="lazy"
          alt={credit.name}
        />
      {/if}
      <div class="rating">
        {credit.vote_average.toFixed(1)} ({credit.vote_count} - {credit.popularity})
      </div>
    </a>
  {/each}
</div>

<div class="two-cols">
  <div>
    <h2>Cast Credits</h2>
    <div class="">
      {#each castCredits as credit}
        <li class="cast">
          {#if credit.poster_path != null}
            <img
              src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{credit.poster_path}"
              loading="lazy"
              alt={credit.title}
              class="small-poster"
            />
          {:else}
            <img
              src="https://placehold.co/300x450?text={credit.original_title}"
              loading="lazy"
              alt={credit.title}
              class="small-poster"
            />
          {/if}
          <div class="details">
            {#if credit.media_type === "tv"}
              <a href="/{credit.media_type}/{credit.id}">{credit.name}</a>
              <div>
                {credit.first_air_date
                  ? new Date(credit.first_air_date).getFullYear()
                  : ""}
              </div>
            {:else if credit.media_type === "movie"}
              <a href="/{credit.media_type}/{credit.id}">{credit.title}</a>
              <div>
                {credit.release_date
                  ? new Date(credit.release_date).getFullYear()
                  : ""}
              </div>
            {/if}
            {#if credit.character}
              <div>
                {#if credit.media_type === "tv"}
                  ({credit.episode_count} Episode{#if credit.episode_count > 1}s{/if})
                {/if}
                as {credit.character}
              </div>
            {/if}
            {#if credit.vote_average && credit.vote_count}
              <div>
                rating: {credit.vote_average.toFixed(1)} ({credit.vote_count})
              </div>
            {/if}
          </div>
        </li>
      {/each}
    </div>
  </div>
  <div>
    <h2>Crew Credits</h2>
    <div class="">
      {#each crewCredits as credit}
        <li class="cast">
          {#if credit.poster_path != null}
            <img
              src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/{credit.poster_path}"
              loading="lazy"
              alt={credit.title}
              class="small-poster"
            />
          {:else}
            <img
              src="https://placehold.co/300x450?text={credit.title}"
              loading="lazy"
              alt={credit.title}
              class="small-poster"
            />
          {/if}
          <div class="details">
            {#if credit.media_type === "tv"}
              <a href="/{credit.media_type}/{credit.id}">{credit.name}</a>
              <div>
                {credit.first_air_date
                  ? new Date(credit.first_air_date).getFullYear()
                  : ""}
              </div>
            {:else if credit.media_type === "movie"}
              <a href="/{credit.media_type}/{credit.id}">{credit.title}</a>
              <div>
                {credit.release_date
                  ? new Date(credit.release_date).getFullYear()
                  : ""}
              </div>
            {/if}
            <div>{credit.job}</div>
            <div>
              rating: {credit.vote_average.toFixed(1)} ({credit.vote_count})
            </div>
          </div>
        </li>
      {/each}
    </div>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  a {
    position: relative;
  }

  a:hover img {
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

  .small-poster {
    width: 75px;
    height: auto;
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
