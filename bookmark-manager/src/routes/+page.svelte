<script lang="ts">
	import BookmarkForm from '$lib/components/BookmarkForm.svelte';
	import BookmarkList from '$lib/components/BookmarkList.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	let searchQuery = '';
</script>

<div class="min-h-screen bg-gray-100 px-4 py-10">
	<div class="mx-auto max-w-2xl space-y-8">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl font-bold tracking-tight text-slate-900">Bookmark Manager</h1>
			<p class="text-slate-500">Simpan link favoritmu di satu tempat</p>
		</div>

		<BookmarkForm />

		<div class="space-y-4">
			<h2 class="text-xl font-semibold tracking-tight">Daftar Bookmark</h2>
			<SearchBar bind:query={searchQuery} />
			<BookmarkList {searchQuery} />
		</div>
	</div>
</div>
