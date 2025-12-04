<script lang="ts">
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import type { Bookmark } from '$lib/types';

	import { Button } from '$lib/components/ui/button/index';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card/index';

	function addDummyBookmark() {
		const newBookmark: Bookmark = {
			id: crypto.randomUUID(),
			title: `Bookmark test ${$bookmarkStore.length + 1}`,
			url: 'https://svelte.dev',
			tags: ['test', 'svelte'],
			createdAt: Date.now()
		};

		bookmarkStore.update((currentData) => [newBookmark, ...currentData]);
	}

	function clearData() {
		bookmarkStore.set([]);
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Test LocalStorage</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="space-y-5">
				<Button onclick={addDummyBookmark}>Tambah data dummy</Button>
				<Button onclick={clearData} variant="destructive">Hapus Semua</Button>
			</div>

			<div class="max-h-60 overflow-auto rounded-md bg-slate-950 p-4 text-xs text-white">
				<pre>{JSON.stringify($bookmarkStore, null, 2)}</pre>
			</div>

			<p class="text-center text-sm text-muted-foreground">
				Coba tambah data, lalu <b>refresh browser</b>. <br />
				data tidak boleh hilang
			</p>
		</CardContent>
	</Card>
</div>
