<script lang="ts">
  import { onMount } from 'svelte';
  import Month from './Month.svelte';
  import { getPublicHolidays } from './publicHolidays/sg';
  import type { StartOfWeek } from './startOfWeek';
  let { year, startOfWeek }: { year: number; startOfWeek: StartOfWeek } =
    $props();

  let months: number[] = [];
  for (let i = 0; i < 12; i++) {
    months.push(i + 1);
  }

  let publicHolidays: {
    name: string;
    startDate: Date;
    endDate: Date;
  }[] = $state([]);
  onMount(async () => {
    publicHolidays = await getPublicHolidays(year);
  });

  function monthFilter(month: number) {
    return (publicHoliday: {
      name: string;
      startDate: Date;
      endDate: Date;
    }) => {
      return publicHoliday.startDate.getMonth() === month - 1;
    };
  }
</script>

<h2>
  <div class="prev"></div>
  {year}
  <div class="next"></div>
</h2>
<div class="months">
  {#each months as month}
    <Month
      {month}
      {year}
      {startOfWeek}
      publicHolidays={publicHolidays.filter(monthFilter(month))}
    />
  {/each}
</div>

<style>
  .months {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-gap: 1.6rem;
  }
</style>
