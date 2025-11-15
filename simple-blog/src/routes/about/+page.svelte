<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="Halaman tentang kami" />
</svelte:head>

<section>
	<h1 class="mb-4 text-3xl font-bold dark:text-white">Tentang Proyek Ini</h1>
	<p class="text-muted-foreground">
		Ini adalah proyek demo yang dibuat untuk memandu pengembangan aplikasi
		frontend tingkat menengah menggunakan SvelteKit, TypeScript, dan Tailwind
		CSS.
	</p>
</section>
