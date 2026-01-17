import type { Category, CategoryDraft, Expense, ExpenseDraft } from '$lib/domain/types';
import {
	addMonths,
	daysInMonth,
	eachDayISO,
	monthEndISO,
	monthKeyFromISODate,
	monthStartISO,
	todayISO
} from '$lib/domain/date';

function uid(): string {
	return crypto.randomUUID();
}

function defaultCategories(): Category[] {
	return [
		{ id: uid(), name: 'Makan', color: '#f97316' },
		{ id: uid(), name: 'Transport', color: '#3b82f6' },
		{ id: uid(), name: 'Belanja', color: '#a855f7' },
		{ id: uid(), name: 'Tagihan', color: '#ef4444' },
		{ id: uid(), name: 'Hiburan', color: '#22c55e' },
		{ id: uid(), name: 'Lainnya', color: '#64748b' }
	];
}

export class ExpenseStore {
	hydrated = $state(false);

	expenses = $state<Expense[]>([]);
	categories = $state<Category[]>(defaultCategories());

	// FILTER
	filterMode = $state<'month' | 'range'>('month');

	activeMonth = $state(monthKeyFromISODate(todayISO()));

	rangeFrom = $state(monthStartISO(this.activeMonth));
	rangeTo = $state(monthEndISO(this.activeMonth));

	categoryFilterId = $state<string | null>(null);
	searchQuery = $state('');
	sortMode = $state<'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'>('date_asc');

	// DERIVED HELPERS
	categoriesById = $derived(
		Object.fromEntries(this.categories.map((c) => [c.id, c] as const)) as Record<string, Category>
	);

	effectiveFrom = $derived.by(() => {
		if (this.filterMode === 'month') return monthStartISO(this.activeMonth);
		if (!this.rangeFrom) return '0000-01-01';
		if (this.rangeTo) return this.rangeFrom;

		return this.rangeFrom <= this.rangeTo ? this.rangeFrom : this.rangeTo;
	});

	effectiveTo = $derived.by(() => {
		if (this.filterMode === 'month') return monthEndISO(this.activeMonth);
		if (!this.rangeTo) return '9999-12-31';
		if (!this.rangeFrom) return this.rangeTo;

		return this.rangeFrom <= this.rangeTo ? this.rangeTo : this.rangeFrom;
	});

