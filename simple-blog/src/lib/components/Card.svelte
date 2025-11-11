<script lang="ts">
	let { title, description } = $props();
</script>

<div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
	<h3 class="mb-2 text-xl font-semibold">{title}</h3>
	{#if description}
		<p class="mb-4 text-sm text-muted-foreground">{description}</p>
	{/if}
	<slot />
</div>
