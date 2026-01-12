<script lang="ts">
	import { goto } from '$app/navigation';
	import { getExpenseStore } from '$lib/state/expense-store-context';
	import type { ExpenseDraft } from '$lib/domain/types';

	import * as Card from '$lib/components/ui/card/index';
	import ExpenseForm from '$lib/components/expenses/ExpenseForm.svelte';

	const store = getExpenseStore();

	function onCreate(draft: ExpenseDraft) {
		store.addExpense(draft);
		goto('/');
	}
</script>

<Card.Root class="max-w-xl">
	<Card.Header>
		<Card.Title>Tambah Pengeluaran</Card.Title>
		<Card.Description
			>Catat pengeluaranmu dan biarkan total dihitung secara otomatis</Card.Description
		>
	</Card.Header>

	<Card.Content>
		<ExpenseForm onSubmit={onCreate} submitLabel="Tambah" />
	</Card.Content>
</Card.Root>
