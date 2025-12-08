<script lang="ts">
	import type { Bookmark } from '$lib/types';

	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Badge } from '$lib/components/ui/badge/index';

	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';

	import EditBookmarkDialog from './EditBookmarkDialog.svelte';
	import { deleteBookmark } from '$lib/stores/bookmarkStore';

	interface Props {
		bookmark: Bookmark;
	}

	let { bookmark }: Props = $props();

	function handleDelete() {
		if (confirm('Yakin ingin menghapus bookmark ini?')) {
			deleteBookmark(bookmark.id);
		}
	}
</script>

<Card.Root class="group transition-colors hover:bg-slate-50">
	<Card.Content class="flex items-center justify-between gap-4 p-4">
		<div class="flex flex-1 flex-col gap-1 overflow-hidden">
			<div>
				<a
					href={bookmark.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-1 font-semibold text-lg hover:underline truncate"
					><span class="truncate">{bookmark.title}</span><ExternalLink
						class="h-4 w-4 shrink-0 text-slate-400"
						aria-hidden="true"
					/></a
				>
				<span class="truncate text-sm text-muted-foreground">{bookmark.url}</span>
			</div>

			{#if bookmark.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each bookmark.tags as tag}
						<Badge variant="secondary" class="text-xs font-normal">#{tag}</Badge>
					{/each}
				</div>
			{/if}
		</div>

		<div
			class="flex items-center gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
		>
			<EditBookmarkDialog {bookmark} />
			<Button variant="destructive" size="icon" class="h-8 w-8" onclick={handleDelete}>
				<Trash2Icon class="h-4 w-4" aria-hidden="true" />
				<span class="sr-only">Hapus Bookmark</span>
			</Button>
		</div>

		<!-- Tombol Edit/Delete akan kita isi di Chapter 4 -->
	</Card.Content>
</Card.Root>
