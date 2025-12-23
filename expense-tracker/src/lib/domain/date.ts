export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function monthKeyFromISODate(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function daysInMonth(monthKey: string): number {
  const [y, m] = monthKey.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

export function isoDateFromMonthDay(monthKey: string, day: number): string {
  return `${monthKey}-${String(day).padStart(2, "0")}`;
}
