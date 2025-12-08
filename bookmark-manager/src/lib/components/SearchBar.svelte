<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import SearchIcon from '@lucide/svelte/icons/search';

	export let query: string = '';
</script>

<div class="relative">
	<SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
	<Input type="search" placeholder="Cari judul atau tags" class="pl-8" bind:value={query} />
</div>
