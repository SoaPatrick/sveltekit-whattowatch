<script lang="ts">
  export let index;
  export let openModal;
</script>

<button on:click={() => openModal(index)}>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 16V11H11.5M11.5 16H12.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle r="1" transform="matrix(1 0 0 -1 12 8)" fill="currentColor" />
  </svg>
</button>
