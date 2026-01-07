import type {
  Category,
  CategoryDraft,
  Expense,
  ExpenseDraft,
} from "$lib/domain/types";
import {
  daysInMonth,
  isoDateFromMonthDay,
  monthKeyFromISODate,
  todayISO,
} from "$lib/domain/date";

function uid(): string {
  return crypto.randomUUID();
}

function defaultCategories(): Category[] {
  return [
    { id: uid(), name: "Makan", color: "#f97316" },
    { id: uid(), name: "Transport", color: "#3b82f6" },
    { id: uid(), name: "Belanja", color: "#a855f7" },
    { id: uid(), name: "Tagihan", color: "#ef4444" },
    { id: uid(), name: "Hiburan", color: "#22c55e" },
    { id: uid(), name: "Lainnya", color: "#64748b" },
  ];
}

export class ExpenseStore {
  hydrated = $state(false);

  expenses = $state<Expense[]>([]);
  categories = $state<Category[]>(defaultCategories());

  activeMonth = $state(monthKeyFromISODate(todayISO()));

  categoriesById = $derived(
    Object.fromEntries(
      this.categories.map((c) => [c.id, c] as const)
    ) as Record<string, Category>
  );

  expensesInActiveMonth = $derived.by(() => {
    const filtered = this.expenses.filter((e) =>
      e.date.startsWith(this.activeMonth)
    );
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  });

  totalActiveMonth = $derived(
    this.expensesInActiveMonth.reduce((sum, e) => sum + e.amount, 0)
  );

  totalByCategoryActiveMonth = $derived.by(() => {
    const totals: Record<string, number> = {};

    for (const e of this.expensesInActiveMonth) {
      totals[e.categoryId] = (totals[e.categoryId] ?? 0) + e.amount;
    }

    return Object.entries(totals)
      .map(([categoryId, total]) => ({
        categoryId,
        total,
        category: this.categoriesById[categoryId],
      }))
      .sort((a, b) => b.total - a.total);
  });

  dailyTotalsActiveMonth = $derived.by(() => {
    const days = daysInMonth(this.activeMonth);
    const byDate: Record<string, number> = {};

    for (const e of this.expensesInActiveMonth) {
      byDate[e.date] = (byDate[e.date] ?? 0) + e.amount;
    }

    return Array.from({ length: days }, (_, i) => {
      const date = isoDateFromMonthDay(this.activeMonth, i + 1);
      return { date, total: byDate[date] ?? 0 };
    });
  });

  monthlyTotals = $derived.by(() => {
    const totals: Record<string, number> = {};
    for (const e of this.expenses) {
      const monthKey = monthKeyFromISODate(e.date);
      totals[monthKey] = (totals[monthKey] ?? 0) + e.amount;
    }
    return Object.entries(totals)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));
  });

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
      updatedAt: now,
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
    this.categories = this.categories.map((c) =>
      c.id === id ? { ...c, name } : c
    );
  }

  deleteCategory(id: string) {
    const stillUsed = this.expenses.some((e) => e.categoryId === id);
    if (stillUsed) return;

    this.categories = this.categories.filter((c) => c.id !== id);
  }
}
