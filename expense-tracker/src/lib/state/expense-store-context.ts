import { getContext, setContext } from "svelte";
import type { ExpenseStore } from "./expense-store.svelte";

const KEY = Symbol("expense-store");

export function setExpenseStore(store: ExpenseStore) {
  setContext(KEY, store);
}

export function getExpenseStore(): ExpenseStore {
  return getContext(KEY);
}
