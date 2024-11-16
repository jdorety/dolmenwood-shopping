<script lang="ts">
  import cart from "../assets/cart.svg";
  export let num: number | undefined = undefined;
</script>

<div class="badge-container">
  <img src={cart} alt="an icon depicting a shopping cart" />
  {#if num}<span class="badge-pip">{num}</span>{/if}
</div>

<style>
  img {
    width: 2rem;
    height: 2rem;
  }
  .badge-container {
    position: static;
  }
  .badge-pip {
    color: lime;
  }
</style>
