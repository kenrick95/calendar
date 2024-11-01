<script lang="ts">
  import { Country } from './lib/country';
  import { StartOfWeek } from './lib/startOfWeek';
  import Year from './lib/Year.svelte';
</script>

<main>
  <Year
    year={2025}
    startOfWeek={StartOfWeek.Monday}
    country={Country.Singapore}
  />
</main>

<style>
  main {
    max-width: 600px;
    margin: 5px auto;
    text-align: center;
  }
</style>
