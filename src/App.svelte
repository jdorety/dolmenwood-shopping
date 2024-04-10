<script lang="ts">
  import InfoButton from "./components/InfoButton.svelte";
  import type { MouseEventHandler } from "svelte/elements";
  import { lookupItemDescription } from "./lib/helpers";
  import { containers } from "./data/tables";

  const items: { containers: Array<Container> } & Record<string, unknown> = {
    containers,
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
      ><tr><td>Item</td><td>Cost</td><td>Capacity</td><td>Weight</td></tr
      ></thead
    >
    <tbody
      >{#each containers as container, index}
        <tr
          ><td>{container.name}</td><td>{container.cost}</td><td
            >{container.capacity}</td
          ><td>{container.weight}</td><td
            ><InfoButton
              value={`containers-${index}`}
              itemName={container.name}
              handleClick={handleInfo}
            /></td
          ></tr
        >{/each}</tbody
    >
  </table>
</main>

<style>
  td {
    text-align: left;
  }
</style>
