import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Bookmark } from '$lib/types';

const STORAGE_KEY = 'bookmark-manager-data';

function loadInitial(): Bookmark[] {
	if (!browser) return [];

	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Bookmark[]) : [];
	} catch (error) {
		console.error('Failed to parse bookmark from localStorage', error);
		return [];
	}
}

export const bookmarkStore = writable<Bookmark[]>(loadInitial());

bookmarkStore.subscribe((value) => {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	} catch (error) {
		console.error('Failed to save bookmark to localstorage', error);
	}
});

export function deleteBookmark(id: string) {
	bookmarkStore.update((items) => items.filter((item) => item.id !== id));
}

export function updateBookmark(id: string, updates: Partial<Bookmark>) {
	bookmarkStore.update((items) =>
		items.map((item) => (item.id === id ? { ...item, ...updates } : item))
	);
}
