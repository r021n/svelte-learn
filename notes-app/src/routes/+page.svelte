<script lang="ts">
	import { notesStore } from '$lib/stores/note';
	import { Button } from '$lib/components/ui/button/index';

	$: console.log($notesStore);
</script>

<div class="p-10 space-y-4">
	<h1 class="font-bold text-lg">Test Logic store</h1>

	<Button onclick={() => notesStore.addNote('Judul test', 'isi catatan', 'personal')}
		>Tambahkan</Button
	>

	<Button
		variant="destructive"
		onclick={() => {
			if ($notesStore.length > 0) notesStore.deleteNote($notesStore[0].id);
		}}
	>
		Hapus Note Teratas
	</Button>

	<pre class="bg-slate-100 p-4 rounded mt-4">
        {JSON.stringify($notesStore, null, 2)}
    </pre>
</div>

<style lang="postcss">
	@reference "tailwindcss";
</style>
