<script lang="ts">
  let { day }: { year: number; month: number; day: number } = $props();
</script>

<div class="day">
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
</style>
