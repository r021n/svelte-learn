<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import '../app.css';
</script>

<div class="min-h-screen bg-background text-foreground">
	<main class="flex flex-col items-center w-full">
		<div class="w-full max-w-2xl p-4">
			<slot />
		</div>
	</main>
</div>
