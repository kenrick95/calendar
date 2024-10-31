<script lang="ts">
  import Day from './Day.svelte';
  import { StartOfWeek } from './startOfWeek';

  let {
    month,
    year,
    startOfWeek,
    publicHolidays,
  }: {
    year: number;
    month: number;
    startOfWeek: StartOfWeek;
    publicHolidays: {
      name: string;
      startDate: Date;
      endDate: Date;
    }[];
  } = $props();

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

  let startOfWeekOffsetMap: Record<StartOfWeek, number> = {
    [StartOfWeek.Saturday]:
      yearMonthDate.getDay() + 1 > 6 ? 0 : yearMonthDate.getDay() + 1,
    [StartOfWeek.Sunday]: yearMonthDate.getDay(),
    [StartOfWeek.Monday]:
      yearMonthDate.getDay() - 1 < 0 ? 6 : yearMonthDate.getDay() - 1,
  };
  let startOfWeekOffset = startOfWeekOffsetMap[startOfWeek];
  for (let i = 0; i < startOfWeekOffset; i++) {
    dates.push(0);
  }
  for (let i = 0; i < maxDateOfMonth; i++) {
    dates.push(i + 1);
  }

  let dayOfWeeks = [];
  for (let i = 0; i < 7; i++) {
    dayOfWeeks.push(
      new Date(year, month - 1, 8 - startOfWeekOffset + i).toLocaleString(
        'en-US',
        {
          weekday: 'short',
        }
      )
    );
  }

  function isPublicHoliday(date: number, month: number, year: number): boolean {
    return (
      publicHolidays.length > 0 &&
      publicHolidays.some(
        (publicHoliday) =>
          publicHoliday.startDate.getDate() === date &&
          publicHoliday.startDate.getMonth() === month - 1 &&
          publicHoliday.startDate.getFullYear() === year
      )
    );
  }

  let column = ((month - 1) % 3) + 1;
  let row = Math.floor((month - 1) / 3) + 1;
</script>

<div class="month" style="--month-column: {column}; --month-row: {row}">
  <div class="monthName">
    {new Date(year, month - 1).toLocaleString('default', { month: 'long' })}
  </div>

  <!-- day of week names -->
  {#each dayOfWeeks as dayOfWeek}
    <div class="dayOfWeek">{dayOfWeek}</div>
  {/each}

  {#each dates as date}
    {#if date > 0}
      <Day
        day={date}
        {month}
        {year}
        isPublicHoliday={isPublicHoliday(date, month, year)}
      />
    {:else}
      <div class="placeholderDay"></div>
    {/if}
  {/each}
</div>

<style>
  .month {
    margin-top: 1rem;
    margin-left: 1rem;
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-column: calc((var(--month-column) - 1) * 7 + 1) / span 7;
    grid-row: calc((var(--month-row) - 1) * 8 + 1) / span 8;
  }
  .monthName {
    grid-row: 1 / span 1;
    grid-column: 1 / span 7;
    font-size: 1.2em;
  }
  .placeholderDay {
    font-size: 1rem;
    aspect-ratio: 1;
  }
  .dayOfWeek {
    font-size: 0.8rem;
  }
</style>
