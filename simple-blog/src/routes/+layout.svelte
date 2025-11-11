<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<div class="min-h-screen bg-background font-sans antialiased">
	<Header />
	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>
</div>
