<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isDark = $state(false);

	onMount(() => {
		const stored = localStorage.theme;
		const prefersDark = window.matchMedia('(prefres-color-scheme: dark)').matches;

		const initial = stored === 'dark' || (!stored && prefersDark);

		isDark = initial;
		document.documentElement.classList.toggle('dark', initial);
	});

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.theme = isDark ? 'dark' : 'light';
	}
</script>

<div class="min-h-screen bg-background font-sans antialiased relative">
	<div class="absolute top-4 right-4 z-50">
		<Button variant="outline" size="icon" onclick={toggleTheme}>
			{#if isDark}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="5" />
					<path d="M12 1v2" />
					<path d="M12 21v2" />
					<path d="M4.22 4.22l1.42 1.42" />
					<path d="M17.66 17.66l1.42 1.42" />
					<path d="M1 12h2" />
					<path d="M21 12h2" />
					<path d="M4.22 19.78l1.42-1.42" />
					<path d="M17.66 6.34l1.42-1.42" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M21 12.79A9 9 0 1 1 11.21 3
               7 7 0 0 0 21 12.79z"
					/>
				</svg>
			{/if}
		</Button>
	</div>
	{@render children()}
</div>
