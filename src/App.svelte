<script lang="ts">
  import InfoButton from "./components/InfoButton.svelte";
  import type { ChangeEventHandler, MouseEventHandler } from "svelte/elements";
  import { hasOwnProperty, lookupItemDescription } from "./lib/helpers";
  import containers from "./data/items/containers.json";
  import { ShoppingCart } from "./components/ShoppingCart";
  import CartBadge from "./components/CartBadge.svelte";

  const items: { containers: Array<Container> } = {
    containers,
  };
  const quantityState: Record<string, number> = {};
  const cart = new ShoppingCart();

  const quantityHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.currentTarget.name;
    const newQuantity = e.currentTarget.valueAsNumber;
    quantityState[key] = newQuantity;
    console.log(quantityState);
  };

  const addHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      const key = e.currentTarget.value;
      const quantity = quantityState?.[key];
      if (typeof quantity === "undefined" || quantity <= 0) {
        throw new Error("Please select a quantity more than 0");
      }
      const [tableKey, indexString] = key.split("-");
      const index = Number(indexString);
      if (hasOwnProperty(items, tableKey) && !Number.isNaN(index)) {
        const table = items[tableKey];
        if (!Array.isArray(table)) throw new Error("unable to find table");
        const newItem = table[index];
        console.log({ table, newItem });
        if (newItem) cart.addItem(key, quantity, newItem.cost);
        const cartContents = cart.getCart();
        const cartTotal = cart.getTotal();
        console.log("cart", cartContents, cartTotal);
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
  <CartBadge />
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
          ><td>{container.weight}</td><td
            ><input
              name={`containers-${index}`}
              type="number"
              on:change={quantityHandler}
            /></td
          ><td
            ><button on:click={addHandler} value={`containers-${index}`}
              >+</button
            ></td
          ><td
            ><InfoButton
              value={`containers-${index}`}
              itemName={container.name}
              handleClick={handleInfo}
            /></td
          ><td /></tr
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
