export function todayISO(): string {
	const d = new Date();
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}`;
}

export function monthKeyFromISODate(isoDate: string): string {
	return isoDate.slice(0, 7);
}

export function daysInMonth(monthKey: string): number {
	const [y, m] = monthKey.split('-').map(Number);
	return new Date(y, m, 0).getDate();
}

export function monthStartISO(monthKey: string): string {
	return `${monthKey}-1`;
}

export function monthEndISO(monthKey: string): string {
	return `${monthKey}-${String(daysInMonth(monthKey)).padStart(2, '0')}`;
}

export function addMonths(monthKey: string, delta: number): string {
	const [y, m] = monthKey.split('-').map(Number);
	const d = new Date(y, m - 1 + delta, 1);
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	return `${yyyy}-${mm}`;
}

function parseISODateLocal(iso: string): Date {
	const [y, m, d] = iso.split('-').map(Number);
	return new Date(y, m - 1, d);
}

function formatISODateLocal(d: Date): string {
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');
	return `${yyyy}-${mm}-${dd}`;
}

export function eachDayISO(fromISO: string, toISO: string): string[] {
	const start = parseISODateLocal(fromISO);
	const end = parseISODateLocal(toISO);
	const out: string[] = [];

	for (
		let cur = start;
		cur <= end;
		cur = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1)
	) {
		out.push(formatISODateLocal(cur));
	}

	return out;
}

// === Old ===
export function isoDateFromMonthDay(monthKey: string, day: number): string {
	return `${monthKey}-${String(day).padStart(2, '0')}`;
}
