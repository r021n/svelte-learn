import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Todo } from '$lib/type';

const initialTodos: Todo[] =
	browser && localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') || '[]') : [];

const { subscribe, update } = writable<Todo[]>(initialTodos);

subscribe((value) => {
	if (browser) {
		localStorage.setItem('todos', JSON.stringify(value));
	}
});

const addTodo = (text: string) => {
	update((todos) => {
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			text,
			completed: false,
			createdAt: Date.now()
		};

		return [newTodo, ...todos];
	});
};

const deleteTodo = (id: string) => {
	update((todos) => todos.filter((todo) => todo.id !== id));
};

const toggleTodo = (id: string) => {
	update((todos) =>
		todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
	);
};

export const todoStore = {
	subscribe,
	addTodo,
	deleteTodo,
	toggleTodo
};
