<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import * as Dialog from '$lib/components/ui/dialog/index';

	import PencilIcon from '@lucide/svelte/icons/pencil';
	import type { Bookmark } from '$lib/types';
	import { updateBookmark } from '$lib/stores/bookmarkStore';

	interface Props {
		bookmark: Bookmark;
	}

	let { bookmark }: Props = $props();

	let open = $state(false);
	let title = $state('');
	let url = $state('');
	let tagsInput = $state('');

	$effect(() => {
		if (open) {
			title = bookmark.title;
			url = bookmark.url;
			tagsInput = bookmark.tags.join(', ');
		}
	});

	function handleSave() {
		if (!title || !url) return;

		const tags = tagsInput
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag !== '');

		updateBookmark(bookmark.id, { title, url, tags });

		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger
		class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
		aria-label="Edit bookmark"><PencilIcon class="h-4 w-4" aria-hidden="true" /></Dialog.Trigger
	>

	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit Bookmark</Dialog.Title>
			<Dialog.Description
				>Ubah detail bookmark di sini. Klik simpan jika sudah selesai</Dialog.Description
			>
		</Dialog.Header>

		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="edit-title" class="text-right">Edit Judul</Label>
				<Input id="edit-title" bind:value={title} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="edit-url" class="text-right">URL</Label>
				<Input id="edit-url" bind:value={url} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="edit-tags" class="text-right">Tags</Label>
				<Input
					id="edit-tags"
					bind:value={tagsInput}
					class="col-span-3"
					placeholder="docs, frontend, svelte"
				/>
			</div>
		</div>

		<Dialog.Footer
			><Button type="button" class="w-full sm:w-auto" onclick={handleSave}>Simpan Perubahan</Button
			></Dialog.Footer
		>
	</Dialog.Content>
</Dialog.Root>
