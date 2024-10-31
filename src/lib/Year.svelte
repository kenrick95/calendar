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

<h2 class="year">{year}</h2>
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
  .year {
    margin: 0;
  }
  .months {
    display: grid;
    grid-template-columns: [mc1] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [mc2] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [mc3] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [mc4];
    gap: 2px;
    margin-left: -2rem;
  }
</style>
