<script lang="ts">
	import { todoStore } from '$lib/stores/todoStore';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { fade, slide } from 'svelte/transition';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';

	const handleSubmit: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success' && result.data) {
				todoStore.addTodo(result.data.text as string);
				await update();
			} else if (result.type === 'failure') {
				console.error(result.data?.message);
			}
		};
	};
</script>

<div class="w-full space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold tracking-tight">Daftar Tugas</h1>
		<span class="text-sm text-muted-foreground">{$todoStore.length} tugas</span>
	</div>

	<Card>
		<CardContent class="p-4">
			<form
				method="POST"
				action="?/create"
				use:enhance={handleSubmit}
				class="flex w-full items-center space-x-2"
			>
				<Input
					type="text"
					name="text"
					placeholder="apa yang ingin anda lakukan"
					class="flex-1"
					autocomplete="off"
				/>
				<Button type="submit">Tambah</Button>
			</form>
		</CardContent>
	</Card>

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
