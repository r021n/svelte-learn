export type Category = {
  id: string;
  name: string;
  color?: string;
  icon?: string;
};

export type Expense = {
  id: string;
  date: string;
  amount: number;
  categoryId: string;
  note?: string;
  createdAt: number;
  updatedAt: number;
};

export type ExpenseDraft = Omit<Expense, "id" | "createdAt" | "updatedAt">;
export type CategoryDraft = Omit<Category, "id">;
