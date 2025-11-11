<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>

<article>
	<h1 class="mb-6 text-4xl font-extrabold">{data.post.title}</h1>
	<p class="text-lg leading-relaxed">{data.post.content}</p>
</article>
