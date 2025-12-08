<script lang="ts">
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import type { Bookmark } from '$lib/types';

	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Card from '$lib/components/ui/card/index';

	let title = '';
	let url = '';
	let tagsInput = '';

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!title || !url) return;

		const tags = tagsInput
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag !== '');

		const newBookmark: Bookmark = {
			id: crypto.randomUUID(),
			title,
			url,
			tags,
			createdAt: Date.now()
		};

		bookmarkStore.update((current) => [newBookmark, ...current]);

		title = '';
		url = '';
		tagsInput = '';
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tambah Bookmark Baru</Card.Title>
	</Card.Header>

	<Card.Content>
		<form onsubmit={handleSubmit} class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Label for="title">Judul Website</Label>
				<Input id="title" bind:value={title} placeholder="Contoh: dokumentasi svelte" />
			</div>

			<div class="flex flex-col gap-2">
				<Label for="url">URL</Label>
				<Input id="url" type="url" bind:value={url} placeholder="https://..." />
			</div>

			<div class="flex flex-col gap-2">
				<Label for="tags">Tags (Pisahkan dengan koma)</Label>
				<Input id="tags" bind:value={tagsInput} placeholder="docs, frontend, svelte" />
			</div>

			<Button type="submit" class="w-full">Simpan</Button>
		</form>
	</Card.Content>
</Card.Root>
