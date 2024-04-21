<script lang="ts">
  import InfoButton from "./components/InfoButton.svelte";
  import type { MouseEventHandler } from "svelte/elements";
  import { hasOwnProperty, lookupItemDescription } from "./lib/helpers";
  import { containers } from "./data/tables";
  import { ShoppingCart } from "./components/ShoppingCart";

  const items: { containers: Array<Container> } = {
    containers,
  };
  const cart = new ShoppingCart();

  const addHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      const [key, indexString] = e.currentTarget.value.split("-");
      const index = Number(indexString);
      console.log({ key, indexString, index });
      if (hasOwnProperty(items, key) && !Number.isNaN(index)) {
        const table = items[key];
        if (!Array.isArray(table)) throw new Error("unable to find table");
        const newItem = table[index];
        console.log({table, newItem})
        if (newItem) cart.addItem(newItem, 1);
        const cartTotal = cart.getCart();
        console.log("cart", cartTotal);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInfo: MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      const value = e.currentTarget.value;
      const [table, indexString] = value.split("-");
      if (typeof table === "string" && indexString) {
        const index = Number(indexString);
        if (Number.isNaN(index)) throw new Error("No index available");
        const item = lookupItemDescription(items, table, index);
        alert(item);
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
</script>

<main>
  <table>
    <thead
      ><tr
        ><td>Item</td><td>Cost (GP)</td><td>Capacity</td><td>Weight</td><td
          >Quantity</td
        ></tr
      ></thead
    >
    <tbody
      >{#each containers as container, index}
        <tr
          ><td>{container.name}</td><td>{container.cost}</td><td
            >{container.capacity}</td
          ><td>{container.weight}</td><td><input type="number" /></td><td
            ><button on:click={addHandler} value={`containers-${index}`}
              >+</button
            ></td
          ><td
            ><InfoButton
              value={`containers-${index}`}
              itemName={container.name}
              handleClick={handleInfo}
            /></td
          ><td></td></tr
        >{/each}</tbody
    >
  </table>
</main>

<style>
  td {
    text-align: left;
    padding-right: 1rem;
  }
  td input {
    max-width: 2rem;
  }
</style>
