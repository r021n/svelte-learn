<script lang="ts">
	import { notesStore } from '$lib/stores/note';

	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import {
		Card,
		CardHeader,
		CardContent,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card/index';

	let title = '';
	let content = '';
	let category = '';

	function handleSubmit() {
		if (!title.trim() || !content.trim()) return;

		notesStore.addNote(title, content, category || 'Uncategorize');

		title = '';
		content = '';
		category = '';
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<main class="container mx-auto py-10 px-4 max-w-5xl">
	<div class="mb-8 text-center">
		<h1 class="text-4xl font-bold tracking-tight text-slate-900">Notes App</h1>
		<p class="text-slate-500 mt-2">Catat ide-idemu sebelum hilang</p>
	</div>

	<Card class="mb-10 border-slate-200 shadow-sm">
		<CardHeader>
			<CardTitle>Buat Catatan Baru</CardTitle>
		</CardHeader>
		<CardContent>
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<Input
							type="text"
							placeholder="Judul Catatan"
							bind:value={title}
							class="font-semibold"
						/>
					</div>
					<div class="space-y-2">
						<Input type="text" placeholder="Kategori (Opsional)" bind:value={category} />
					</div>
				</div>
				<Textarea placeholder="Tulis sesuatu disini" bind:value={content} class="min-h-[100px]" />
				<div class="flex justify-end">
					<Button type="submit" class="cursor-pointer">Simpan Catatan</Button>
				</div>
			</form>
		</CardContent>
	</Card>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each $notesStore as note (note.id)}
			<Card class="flex flex-col h-full hover:shadow-md transition-shadow">
				<CardHeader class="pb-3">
					<div class="flex justify-between items-start gap-2">
						<CardTitle class="text-lg leading-tight">{note.title}</CardTitle>
						<Badge variant="secondary" class="shrink-0">{note.category}</Badge>
					</div>
					<CardDescription class="text-xs">{formatDate(note.date)}</CardDescription>
				</CardHeader>
				<CardContent class="grow">
					<p class="text-slate-600 text-sm whitespace-pre-line line-clamp-4">{note.content}</p>
				</CardContent>
				<CardFooter class="pt-0">
					<Button variant="outline" size="sm" class="w-full">Lihat Detail</Button>
				</CardFooter>
			</Card>
		{:else}
			<div class="col-span-full text-center py-12 text-slate-400">
				<p class="text-lg">Belum Ada Catatan</p>
				<p class="text-sm">Mulai menulis dengan mengisi form di atas</p>
			</div>
		{/each}
	</div>
</main>

<style lang="postcss">
	@reference "tailwindcss";
</style>
