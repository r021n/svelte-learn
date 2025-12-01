<script lang="ts">
	// import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	export let value = '';
	export let placeholder = 'Tulis sesuatu...';
	export let height = 'min-h-[200px]';

	let textareaRef: HTMLTextAreaElement;

	function insertMarkdown(prefix: string, suffix: string = '') {
		if (!textareaRef) return;

		const start = textareaRef.selectionStart;
		const end = textareaRef.selectionEnd;
		const text = textareaRef.value;

		const selectedText = text.substring(start, end);

		const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);

		value = newText;

		setTimeout(() => {
			textareaRef.focus();
			const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
			textareaRef.setSelectionRange(newCursorPos, newCursorPos);
		}, 0);
	}
</script>

<div
	class="border rounded-md border-slate-200 focus-within:ring-2 focus-within:ring-slate-950 focus-within:ring-offset-2"
>
	<div class="flex flex-wrap gap-1 p-2 border-b bg-slate-50 rounded-t-md">
		<!-- Bold -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('**', '**')}
			title="Bold"><span class="font-bold">B</span></Button
		>

		<!-- Italic -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('_', '_')}
			title="Italic"><span class="italic font-serif">I</span></Button
		>

		<!-- Heading 1 -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('# ', '')}
			title="Heading 1"><span class="font-bold text-xs">H1</span></Button
		>

		<!-- Heading 2 -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('## ', '')}
			title="Heading 2"
		>
			<span class="font-bold text-xs">H2</span>
		</Button>

		<div class="w-px h-6 bg-slate-300 mx-1 self-center"></div>

		<!-- List Bullet -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('- ', '')}
			title="List"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line
					x1="8"
					y1="18"
					x2="21"
					y2="18"
				/><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line
					x1="3"
					y1="18"
					x2="3.01"
					y2="18"
				/></svg
			>
		</Button>

		<!-- Code Block -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('```\n', '\n```')}
			title="Code Block"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg
			>
		</Button>

		<!-- Quote -->
		<Button
			variant="ghost"
			size="sm"
			class="h-8 w-8 p-0"
			onclick={() => insertMarkdown('> ', '')}
			title="Quote"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path
					d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
				/><path
					d="M15 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
				/></svg
			>
		</Button>
	</div>

	<textarea
		bind:this={textareaRef}
		bind:value
		{placeholder}
		required
		class="flex w-full rounded-b-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 {height} resize-y"
	></textarea>
</div>
