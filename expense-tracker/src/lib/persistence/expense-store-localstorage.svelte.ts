import { onMount } from "svelte";
import type { ExpenseStore } from "$lib/state/expense-store.svelte";
import { loadPersisted, savePersisted } from "./expense-storage";

export function attachExpenseStoreLocalStorage(store: ExpenseStore) {
  onMount(() => {
    const data = loadPersisted();
    if (data) {
      store.hydrate({ expenses: data.expenses, categories: data.categories });
    }

    store.hydrated = true;

    const onStorage = (e: StorageEvent) => {
      if (e.key !== "expense-tracker:v1") return;
      const next = loadPersisted();
      if (next)
        store.hydrate({ expenses: next.expenses, categories: next.categories });
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  });

  let t: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    if (!store.hydrated) return;

    const categories = store.categories.map((c) => ({ ...c }));
    const expenses = store.expenses.map((e) => ({ ...e }));

    if (t) clearTimeout(t);
    t = setTimeout(() => {
      savePersisted({ version: 1, categories, expenses });
    }, 150);

    return () => {
      if (t) clearTimeout(t);
    };
  });
}
