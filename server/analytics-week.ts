// Canonical week data — given a year + ISO week number, returns the canonical
// month (the month containing the Thursday of that week, ISO-8601 rule) and a
// human label.

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function dateOfIsoWeek(year: number, weekNumber: number): Date {
  // Jan 4 is always in ISO week 1
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const week1Monday = new Date(jan4);
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1);
  const target = new Date(week1Monday);
  target.setUTCDate(week1Monday.getUTCDate() + (weekNumber - 1) * 7);
  return target;
}

export function getCanonicalWeekData(year: number, weekNumber: number) {
  const monday = dateOfIsoWeek(year, weekNumber);
  const thursday = new Date(monday);
  thursday.setUTCDate(monday.getUTCDate() + 3);
  const month = thursday.getUTCMonth() + 1;
  const monthName = MONTH_NAMES[thursday.getUTCMonth()];
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmt = (d: Date) => `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
  return {
    month,
    monthName,
    weekLabel: `${monthName} W${weekNumber} (${fmt(monday)}–${fmt(sunday)})`,
  };
}
