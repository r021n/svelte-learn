<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import BookmarkItem from './BookmarkItem.svelte';

	interface Props {
		searchQuery?: string;
	}

	let { searchQuery = '' }: Props = $props();

	let isLoaded = $state(false);

	onMount(() => {
		isLoaded = true;
	});

	let filteredBookmarks = $derived(
		$bookmarkStore.filter((item) => {
			if (!searchQuery) return true;

			const lowerQuery = searchQuery.toLowerCase();

			const matchTitle = item.title.toLowerCase().includes(lowerQuery);
			const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

			return matchTitle || matchTags;
		})
	);
</script>

<div class="space-y-4">
	{#if !isLoaded}
		<p class="text-center text-muted-foreground"></p>
	{:else if $bookmarkStore.length === 0}
		<div class="rounded-lg border-2 border-dashed py-10 text-center text-muted-foreground">
			<p>Belum ada bookmark tersimpan</p>
		</div>
	{:else if filteredBookmarks.length === 0}
		<div class="py-10 text-center text-muted-foreground">
			<p>
				Tidak ditemukan bookrmak dengan kata kunci "<span class="font-semibold">{searchQuery}</span
				>"
			</p>
		</div>
	{:else}
		{#each filteredBookmarks as item (item.id)}<BookmarkItem bookmark={item} />{/each}
	{/if}
</div>
