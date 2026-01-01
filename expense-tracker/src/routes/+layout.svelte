<script lang="ts">
	import './layout.css';
	import { ExpenseStore } from "$lib/state/expense-store.svelte"
	import { setExpenseStore } from "$lib/state/expense-store-context";

	let { children } = $props();

	const store = new ExpenseStore();
	setExpenseStore(store);
</script>

<nav class="p-4 flex gap-4">
	<a href="/">Dashboard</a>
	<a href="/expenses/new">Add Expense</a>
	<a href="/categories">Categories</a>
</nav>

<main class="p-4">{@render children()}</main>
