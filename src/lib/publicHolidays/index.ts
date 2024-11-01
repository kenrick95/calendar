import { Country } from '../country';

export async function getPublicHolidays(
  country: Country,
  year: number
): Promise<
  {
    name: string;
    startDate: Date;
    endDate: Date;
  }[]
> {
  try {
    const text = await fetchIcal(country);
    const jCalData = ICAL.parse(text);
    const comp = new ICAL.Component(jCalData);

    const events = comp
      .getAllSubcomponents('vevent')
      .map((vevent) => {
        const event = new ICAL.Event(vevent);
        return {
          name: event.summary,
          startDate: event.startDate.toJSDate(),
          endDate: event.endDate.toJSDate(),
        };
      })
      .filter((event) => event.startDate.getFullYear() === year)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    console.log('events', country, year, jCalData, events);
    return events;
  } catch (e) {
    console.error(`Data not available for year ${year}: `, e);
    return [];
  }
}

import ICAL from 'ical.js';

async function fetchIcal(country: Country): Promise<string> {
  switch (country) {
    case Country.Singapore:
      return (await import(`./data/officeholidays.com/singapore.ics?raw`))
        .default;
    case Country.Indonesia:
      return (await import(`./data/officeholidays.com/indonesia.ics?raw`))
        .default;
    case Country.Japan:
      return (await import(`./data/officeholidays.com/japan.ics?raw`)).default;
    case Country.Malaysia:
      return (await import(`./data/officeholidays.com/malaysia.ics?raw`))
        .default;
  }
  return (await import(`./data/officeholidays.com/singapore.ics?raw`)).default;
}
