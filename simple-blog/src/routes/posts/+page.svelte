<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Daftar Postingan</title>
	<meta
		name="description"
		content="10 postingan terbaru dari JSONPlaceholder"
	/>
</svelte:head>

<section class="py-8">
	<h1 class="mb-6 text-3xl font-bold dark:text-white">Postingan Terbaru</h1>

	{#if data.posts.length === 0}
		<p class="text-muted-foreground">Tidak ada postingan ditemukan.</p>
	{:else}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.id)}
				<Card title={post.title}>
					<p class="line-clamp-3 text-sm text-muted-foreground">
						{post.body}
					</p>
					<div class="mt-4 text-xs text-muted-foreground">
						Post #{post.id} oleh User {post.userId}
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</section>
