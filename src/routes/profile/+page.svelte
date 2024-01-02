<script lang="ts">
  import { Auth } from "@supabase/auth-ui-svelte";
  import { ThemeSupa } from "@supabase/auth-ui-shared";
  import { enhance, type SubmitFunction } from "$app/forms";

  export let data;
  let loading = false;

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">Profile</div>
  <div />
</header>

{#if data.session}
  <div class="bg-egg-200 p-2">
    <h1 class="text-2xl font-bold">
      Hi {data.username || data.session.user.email}
    </h1>
    <p>you are logged in</p>
    <div class="mt-2 flex gap-4">
      <a href="/profile/account" class="p-2 bg-primary text-egg-100"
        >Account Details</a
      >
      <form method="post" action="?/signout" use:enhance={handleSignOut}>
        <div>
          <button class="p-2 bg-primary text-egg-100" disabled={loading}
            >Sign Out</button
          >
        </div>
      </form>
    </div>
  </div>
  <div class="bg-egg-200 p-2">
    <div class="mt-2">
      <a href="./profile/watchlist">Watchlist</a>
      <a href="./profile/watched">Watched</a>
    </div>
  </div>
  <div class="bg-egg-100 p-2">
    <div class="mt-2">
      <h2 class="text-2xl font-bold">Registered Users</h2>
      {#each data.profiles as profile}
        <div>{profile.username}</div>
      {/each}
    </div>
  </div>
{:else}
  <div class="bg-egg-100 p-2">
    <Auth
      supabaseClient={data.supabase}
      view="magic_link"
      redirectTo={`${data.url}/auth/callback`}
      showLinks={false}
      appearance={{ theme: ThemeSupa }}
    />
  </div>
{/if}
