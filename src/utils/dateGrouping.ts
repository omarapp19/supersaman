// Date-only strings (YYYY-MM-DD), like the ones produced by <input type="date">, are parsed
// as UTC midnight by `new Date()`. In timezones behind UTC this can shift the calendar day
// backwards, pushing an order into the wrong day/week bucket. Parse these explicitly as local
// time so grouping matches what the user actually typed.
export function parseLocalDate(isoOrLegacy: string): Date {
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoOrLegacy);
  if (dateOnlyMatch) {
    const [, y, m, d] = dateOnlyMatch;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  return new Date(isoOrLegacy);
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get YYYY-MM-DD key from ISO string for grouping
export function getDayKey(isoOrLegacy: string): string {
  const date = parseLocalDate(isoOrLegacy);
  if (isNaN(date.getTime())) return 'legacy';
  return toLocalDateKey(date);
}

// Get the Monday of the week for a given ISO or legacy date string
export function getStartOfWeekDate(isoOrLegacy: string): Date {
  const date = parseLocalDate(isoOrLegacy);
  if (isNaN(date.getTime())) return new Date();

  const day = date.getDay(); // 0 is Sunday, 6 is Saturday
  // Adjust to make Monday index 0:
  // If Sunday (0), subtract 6 days. Otherwise, subtract (day - 1) days.
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Generate a human-readable week label
export function formatWeekLabel(isoOrLegacy: string): string {
  const monday = getStartOfWeekDate(isoOrLegacy);
  const label = monday.toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return "Semana del " + label;
}

// Get week key (YYYY-MM-DD representing the Monday)
export function getWeekKey(isoOrLegacy: string): string {
  const monday = getStartOfWeekDate(isoOrLegacy);
  return toLocalDateKey(monday);
}
