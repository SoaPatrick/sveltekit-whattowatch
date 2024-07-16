<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";

  export let data;
  export let form;

  let { session, supabase, profile } = data;
  $: ({ session, supabase, profile } = data);

  let profileForm: HTMLFormElement;
  let loading = false;
  let username: string = profile?.username ?? "";

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };
</script>

<header
  class="fixed top-0 left-0 w-full bg-primary px-2 gap-2 py-3 text-egg-100 font-bold flex justify-between"
>
  <div />
  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
    Account Details
  </div>
  <div />
</header>

<div class="bg-egg-100 p-2">
  <form
    method="post"
    action="?/update"
    class="flex flex-col gap-4"
    use:enhance={handleSubmit}
    bind:this={profileForm}
  >
    <div>
      <label for="email" class="block">Email</label>
      <input
        id="email"
        type="text"
        class="border-x border-y p-2 border-[#ccc] w-full"
        value={session.user.email}
        disabled
      />
    </div>

    <div>
      <label for="username">Username</label>
      <input
        id="username"
        name="username"
        required
        class="border-x border-y p-2 border-[#ccc] w-full"
        type="text"
        value={form?.username ?? username}
      />
    </div>

    <div class="flex gap-4">
      <input
        type="submit"
        class="p-2 bg-primary text-egg-100"
        value={loading ? "Loading..." : "Update"}
        disabled={loading}
      />
      <a href="/profile" class="p-2 bg-primary text-egg-100">Back to Profile</a>
    </div>
  </form>
</div>
