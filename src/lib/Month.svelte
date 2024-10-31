<script lang="ts">
  import Day from './Day.svelte';
  import { StartOfWeek } from './startOfWeek';
  import { Solar } from 'lunar-javascript';

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

  let dates: Array<null | {
    year: number;
    month: number;
    day: number;
    chineseYear: number;
    chineseMonth: number;
    chineseDay: number;
    chineseYearString: string;
    chineseMonthString: string;
    chineseDayString: string;
    isPublicHoliday: boolean;
    isWeekend: boolean;
  }> = [];

  let startOfWeekOffsetMap: Record<StartOfWeek, number> = {
    [StartOfWeek.Saturday]:
      yearMonthDate.getDay() + 1 > 6 ? 0 : yearMonthDate.getDay() + 1,
    [StartOfWeek.Sunday]: yearMonthDate.getDay(),
    [StartOfWeek.Monday]:
      yearMonthDate.getDay() - 1 < 0 ? 6 : yearMonthDate.getDay() - 1,
  };
  let startOfWeekOffset = startOfWeekOffsetMap[startOfWeek];
  for (let i = 0; i < startOfWeekOffset; i++) {
    dates.push(null);
  }
  for (let i = 0; i < maxDateOfMonth; i++) {
    let solar = Solar.fromYmd(year, month, i + 1);
    let lunar = solar.getLunar();
    dates.push({
      year,
      month,
      day: i + 1,
      chineseYear: lunar.getYear(),
      chineseMonth: lunar.getMonth(),
      chineseDay: lunar.getDay(),
      chineseYearString: lunar.getYearInChinese(),
      chineseMonthString: lunar.getMonthInChinese(),
      chineseDayString: lunar.getDayInChinese(),
      isPublicHoliday: isPublicHoliday(year, month, i + 1),
      isWeekend: [0, 6].includes(new Date(year, month - 1, i + 1).getDay()),
    });
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

  function isPublicHoliday(year: number, month: number, day: number): boolean {
    return (
      publicHolidays.length > 0 &&
      publicHolidays.some(
        (publicHoliday) =>
          publicHoliday.startDate.getDate() === day &&
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
    {#if date !== null}
      <Day
        day={date.day}
        month={date.month}
        year={date.year}
        chineseYear={date.chineseYear}
        chineseMonth={date.chineseMonth}
        chineseDay={date.chineseDay}
        chineseYearString={date.chineseYearString}
        chineseMonthString={date.chineseMonthString}
        chineseDayString={date.chineseDayString}
        isPublicHoliday={date.isPublicHoliday}
        isWeekend={date.isWeekend}
      />
    {:else}
      <div class="placeholderDay"></div>
    {/if}
  {/each}
</div>

<style>
  .month {
    margin-top: 5px;
    margin-left: 20px;
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-column: calc((var(--month-column) - 1) * 7 + 1) / span 7;
    grid-row: calc((var(--month-row) - 1) * 8 + 1) / span 8;
  }
  .monthName {
    grid-row: 1 / span 1;
    grid-column: 1 / span 7;
    font-size: 16px;
  }
  .dayOfWeek {
    font-size: 10px;
  }
</style>
