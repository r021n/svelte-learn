<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { browser } from '$app/environment';

	type Props = {
		content?: string;
	};

	let { content = '' }: Props = $props();

	const htmlContent = $derived.by(() => {
		if (!browser) return '';
		const rawHtml = marked.parse(content) as string;
		return DOMPurify.sanitize(rawHtml);
	});
</script>

<div class="prose prose-slate max-w-none dark:prose-invert leading-normal">
	{@html htmlContent}
</div>
