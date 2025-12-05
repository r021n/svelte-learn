<script lang="ts">
	import { onMount } from 'svelte';
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import BookmarkItem from './BookmarkItem.svelte';

	let isLoaded = false;

	onMount(() => {
		isLoaded = true;
	});
</script>

<div class="space-y-4">
	{#if !isLoaded}
		<p class="text-center text-muted-foreground"></p>
	{:else if $bookmarkStore.length === 0}
		<div class="rounded-lg border-2 border-dashed py-10 text-center text-muted-foreground">
			<p>Belum ada bookmark tersimpan</p>
		</div>
	{:else}
		{#each $bookmarkStore as item (item.id)}<BookmarkItem bookmark={item} />{/each}
	{/if}
</div>
