<script lang="ts">
	import { todoStore, filterStore, filteredTodos } from '$lib/stores/todoStore';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { fade, slide } from 'svelte/transition';
	import { Trash2 } from 'lucide-svelte';

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

	let editingId: string | null = null;

	const handleDelete = (id: string) => {
		todoStore.deleteTodo(id);
	};

	const handleToggle = (id: string) => {
		todoStore.toggleTodo(id);
	};

	const startEditing = (id: string) => {
		editingId = id;
	};

	const saveEdit = (id: string, event: Event) => {
		const input = event.target as HTMLInputElement;
		const newText = input.value.trim();

		if (newText.length > 0) {
			todoStore.updateTodoText(id, newText);
		}
		editingId = null;
	};

	const handleKeydown = (id: string, event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			saveEdit(id, event);
		} else if (event.key === 'Escape') {
			editingId = null;
		}
	};

	export let data;

	$: {
		filterStore.set(data.filter);
	}
</script>

<div class="w-full space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold tracking-tight">Daftar Tugas</h1>
		<span class="text-sm text-muted-foreground">{$filteredTodos.length} tugas</span>
	</div>

	<Card>
		<CardContent class="p-4">
			<form
				method="POST"
				action="?/create"
				use:enhance={handleSubmit}
				class="flex items-center w-full space-x-2"
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

	<div class="flex pb-2 space-x-2">
		<Button href="/?filter=all" variant={$filterStore === 'all' ? 'default' : 'outline'} size="sm"
			>Semua</Button
		>
		<Button
			href="/?filter=active"
			variant={$filterStore === 'active' ? 'default' : 'outline'}
			size="sm"
		>
			Aktif
		</Button>
		<Button
			href="/?filter=completed"
			variant={$filterStore === 'completed' ? 'default' : 'outline'}
			size="sm"
		>
			Selesai
		</Button>
	</div>

	{#if $filteredTodos.length === 0}
		<div
			in:fade
			class="flex flex-col items-center justify-center p-8 space-y-2 text-center border border-dashed rounded-lg animate-in fade-in-50"
		>
			{#if $filterStore === 'all'}
				Belum ada tugas. Tambahkan satu!
			{:else}
				Tidak ada tugas di filter ini.
			{/if}
		</div>
	{:else}
		<div class="space-y-3">
			{#each $filteredTodos as todo (todo.id)}
				<div transition:slide|local={{ duration: 200 }}>
					<Card>
						<CardContent class="flex items-center gap-3 p-4">
							<Checkbox
								id={todo.id}
								checked={todo.completed}
								onCheckedChange={() => handleToggle(todo.id)}
							/>
							<div>
								{#if editingId === todo.id}
									<Input
										value={todo.text}
										class="h-8"
										autofocus
										onblur={(e) => saveEdit(todo.id, e)}
										onkeydown={(e) => handleKeydown(todo.id, e)}
									/>
								{:else}
									<Label
										for={todo.id}
										class="cursor-pointer text-base font-medium block w-full py-1
										{todo.completed ? 'text-muted-foreground line-through' : ''}
										"
										ondblclick={() => startEditing(todo.id)}>{todo.text}</Label
									>
								{/if}
							</div>
							<Button
								variant="ghost"
								size="icon"
								class="ml-auto text-destructive hover:text-destructive/90 hover:bg-destructive/10"
								onclick={() => handleDelete(todo.id)}><Trash2 class="w-4 h-4" /></Button
							>
						</CardContent>
					</Card>
				</div>
			{/each}
		</div>
	{/if}
</div>
