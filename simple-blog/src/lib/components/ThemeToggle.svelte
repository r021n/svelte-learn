<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
	import { Sun, Moon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button
	onclick={theme.toggle}
	variant="ghost"
	size="icon"
	class="dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
>
	{#if theme.current === 'light'}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</Button>
