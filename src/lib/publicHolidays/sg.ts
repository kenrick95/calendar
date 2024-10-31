import ICAL from 'ical.js';

async function fetchIcal(year: number): Promise<string> {
  return (await import(`./data/${year}.ics?raw`)).default;
}
export async function getPublicHolidays(year: number): Promise<
  {
    name: string;
    startDate: Date;
    endDate: Date;
  }[]
> {
  try {
    const text = await fetchIcal(year);
    const jCalData = ICAL.parse(text);
    const comp = new ICAL.Component(jCalData);

    const events = comp.getAllSubcomponents('vevent').map((vevent) => {
      const event = new ICAL.Event(vevent);
      return {
        name: event.summary,
        startDate: event.startDate.toJSDate(),
        endDate: event.endDate.toJSDate(),
      };
    });

    return events;
  } catch (e) {
    console.error(`Data not available for year ${year}: `, e);
    return [];
  }
}
