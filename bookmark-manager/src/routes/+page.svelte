<script lang="ts">
	import BookmarkForm from '$lib/components/BookmarkForm.svelte';
	import BookmarkList from '$lib/components/BookmarkList.svelte';
</script>

<div class="min-h-screen bg-gray-100 px-4 py-10">
	<div class="mx-auto max-w-2xl space-y-8">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl font-bold tracking-tight text-slate-900">Bookmark Manager</h1>
			<p class="text-slate-500">Simpan link favoritmu di satu tempat</p>
		</div>

		<BookmarkForm />

		<BookmarkList />
	</div>
</div>
