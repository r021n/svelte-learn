<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import BookmarkItem from './BookmarkItem.svelte';

	import { fly, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import Inbox from '@lucide/svelte/icons/inbox';

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
		<p class="text-center text-muted-foreground">Memuat data...</p>
	{:else if $bookmarkStore.length === 0}
		<div
			in:fly={{ y: 10, duration: 500 }}
			class="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl bg-slate-50/50"
		>
			<div class="bg-white p-3 rounded-full shadow-sm mb-3">
				<Inbox class="h-8 w-8 text-slate-400" />
			</div>
			<h3 class="text-lg font-semibold text-slate-900">Belum ada bookmark</h3>
			<p class="text-sm text-slate-500 max-w-xs mt-1">
				Mulai simpan link favoritmu dengan mengisi form di atas
			</p>
		</div>
	{:else if filteredBookmarks.length === 0}
		<div in:fly={{ y: 10, duration: 300 }} class="py-10 text-center text-muted-foreground">
			<p>
				Tidak ditemukan bookrmak dengan kata kunci "<span class="font-semibold">{searchQuery}</span
				>"
			</p>
		</div>
	{:else}
		{#each filteredBookmarks as item (item.id)}
			<div
				animate:flip={{ duration: 400 }}
				in:fly={{ y: 20, duration: 400 }}
				out:slide={{ duration: 300 }}
			>
				<BookmarkItem bookmark={item} />
			</div>
		{/each}
	{/if}
</div>
