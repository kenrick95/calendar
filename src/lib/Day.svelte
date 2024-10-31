<script lang="ts">
  let {
    year,
    month,
    day,
    isPublicHoliday,
  }: { year: number; month: number; day: number; isPublicHoliday: boolean } =
    $props();

  let isWeekend =
    new Date(year, month - 1, day).getDay() === 0 ||
    new Date(year, month - 1, day).getDay() === 6;
</script>

<div
  class="day {isPublicHoliday ? 'publicHoliday' : ''} {isWeekend
    ? 'weekend'
    : ''}"
>
  {day}
</div>

<style>
  .day {
    text-align: center;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1rem;
  }
  .publicHoliday {
    color: var(--red);
  }
  .weekend {
    color: var(--red);
  }
</style>
