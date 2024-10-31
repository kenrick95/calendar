<script lang="ts">
  let {
    year,
    month,
    day,
    chineseDay,
    chineseMonthString,
    chineseDayString,
    isPublicHoliday,
    isWeekend,
  }: {
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
  } = $props();
</script>

<div class="day">
  <div
    class="date {isPublicHoliday ? 'publicHoliday' : ''} {isWeekend
      ? 'weekend'
      : ''}"
  >
    {day}
  </div>
  <div class="chinese">
    {#if chineseDay === 1}
      {chineseMonthString}月
    {:else if chineseDay === 15}
      {chineseDayString}
    {/if}
  </div>
</div>

<style>
  .day {
    display: flex;
    align-items: start;
    justify-content: center;
    height: 26px;
    position: relative;
  }
  .date {
    font-size: 14px;
    line-height: 18px;
    text-align: center;
  }
  .publicHoliday {
    color: var(--red);
  }
  .weekend {
    color: var(--red);
  }
  .chinese {
    font-size: 9px;
    line-height: 10px;
    white-space: nowrap;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    text-align: center;
  }
</style>
