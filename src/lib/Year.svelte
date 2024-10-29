<script lang="ts">
  import Month from './Month.svelte';
  let { year }: { year: number } = $props();

  let months: number[] = [];
  for (let i = 0; i < 12; i++) {
    months.push(i + 1);
  }
</script>

<h2>
  <div class="prev"></div>
  {year}
  <div class="next"></div>
</h2>
<div class="months">
  {#each months as month}
    <Month {month} {year} />
  {/each}
</div>
<!-- TODO: public holidays -->

<style>
  .months {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-gap: 1.6rem;
  }
</style>
