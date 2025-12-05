<script lang="ts">
	import type { Bookmark } from '$lib/types';
	import * as Card from '$lib/components/ui/card/index';
	import ExternalLink from '@lucide/svelte/icons/external-link';

	interface Props {
		bookmark: Bookmark;
	}

	let { bookmark }: Props = $props();
</script>

<Card.Root class="hover:bg-slate-50 transition-colors">
	<Card.Content class="flex items-center justify-between p-4">
		<div class="flex flex-col gap-1 overflow-hidden">
			<a
				href={bookmark.url}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1 font-semibold text-lg hover:underline truncate"
				><span class="truncate">{bookmark.title}</span><ExternalLink
					class="h-4 w-4 shrink-0 text-slate-400"
					aria-hidden="true"
				/></a
			>

			<span class="truncate text-sm text-muted-foreground">{bookmark.url}</span>
		</div>

		<!-- Tombol Edit/Delete akan kita isi di Chapter 4 -->
	</Card.Content>
</Card.Root>
