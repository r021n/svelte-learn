<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import '../app.css';
</script>

<div
	class="min-h-screen bg-background font-sans antialiased"
	class:dark={theme.current === 'dark'}
>
	<Header />
	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>
</div>
