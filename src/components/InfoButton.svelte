<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import info from "../assets/info.svg";
  export let value: string;
  export let itemName: string;
  export let handleClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button class="info-button" on:click={handleClick} {value}>
  <img
    src={info}
    alt={`Additional information button for ${itemName}`}
    class="info-graphic"
  />
</button>

<style>
  .info-button {
    box-sizing: border-box;
    padding: 0;
    border-radius: 100%;
  }

  .info-graphic {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
  }
</style>
