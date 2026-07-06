// Get YYYY-MM-DD key from ISO string for grouping
export function getDayKey(isoOrLegacy: string): string {
  const date = new Date(isoOrLegacy);
  if (isNaN(date.getTime())) return 'legacy';
  return date.toISOString().slice(0, 10);
}

// Get the Monday of the week for a given ISO or legacy date string
export function getStartOfWeekDate(isoOrLegacy: string): Date {
  const date = new Date(isoOrLegacy);
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
  return monday.toISOString().slice(0, 10);
}
