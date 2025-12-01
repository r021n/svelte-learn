<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { notesStore } from '$lib/stores/note';

	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import {
		Card,
		CardHeader,
		CardContent,
		CardTitle,
		CardDescription,
		CardFooter
	} from '$lib/components/ui/card/index';

	import { timeAgo } from '$lib/utils';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

	let title = $state('');
	let content = $state('');
	let category = $state('');

	let searchQuery = $state('');
	let selectedCategory = $state('Semua');

	const uniqueCategories = $derived(['Semua', ...new Set($notesStore.map((n) => n.category))]);

	const filteredNotes = $derived(
		$notesStore.filter((note) => {
			const query = searchQuery.toLowerCase();

			const matchText =
				note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query);
			const matchCategory = selectedCategory === 'Semua' || note.category === selectedCategory;

			return matchText && matchCategory;
		})
	);

	function resetFilter() {
		searchQuery = '';
		selectedCategory = 'Semua';
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!title.trim() || !content.trim()) return;

		notesStore.addNote(title, content, category || 'Uncategorize');

		title = '';
		content = '';
		category = '';
	}

	function stripMarkdown(text: string) {
		return text
			.replace(/[#*_`]/g, '')
			.replace(/\[(.*?)\]\(.*?\)/g, '$1')
			.replace(/\n+/g, ' ');
	}
</script>

<main class="container mx-auto py-10 px-4 max-w-5xl">
	<div class="mb-8 text-center">
		<h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Notes App</h1>
		<p class="text-slate-500 mt-2">Catat ide-idemu sebelum hilang</p>
	</div>

	<!-- Create note form -->

	<Card class="mb-10 border-slate-200 shadow-sm">
		<CardHeader>
			<CardTitle>Buat Catatan Baru</CardTitle>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<Input
							type="text"
							placeholder="Judul Catatan"
							bind:value={title}
							class="font-semibold"
							required
						/>
					</div>
					<div class="space-y-2">
						<Input type="text" placeholder="Kategori (Opsional)" bind:value={category} required />
					</div>
				</div>
				<MarkdownEditor
					bind:value={content}
					placeholder="Tuliskan sesuatu disini..."
					height="min-h-[150px]"
				/>
				<div class="flex justify-end">
					<Button type="submit" class="cursor-pointer">Simpan Catatan</Button>
				</div>
			</form>
		</CardContent>
	</Card>

	<!-- Form search -->

	<div class="mb-8 space-y-4">
		<div class="relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="absolute left-3 top-3 h-4 w-4 text-slate-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<Input
				type="text"
				placeholder="Cari catatan berdasarkan judul atau isi..."
				class="pl-10"
				bind:value={searchQuery}
			/>
		</div>

		<div class="flex flex-wrap gap-2">
			{#each uniqueCategories as cat}
				<button
					type="button"
					onclick={() => (selectedCategory = cat)}
					class="px-4 py-1.5 rounded-sm text-sm font-medium transition-colors border {selectedCategory ===
					cat
						? 'bg-slate-900 text-white border-slate-900'
						: 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}">{cat}</button
				>
			{/each}
		</div>
	</div>

	<!-- List Catatan -->

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredNotes as note (note.id)}
			<div
				animate:flip={{ duration: 300 }}
				in:fly={{ y: 20, duration: 300, delay: 100 }}
				out:fade={{ duration: 200 }}
			>
				<Card class="flex flex-col h-full hover:shadow-md transition-shadow">
					<CardHeader class="pb-3">
						<div class="flex justify-between items-start gap-2">
							<CardTitle class="text-lg leading-tight">{note.title}</CardTitle>
							<Badge variant="secondary" class="shrink-0">{note.category}</Badge>
						</div>
						<CardDescription class="text-xs">{timeAgo(note.date)}</CardDescription>
					</CardHeader>
					<CardContent class="grow">
						<p class="text-slate-600 text-sm whitespace-pre-line line-clamp-4">
							{stripMarkdown(note.content)}
						</p>
					</CardContent>
					<CardFooter class="pt-0">
						<a href={`/${note.id}`} class="w-full"
							><Button variant="outline" size="sm" class="w-full">Lihat Detail</Button></a
						>
					</CardFooter>
				</Card>
			</div>
		{:else}
			<div class="col-span-full text-center py-12 text-slate-400">
				{#if searchQuery || selectedCategory !== 'Semua'}
					<p class="text-lg">Tidak ditemukan catatan yang cocok</p>
					<Button variant="link" onclick={resetFilter}>Reset Filter</Button>
				{:else}
					<p class="text-lg">Belum Ada Catatan</p>
					<p class="text-sm">Mulai menulis dengan mengisi form di atas</p>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style lang="postcss">
	@reference "tailwindcss";
</style>