	filteredExpenses = $derived.by(() => {
		const q = this.searchQuery.trim().toLowerCase();
		const from = this.effectiveFrom;
		const to = this.effectiveTo;

		let list = this.expenses.filter((e) => {
			if (e.date < from || e.date > to) return false;
			if (this.categoryFilterId && e.categoryId !== this.categoryFilterId) return false;
			if (q) {
				const note = (e.note ?? '').toLowerCase();
				if (!note.includes(q)) return false;
			}

			return true;
		});

		switch (this.sortMode) {
			case 'date_asc':
				list.sort((a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt);
				break;
			case 'amount_desc':
				list.sort((a, b) => b.amount - a.amount);
				break;
			case 'amount_asc':
				list.sort((a, b) => a.amount - b.amount);
				break;
			default:
				list.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
		}

		return list;
	});

	totalFiltered = $derived(this.filteredExpenses.reduce((sum, e) => sum + e.amount, 0));

	totalByCategoryFiltered = $derived.by(() => {
		const totals: Record<string, number> = {};
		for (const e of this.filteredExpenses) {
			totals[e.categoryId] = totals[e.categoryId ?? 0] + e.amount;
		}

		return Object.entries(totals)
			.map(([categoryId, total]) => ({
				categoryId,
				total,
				category: this.categoriesById[categoryId]
			}))
			.sort((a, b) => b.total - a.total);
	});

	dailyTotalsFiltered = $derived.by(() => {
		const from = this.effectiveFrom;
		const to = this.effectiveTo;

		const byDate: Record<string, number> = {};
		for (const e of this.filteredExpenses) {
			byDate[e.date] = (byDate[e.date] ?? 0) + e.amount;
		}

		return eachDayISO(from, to).map((date) => ({ date, total: byDate[date] ?? 0 }));
	});

	// ACTION FOR FILTER

	setActiveMonth(monthKey: string) {
		this.activeMonth = monthKey;

		this.rangeFrom = monthStartISO(monthKey);
		this.rangeTo = monthEndISO(monthKey);
	}

	prevMonth() {
		this.setActiveMonth(addMonths(this.activeMonth, -1));
	}

	nextMonth() {
		this.setActiveMonth(addMonths(this.activeMonth, +1));
	}

	resetFilters() {
		this.filterMode = 'month';
		this.categoryFilterId = null;
		this.searchQuery = '';
		this.sortMode = 'date_desc';
		this.setActiveMonth(monthKeyFromISODate(todayISO()));
	}

	// expensesInActiveMonth = $derived.by(() => {
	// 	const filtered = this.expenses.filter((e) => e.date.startsWith(this.activeMonth));
	// 	return filtered.sort((a, b) => b.createdAt - a.createdAt);
	// });

	// totalActiveMonth = $derived(this.expensesInActiveMonth.reduce((sum, e) => sum + e.amount, 0));

	// totalByCategoryActiveMonth = $derived.by(() => {
	// 	const totals: Record<string, number> = {};

	// 	for (const e of this.expensesInActiveMonth) {
	// 		totals[e.categoryId] = (totals[e.categoryId] ?? 0) + e.amount;
	// 	}

	// 	return Object.entries(totals)
	// 		.map(([categoryId, total]) => ({
	// 			categoryId,
	// 			total,
	// 			category: this.categoriesById[categoryId]
	// 		}))
	// 		.sort((a, b) => b.total - a.total);
	// });

	// dailyTotalsActiveMonth = $derived.by(() => {
	// 	const days = daysInMonth(this.activeMonth);
	// 	const byDate: Record<string, number> = {};

	// 	for (const e of this.expensesInActiveMonth) {
	// 		byDate[e.date] = (byDate[e.date] ?? 0) + e.amount;
	// 	}

	// 	return Array.from({ length: days }, (_, i) => {
	// 		const date = isoDateFromMonthDay(this.activeMonth, i + 1);
	// 		return { date, total: byDate[date] ?? 0 };
	// 	});
	// });

	// monthlyTotals = $derived.by(() => {
	// 	const totals: Record<string, number> = {};
	// 	for (const e of this.expenses) {
	// 		const monthKey = monthKeyFromISODate(e.date);
	// 		totals[monthKey] = (totals[monthKey] ?? 0) + e.amount;
	// 	}
	// 	return Object.entries(totals)
	// 		.map(([month, total]) => ({ month, total }))
	// 		.sort((a, b) => a.month.localeCompare(b.month));
	// });

	// --- hydration helper ---
	hydrate(data: { expenses: Expense[]; categories: Category[] }) {
		this.expenses = Array.isArray(data.expenses) ? data.expenses : [];
		this.categories =
			Array.isArray(data.categories) && data.categories.length > 0
				? data.categories
				: defaultCategories();
	}

	// ---- domain actions (CRUD) ----

	addExpense(draft: ExpenseDraft) {
		const now = Date.now();
		const expense: Expense = {
			...draft,
			id: uid(),
			createdAt: now,
			updatedAt: now
		};

		this.expenses = [expense, ...this.expenses];
	}

	updateExpense(id: string, patch: Partial<ExpenseDraft>) {
		const now = Date.now();
		this.expenses = this.expenses.map((e) =>
			e.id === id ? { ...e, ...patch, updatedAt: now } : e
		);
	}

	deleteExpense(id: string) {
		this.expenses = this.expenses.filter((e) => e.id !== id);
	}

	addCategory(draft: CategoryDraft) {
		const category: Category = { id: uid(), ...draft };
		this.categories = [...this.categories, category];
	}

	renameCategory(id: string, name: string) {
		this.categories = this.categories.map((c) => (c.id === id ? { ...c, name } : c));
	}

	deleteCategory(id: string) {
		const stillUsed = this.expenses.some((e) => e.categoryId === id);
		if (stillUsed) return;

		this.categories = this.categories.filter((c) => c.id !== id);
	}
}
