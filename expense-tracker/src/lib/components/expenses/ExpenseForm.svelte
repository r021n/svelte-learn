<script lang="ts">
	import { getExpenseStore } from '$lib/state/expense-store-context';
	import type { ExpenseDraft } from '$lib/domain/types';
	import { todayISO } from '$lib/domain/date';

	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import * as Select from '$lib/components/ui/select/index';

	const store = getExpenseStore();

	type Props = {
		initial?: Partial<ExpenseDraft>;
		submitLabel?: string;
		onSubmit: (draft: ExpenseDraft) => void;
		onCancel?: () => void;
	};

	let { initial, submitLabel = 'Simpan', onSubmit, onCancel }: Props = $props();

	// Simpan input sebagai string agar aman (lalu parse ketika submit)
	let date = $state(todayISO());
	let amountText = $state('');
	let categoryId = $state('');
	let note = $state('');
	let error = $state<string | null>(null);

	$effect(() => {
		if (initial) {
			date = initial.date ?? todayISO();
			amountText = initial.amount?.toString() ?? '';
			categoryId = initial.categoryId ?? store.categories[0].id ?? '';
			note = initial.note ?? '';
		}
	});

	const categoryLabel = $derived(
		store.categories.find((c) => c.id === categoryId)?.name ?? 'Pilih Kategori'
	);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = null;

		const amount = Number(amountText);

		if (!date) return (error = 'Tanggal wajib diisi');
		if (!Number.isFinite(amount) && amount < 0) return (error = 'Nominal harus lebih dari 0');
		if (!categoryId) return (error = 'Kategori wajib dipilih');

		onSubmit({
			amount,
			categoryId,
			date,
			note: note.trim() ? note.trim() : undefined
		});
	}
</script>

<form class="grid gap-4" onsubmit={submit}>
	{#if error}
		<p class="text-sm text-destructive">{error}</p>
	{/if}

	<div class="grid gap-2">
		<Label for="date">Tanggal</Label>
		<Input id="date" type="date" bind:value={date} required />
	</div>

	<div class="grid gap-2">
		<Label for="amount">Nominal (IDR)</Label>
		<Input
			id="amount"
			type="number"
			min="1"
			step="1"
			inputmode="numeric"
			placeholder="Contoh: 45000"
			bind:value={amountText}
			required
		/>
	</div>

	<div class="grid gap-2">
		<Label>Kategori</Label>
		<Select.Root type="single" name="category" bind:value={categoryId}>
			<Select.Trigger class="w-full">
				{categoryLabel}
			</Select.Trigger>

			<Select.Content>
				<Select.Group>
					<Select.Label>Pilih Kategori</Select.Label>
					{#each store.categories as c (c.id)}
						<Select.Item value={c.id} label={c.name}>
							<div class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full" style={`background: ${c.color ?? '#64748b'}`}
								></span>
								<span>{c.name}</span>
							</div>
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-2">
		<label for="note">Catatan (Opsional)</label>
		<Textarea id="note" placeholder="Contoh: Nasi Goreng" bind:value={note} />
	</div>

	<div class="flex justify-end gap-2">
		{#if onCancel}
			<Button type="button" variant="outline" onclick={onCancel}>Batal</Button>
		{/if}
		<Button type="submit">{submitLabel}</Button>
	</div>
</form>
