<script>
  import Avatar from "$lib/components/Avatar.svelte";

  export let data;
  const cast = data.cast;
  const product = data.product;
</script>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">All Cast</div>
  <div />
</header>

<div class="bg-egg-100 p-2">
  <h1>
    {product.title} ({product.release_date
      ? new Date(product.release_date).getFullYear()
      : ""})
  </h1>
</div>
<div class="bg-egg-200 p-2 flex flex-col gap-2">
  {#each cast.cast as person, index}
    <a href="/person/{person.id}" class="flex gap-2 w-full">
      <div class="w-24 flex-shrink-0">
        <Avatar image={person.profile_path} title={person.name} />
      </div>
      <div class="flex flex-col justify-center">
        <div class="font-bold overflow-x-hidden text-ellipsis">
          {person.name}
        </div>
        <div class="overflow-x-hidden text-ellipsis">
          {person.character}
        </div>
      </div>
    </a>
  {/each}
</div>
