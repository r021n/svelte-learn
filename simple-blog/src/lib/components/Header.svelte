<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<header class="border-b dark:border-gray-800">
	<nav class="container mx-auto flex h-16 items-center justify-between px-4">
		<a href="/" class="text-xl font-bold dark:text-white">Proyek Kita</a>
		<div class="flex items-center space-x-6">
			<ul class="flex items-center space-x-6">
				<li>
					<a
						href="/"
						class="transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-white"
						>Home</a
					>
				</li>
				<li>
					<a
						href="/about"
						class="transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-white"
						>About</a
					>
				</li>
				<li>
					<a
						href="/blog"
						class="transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-white"
						>Blog</a
					>
				</li>
				<li>
					<a
						href="/posts"
						class="font-medium transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-white"
						>Posts</a
					>
				</li>
			</ul>
			<ThemeToggle />
		</div>
	</nav>
</header>
