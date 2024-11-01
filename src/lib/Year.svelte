<script lang="ts">
  import { onMount } from 'svelte';
  import Month from './Month.svelte';
  import type { StartOfWeek } from './startOfWeek';
  import { Country } from './country';
  import { getPublicHolidays } from './publicHolidays';
  let {
    year,
    startOfWeek,
    country,
  }: { year: number; startOfWeek: StartOfWeek; country: Country } = $props();

  let months: number[] = $derived.by(() => {
    let months: number[] = [];
    for (let i = 0; i < 12; i++) {
      months.push(i + 1);
    }
    return months;
  });

  let publicHolidays: {
    name: string;
    startDate: Date;
    endDate: Date;
  }[] = $state([]);
  $effect(() => {
    // https://github.com/sveltejs/svelte/issues/9520#issuecomment-2185526192
    void (async () => {
      publicHolidays = await getPublicHolidays(country, year);
    })();
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
<div class="ph">
  <h3 class="phHeader">Public Holidays</h3>
  <ul class="list">
    {#each publicHolidays as publicHoliday}
      <li class="listItem">
        <div class="listDate">
          {publicHoliday.startDate.toLocaleString('en-SG', {
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div class="listName">{publicHoliday.name}</div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .year {
    margin: 0;
    font-size: 24px;
    line-height: 24px;
  }
  .months {
    display: grid;
    grid-template-columns: [mc1] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [mc2] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [mc3] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [mc4];
    gap: 2px;
    margin-left: -20px;
  }
  .ph {
    margin-top: 10px;
  }
  .phHeader {
    font-size: 16px;
    line-height: 18px;
    margin: 0;
  }
  .list {
    list-style-type: none;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    column-count: 3;
    column-gap: 20px;
    text-align: start;
    font-size: 12px;
  }
  .listItem {
    display: flex;
  }
  .listDate {
    flex: 0 0 45px;
    color: var(--red);
  }
  .listName {
    flex: 0 1 auto;
  }
</style>
