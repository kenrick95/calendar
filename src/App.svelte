<script lang="ts">
  import { Country } from './lib/country';
  import { StartOfWeek } from './lib/startOfWeek';
  import Year from './lib/Year.svelte';

  let country = $state(Country.Singapore);
  let year = $state(2024);
  let startOfWeek = $state(StartOfWeek.Monday);
</script>

<aside class="controls">
  <form action="#" class="form">
    <label for="country"> Country: </label>
    <select id="country" bind:value={country}>
      {#each Object.values(Country) as countryOption}
        <option value={countryOption}>{countryOption}</option>
      {/each}
    </select>
    <label for="year"> Year: </label>
    <input
      id="year"
      type="number"
      inputmode="numeric"
      pattern="\d*"
      step="1"
      bind:value={year}
    />
    <label for="startOfWeek"> Start of Week: </label>
    <select id="startOfWeek" bind:value={startOfWeek}>
      {#each Object.values(StartOfWeek) as startOfWeekOption}
        <option value={startOfWeekOption}>{startOfWeekOption}</option>
      {/each}
    </select>
  </form>
</aside>
<main>
  <Year {year} {startOfWeek} {country} />
</main>

<style>
  main {
    max-width: 600px;
    margin: 5px auto;
    text-align: center;
  }
  .controls {
    position: fixed;
    top: 0;
    right: 0;
    padding: 10px;
    background-color: Canvas;
    z-index: 1;
  }
  .form {
    display: grid;
    gap: 5px;
    grid-template-columns: 120px auto;
  }
  #year {
    width: 4em;
  }

  @media print {
    .controls {
      display: none !important;
    }
  }
</style>
