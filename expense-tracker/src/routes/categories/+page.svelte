<script lang="ts">
	import { getExpenseStore } from '$lib/state/expense-store-context';

	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Table from '$lib/components/ui/table/index';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

	const store = getExpenseStore();

	const usageByCategory = $derived.by(() => {
		const map: Record<string, number> = {};
		for (const e of store.expenses) {
			map[e.categoryId] = (map[e.categoryId] ?? 0) + 1;
		}
		return map;
	});

	let newName = $state('');
	let newColor = $state('#64748b');
	let isAddDialogOpen = $state(false);

	let renameId = $state<string | null>(null);
	let renameName = $state('');
</script>

<Card.Root class="max-w-2xl">
	<Card.Header class="flex-row items-start justify-between gap-3">
		<div>
			<Card.Title>Categories</Card.Title>
			<Card.Description>Kelola kategori untuk keuangan</Card.Description>
		</div>

		<Dialog.Root bind:open={isAddDialogOpen}>
			<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
				Tambah Kategori
			</Dialog.Trigger>

			<Dialog.Content class="sm:max-w-130">
				<Dialog.Header>
					<Dialog.Title>Tambah Kategori</Dialog.Title>
					<Dialog.Description>Buat kategori baru untuk tracking</Dialog.Description>
				</Dialog.Header>

				<form
					class="grid gap-4"
					onsubmit={(e) => {
						e.preventDefault();
						const name = newName.trim();
						if (!name) return;

						store.addCategory({ name, color: newColor });
						newName = '';
						newColor = '#64748b';
						isAddDialogOpen = false;
					}}
				>
					<div class="grid gap-2">
						<Label for="cat-name">Nama</Label>
						<Input id="cat-name" placeholder="contoh: Kopi" bind:value={newName} />
					</div>

					<div class="grid gap-2">
						<Label for="cat-color">Warna Kategori (opsional)</Label>
						<Input id="cat-color" type="color" bind:value={newColor} />
					</div>

					<div class="flex justify-end">
						<Button type="submit">Simpan</Button>
					</div>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</Card.Header>

	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Warna</Table.Head>
					<Table.Head>Nama</Table.Head>
					<Table.Head class="text-end">Dipakai</Table.Head>
					<Table.Head class="text-end">Aksi</Table.Head>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#each store.categories as c (c.id)}
					<Table.Row>
						<Table.Cell
							><span
								class="inline-block h-4 w-4 rounded-full"
								style={`background:${c.color ?? '#64748b'}`}
							></span></Table.Cell
						>
						<Table.Cell class="font-medium">{c.name}</Table.Cell>
						<Table.Cell class="text-end">{usageByCategory[c.id] ?? 0}</Table.Cell>

						<Table.Cell class="text-end">
							<div class="flex-inline gap-2">
								<Dialog.Root
									open={renameId === c.id}
									onOpenChange={(o) => {
										renameId = o ? c.id : null;
										renameName = o ? c.name : '';
									}}
								>
									<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}
										>Rename</Dialog.Trigger
									>

									<Dialog.Content class="sm:max-w-130">
										<Dialog.Header>
											<Dialog.Title>Rename Kategori</Dialog.Title>
										</Dialog.Header>

										<form
											class="grid gap-4"
											onsubmit={(e) => {
												e.preventDefault();
												const name = renameName.trim();
												if (!name) return;
												store.renameCategory(c.id, name);
												renameName = '';
												renameId = null;
											}}
										>
											<div class="grid gap-2">
												<Label>Nama Baru</Label>
												<Input bind:value={renameName} />
											</div>

											<dir class="grid justify-end gap-2">
												<Button
													variant="outline"
													type="button"
													onclick={() => {
														renameId = null;
													}}>Batal</Button
												>
												<Button type="submit">Simpan</Button>
											</dir>
										</form>
									</Dialog.Content>
								</Dialog.Root>

								<AlertDialog.Root>
									<AlertDialog.Trigger
										class={buttonVariants({ variant: 'destructive', size: 'sm' })}
										disabled={(usageByCategory[c.id] ?? 0) > 0}>Hapus</AlertDialog.Trigger
									>

									<AlertDialog.Content>
										<AlertDialog.Header>
											<AlertDialog.Title>Hapus Kategori "{c.name}"?</AlertDialog.Title>
											<AlertDialog.Description
												>Kategori yang masih dipakai transaksi sebaiknya tidak dihapus</AlertDialog.Description
											>
										</AlertDialog.Header>

										<AlertDialog.Footer>
											<AlertDialog.Cancel>Batal</AlertDialog.Cancel>
											<AlertDialog.Action onclick={() => store.deleteCategory(c.id)}
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

		<p class="mt-3 text-xs text-muted-foreground">
			* Tombol “Hapus” dinonaktifkan jika kategori masih dipakai transaksi (aturan aman).
		</p>
	</Card.Content>
</Card.Root>
