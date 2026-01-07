<script lang="ts">
	import './layout.css';
	import { ExpenseStore } from '$lib/state/expense-store.svelte';
	import { setExpenseStore } from '$lib/state/expense-store-context';
	import { attachExpenseStoreLocalStorage } from '$lib/persistence/expense-store-localstorage.svelte';

	let { children } = $props();

	const store = new ExpenseStore();
	setExpenseStore(store);

	attachExpenseStoreLocalStorage(store);
</script>

<nav class="flex gap-4 p-4">
	<a href="/">Dashboard</a>
	<a href="/expenses/new">Add Expense</a>
	<a href="/categories">Categories</a>
</nav>

<main class="p-4">
	{#if store.hydrated}
		{@render children()}
	{:else}
		<p class="text-sm text-muted-foreground">Loading saved data...</p>
	{/if}
</main>
