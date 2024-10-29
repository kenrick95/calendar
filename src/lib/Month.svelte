<script lang="ts">
  import Day from './Day.svelte';

  let { month, year }: { year: number; month: number } = $props();

  function pad(number: number): string {
    return number < 10 ? `0${String(number)}` : String(number);
  }
  function getMaxDateOfMonth(date: Date): number {
    let nextMonth =
      date.getMonth() === 11
        ? `${date.getFullYear() + 1}-01`
        : `${date.getFullYear()}-${pad(date.getMonth() + 2)}`;
    let nextMonthDate = new Date(nextMonth);
    let lastMonthDate = new Date(nextMonthDate.getTime() - 24 * 3600 * 1000);
    return lastMonthDate.getDate();
  }

  let yearMonth = `${year}-${pad(month)}`;
  let yearMonthDate = new Date(yearMonth);
  let maxDateOfMonth = getMaxDateOfMonth(yearMonthDate);

  let dates: number[] = [];
  for (let i = 0; i < yearMonthDate.getDay(); i++) {
    dates.push(0);
  }
  for (let i = 0; i < maxDateOfMonth; i++) {
    dates.push(i + 1);
  }
</script>

<!-- TODO: month name -->
<!-- TODO: dayofweek names -->
<!-- TODO: moon phases -->
<div class="dates">
  {#each dates as date}
    <div class="date">
      {#if date > 0}
        <Day day={date} {month} {year} />
      {:else}
        &nbsp;
      {/if}
    </div>
  {/each}
</div>

<style>
  .dates {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 2px;
  }
</style>
