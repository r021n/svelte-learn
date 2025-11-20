<script lang="ts">
	import { todoStore } from '$lib/stores/todoStore';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { fade, slide } from 'svelte/transition';
</script>

<div class="w-full space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold tracking-tight">Daftar Tugas</h1>
		<span class="text-sm text-muted-foreground">{$todoStore.length} tugas</span>
	</div>

	{#if $todoStore.length === 0}
		<div
			in:fade
			class="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-8 text-center animate-in fade-in-50"
		>
			<p class="text-lg font-medium">Belum ada tugas</p>
			<p class="text-sm text-muted-foreground">Mulai dengan menambahkan tugas baru di bawah ini</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each $todoStore as todo (todo.id)}
				<div transition:slide|local={{ duration: 200 }}>
					<Card>
						<CardContent class="flex items-center p-4">
							<Checkbox id={todo.id} checked={todo.completed} />
							<Label
								for={todo.id}
								class="ml-3 flex-1 cursor-pointer text-base font-medium {todo.completed
									? 'text-muted-foreground line-through'
									: ''}">{todo.text}</Label
							>
						</CardContent>
					</Card>
				</div>
			{/each}
		</div>
	{/if}
</div>
