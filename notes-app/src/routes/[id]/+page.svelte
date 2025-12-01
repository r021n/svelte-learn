<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { notesStore } from '$lib/stores/note';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardTitle, CardHeader, CardContent, CardFooter } from '$lib/components/ui/card';
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from '$lib/components/ui/alert-dialog';

	import MarkdownPreview from '$lib/components/MarkdownPreview.svelte';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	const noteId = $derived(page.params.id);

	const note = $derived($notesStore.find((n) => n.id == noteId));

	let isEditing = $state(false);
	let editTitle = $state('');
	let editContent = $state('');
	let editCategory = $state('');
	let showDeleteDialog = $state(false);

	function startEdit() {
		if (!note) return;

		editTitle = note.title;
		editContent = note.content;
		editCategory = note.category;
		isEditing = true;
	}

	function handleSave() {
		if (!note) return;

		notesStore.updateNote(note.id, editTitle, editContent, editCategory);
		isEditing = false;
	}

	function handleDelete() {
		if (!noteId) {
			console.error('noteId tidak ada di URL');
			return;
		}

		notesStore.deleteNote(noteId);
		goto('/');
	}

	function cancelEdit() {
		isEditing = false;
	}
</script>

<div class="container mx-auto py-10 px-10 max-w-3xl">
	<Button
		variant="ghost"
		class="mb-4 pl-0 hover:bg-transparent hover:underline"
		onclick={() => goto('/')}>&larr; Kembali ke Daftar</Button
	>
	{#if note}
		{#if isEditing}
			<Card class="border-blue-200 shadow-md">
				<CardHeader>
					<CardTitle>Edit Catatan</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input bind:value={editTitle} placeholder="Judul" />
						<Input bind:value={editCategory} placeholder="Kategoru" />
					</div>
					<MarkdownEditor
						bind:value={editContent}
						placeholder="Isi catatan..."
						height="min-h-[300px]"
					/>
				</CardContent>
				<CardFooter class="flex justify-end gap-2">
					<Button variant="outline" onclick={cancelEdit}>Batal</Button>
					<Button onclick={handleSave}>Simpan Perubahan</Button>
				</CardFooter>
			</Card>
		{:else}
			<div class="space-y-6">
				<div class="border-b pb-4">
					<div class="flex justify-between items-start">
						<h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">{note.title}</h1>
						<div class="flex gap-2">
							<Button variant="outline" size="sm" onclick={startEdit}>Edit</Button>
							<AlertDialog bind:open={showDeleteDialog}>
								<AlertDialogTrigger>
									<Button variant="destructive" size="sm">Hapus</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Hapus Catatan</AlertDialogTitle>
										<AlertDialogDescription>
											Apakah anda yakin ingin menghapus catatan "{note.title}"? tindakan ini tidak
											dapat dibatalkan
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Batal</AlertDialogCancel>
										<AlertDialogAction onclick={handleDelete}>Hapus</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>

					<div class="flex items-center gap-3 mt-3">
						<Badge>{note.category}</Badge>
						<span class="text-sm text-slate-500"
							>Terakhir edit:
							{new Date(note.date).toLocaleDateString('id-ID')}</span
						>
					</div>
				</div>

				<div class="min-h-[200px]">
					<MarkdownPreview content={note.content} />
				</div>
			</div>
		{/if}
	{:else}
		<div class="text-center py-20">
			<h2 class="text-2xl font-bold text-slate-800">Catatan tidak ditemukan</h2>
			<p class="text-slate-500 mb-4">mungkin catatan ini sudah dihapus</p>
			<Button onclick={() => goto('/')}>Ke halaman utam</Button>
		</div>
	{/if}
</div>
