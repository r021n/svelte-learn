<script lang="ts">
	import BookmarkForm from '$lib/components/BookmarkForm.svelte';
	import BookmarkList from '$lib/components/BookmarkList.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChartBar } from '@lucide/svelte';
	import type { Component } from 'svelte';

	let searchQuery = $state('');

	let StatsWidgetComponent = $state<Component | null>(null);
	let showStats = $state(false);
	let isLoadingStats = $state(false);

	async function toggleStats() {
		if (showStats) {
			showStats = false;
			return;
		}

		if (!StatsWidgetComponent) {
			isLoadingStats = true;
			try {
				const module = await import('$lib/components/StatsWidget.svelte');
				StatsWidgetComponent = module.default;
			} catch (error) {
				console.error('Gagal memuat statistik', error);
			} finally {
				isLoadingStats = false;
			}
		}

		showStats = true;
	}
</script>

<div class="min-h-screen bg-slate-50 px-4 py-10 font-sans text-slate-900">
	<div class="mx-auto max-w-2xl space-y-8">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl font-bold tracking-tight text-slate-900">Bookmark Manager</h1>
			<p class="text-slate-500">Simpan link favoritmu di satu tempat</p>
		</div>

		<div class="flex justify-end">
			<Button variant="outline" size="sm" onclick={toggleStats}>
				<ChartBar class="mr-2 w-4 h-4" />
				{showStats ? 'Tutup statistik' : 'Lihat statistik'}
			</Button>
		</div>

		{#if showStats}
			{#if isLoadingStats}
				<p class="text-muted-foreground text-center text-sm">Memuat statistik...</p>
			{:else if StatsWidgetComponent}
				<StatsWidgetComponent />
			{/if}
		{/if}

		<BookmarkForm />

		<div class="space-y-4">
			<h2 class="text-xl font-semibold tracking-tight">Daftar Bookmark</h2>
			<SearchBar bind:query={searchQuery} />
			<BookmarkList {searchQuery} />
		</div>
	</div>
</div>
