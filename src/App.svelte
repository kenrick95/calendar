<script lang="ts">
  import { StartOfWeek } from './lib/startOfWeek';
  import Year from './lib/Year.svelte';
</script>

<main>
  <Year year={2025} startOfWeek={StartOfWeek.Monday} />
</main>

<style>
  main {
    max-width: 800px;
    margin: 5px auto;
    text-align: center;
  }
</style>
