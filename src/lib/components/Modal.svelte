<script>
  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <header class="flex justify-between gap-4 items-center font-bold p-4">
      <slot name="header" />
      <button
        class="w-8 aspect-square hover:bg-gray-200 flex items-center justify-center rounded-md"
        autofocus
        on:click={() => dialog.close()}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="16"
          viewBox="0 0 384 512"
          ><path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          /></svg
        ></button
      >
    </header>
    <hr />
    <div class="main">
      <slot />
      <hr />
      <div class="hover:bg-gray-200 p-4 block w-full text-left">
        Add to Journal (TODO)
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog {
    max-width: 97vw;
    border-radius: 0.2em;
    width: 400px;
    max-height: 80vh;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
