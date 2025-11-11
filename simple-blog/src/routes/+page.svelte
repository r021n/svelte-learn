<script lang="ts">
	let { data, form } = $props();
	import Card from '$lib/components/Card.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Mail } from '@lucide/svelte';
</script>

<main class="flex min-h-screen items-center justify-center bg-background p-4">
	<Card
		title="Selamat Datang di Proyek SvelteKit"
		description="Ini adalah komponen Card kustom yang kita buat."
	>
		<p class="mb-6">
			Di dalam Card ini, kita menggunakan komponen Button dari shadcn-svelte.
		</p>
		<Button>
			<Mail class="mr-2 h-4 w-4" />
			Hubungi Kami
		</Button>
	</Card>
</main>
