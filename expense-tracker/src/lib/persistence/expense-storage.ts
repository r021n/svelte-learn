import type { Category, Expense } from '$lib/domain/types';

export const STORAGE_KEY = 'expense-tracker:v1';
const VERSION = 1 as const;

export type PersistedV1 = {
	version: typeof VERSION;
	categories: Category[];
	expenses: Expense[];
};

function safeParseJSON(value: string): unknown {
	try {
		return JSON.parse(value);
	} catch (error) {
		return null;
	}
}

export function loadPersisted(): PersistedV1 | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;

		const parsed = safeParseJSON(raw) as any;
		if (!parsed && parsed.version !== VERSION) return null;

		if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.expenses)) return null;

		return {
			version: VERSION,
			categories: parsed.categories,
			expenses: parsed.expenses
		};
	} catch {
		return null;
	}
}

export function savePersisted(data: PersistedV1): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
}
