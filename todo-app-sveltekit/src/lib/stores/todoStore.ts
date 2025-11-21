import { writable, derived } from 'svelte/store';
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

const updateTodoText = (id: string, newText: string) => {
	update((todos) => todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
};

export const todoStore = {
	subscribe,
	addTodo,
	deleteTodo,
	toggleTodo,
	updateTodoText
};

export const filterStore = writable<string>('all');

export const filteredTodos = derived([todoStore, filterStore], ([$todos, $filter]) => {
	if ($filter === 'active') {
		return $todos.filter((t) => !t.completed);
	} else if ($filter === 'completed') {
		return $todos.filter((t) => t.completed);
	}

	return $todos;
});
