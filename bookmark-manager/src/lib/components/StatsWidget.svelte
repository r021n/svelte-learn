<script lang="ts">
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index';
	import { ChartPie } from '@lucide/svelte';

	let totalBookmarks = $derived($bookmarkStore.length);

	let sortedTags = $derived.by(() => {
		const allTags = $bookmarkStore.flatMap((b) => b.tags);

		const counts = allTags.reduce(
			(acc, tag) => {
				acc[tag] = (acc[tag] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>
		);

		return Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 3);
	});
</script>

<div class="animate-in fade-in slide-in-from-top-4 grid gap-4 duration-500 md:grid-cols-2">
	<Card>
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Total Bookmark</CardTitle>
			<ChartPie class="text-muted-foreground h-4 w-4" />
		</CardHeader>
		<CardContent>
			<div class="text-2xl font-bold">{totalBookmarks}</div>
			<p class="text-muted-foreground text-xs">Link tersimpan di browser ini</p>
		</CardContent>
	</Card>

	<Card>
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Top Tags</CardTitle>
			<ChartPie class="text-muted-foreground h-4 w-4" />
		</CardHeader>
		<CardContent>
			<div class="flex flex-col gap-1">
				{#each sortedTags as [tag, count]}
					<div class="flex justify-between text-sm">
						<span class="font-medium">#{tag}</span>
						<span class="text-muted-foreground">{count}x</span>
					</div>
				{/each}
				{#if sortedTags.length === 0}
					<span class="text-muted-foreground text-sm">Belum ada tags</span>
				{/if}
			</div>
		</CardContent>
	</Card>
</div>
