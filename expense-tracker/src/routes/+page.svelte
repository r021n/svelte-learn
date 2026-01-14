<script lang="ts">
	import { getExpenseStore } from '$lib/state/expense-store-context';
	import { formatIDR } from '$lib/domain/money';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index';
	import * as Table from '$lib/components/ui/table/index';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';

	import ExpenseForm from '$lib/components/expenses/ExpenseForm.svelte';

	const store = getExpenseStore();

	const recent = $derived(store.expensesInActiveMonth.slice(0, 10));

	function categoryName(categoryId: string) {
		return store.categoriesById[categoryId].name ?? 'Unknown';
	}

	function categoryColor(categoryId: string) {
		return store.categoriesById[categoryId].color ?? '#64748b';
	}
</script>

<div class="grid gap-4">
	<div class="flex items-center justify-between gap-3">
		<div>
			<h1 class="text-2xl font-semibold">Dashboard</h1>
			<p class="text-sm text-muted-foreground">Ringkasan bulan: {store.activeMonth}</p>
		</div>

		<Button href="/expenses/new">Tambah Pengeluaran</Button>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<Card.Root>
			<Card.Header>
				<Card.Description>Total Bulan Ini</Card.Description>
				<Card.Title class="text-2xl">{formatIDR(store.totalActiveMonth)}</Card.Title>
			</Card.Header>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Description>Jumlah transaksi (Bulan Ini)</Card.Description>
				<Card.Title class="text-2xl">{store.expensesInActiveMonth.length}</Card.Title>
			</Card.Header>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Description>Kategori teratas</Card.Description>
				<Card.Title class="text-2xl"
					>{store.totalByCategoryActiveMonth[0].category.name ?? '-'}</Card.Title
				>
			</Card.Header>
		</Card.Root>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Transaksi Terbaru</Card.Title>
			<Card.Description>10 Transaksi terakhir di bulan teraktif</Card.Description>
		</Card.Header>

		<Card.Content>
			{#if recent.length === 0}
				<p class="text-sm text-muted-foreground">Belum ada transaksi. Klik "Tambah Pengeluaran"</p>
			{:else}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Tanggal</Table.Head>
							<Table.Head>Kategori</Table.Head>
							<Table.Head>Catatan</Table.Head>
							<Table.Head class="text-end">Nominal</Table.Head>
							<Table.Head class="text-end">Aksi</Table.Head>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{#each recent as e (e.id)}
							<Table.Row>
								<Table.Cell class="font-medium">{e.date}</Table.Cell>
								<Table.Cell>
									<div class="flex items-center gap-2">
										<span
											class="h-2 w-2 rounded-full"
											style={`background:${categoryColor(e.categoryId)}`}
										></span><span>{categoryName(e.categoryId)}</span>
									</div>
								</Table.Cell>

								<Table.Cell class="text-muted-foreground">{e.note ?? '-'}</Table.Cell>
								<Table.Cell class="text-end">{formatIDR(e.amount)}</Table.Cell>

								<Table.Cell class="text-end">
									<div class="inline-flex gap-2">
										<Dialog.Root>
											<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}
												>Edit</Dialog.Trigger
											>

											<Dialog.Content class="sm:max-w-130">
												<Dialog.Header>
													<Dialog.Title>Edit Expense</Dialog.Title>
													<Dialog.Description>Update data transaksi</Dialog.Description>
												</Dialog.Header>

												<ExpenseForm
													initial={{
														date: e.date,
														amount: e.amount,
														categoryId: e.categoryId,
														note: e.note
													}}
													submitLabel="Simpan Perubahan"
													onSubmit={(draft) => store.updateExpense(e.id, draft)}
													onCancel={() => {}}
												/>
											</Dialog.Content>
										</Dialog.Root>

										<AlertDialog.Root>
											<AlertDialog.Trigger
												class={buttonVariants({ variant: 'destructive', size: 'sm' })}
												>Hapus</AlertDialog.Trigger
											>

											<AlertDialog.Content>
												<AlertDialog.Header>
													<AlertDialog.Title>Hapus Transaksi Ini?</AlertDialog.Title>
													<AlertDialog.Description
														>Tindakan ini tidak dapat dibatalkan</AlertDialog.Description
													>
												</AlertDialog.Header>

												<AlertDialog.Footer>
													<AlertDialog.Cancel>Batal</AlertDialog.Cancel>
													<AlertDialog.Action onclick={() => store.deleteExpense(e.id)}
														>Hapus</AlertDialog.Action
													>
												</AlertDialog.Footer>
											</AlertDialog.Content>
										</AlertDialog.Root>
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
