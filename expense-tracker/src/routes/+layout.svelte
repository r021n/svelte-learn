<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<nav class="p-4 flex gap-4">
	<a href="/">Dashboard</a>
	<a href="/expenses/new">Add Expense</a>
	<a href="/categories">Categories</a>
</nav>
<main class="p-4">{@render children()}</main>
