import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Note } from '$lib/types';

const defaultValue: Note[] = [];
const initialValue = browser
	? JSON.parse(window.localStorage.getItem('notes') || JSON.stringify(defaultValue))
	: defaultValue;

const notes = writable<Note[]>(initialValue);

if (browser) {
	notes.subscribe((value) => {
		window.localStorage.setItem('notes', JSON.stringify(value));
	});
}

export const notesStore = {
	subscribe: notes.subscribe,
	addNote: (title: string, content: string, category: string) => {
		notes.update((currentNotes) => {
			const newNote: Note = {
				id: crypto.randomUUID(),
				title,
				content,
				category,
				date: new Date().toISOString()
			};

			return [newNote, ...currentNotes];
		});
	},
	deleteNote: (id: string) => {
		notes.update((currentNotes) => {
			return currentNotes.filter((note) => note.id !== id);
		});
	},
	updateNote: (id: string, title: string, content: string, category: string) => {
		notes.update((currentNotes) => {
			return currentNotes.map((note) => {
				if (note.id === id) {
					return { ...note, title, content, category, date: new Date().toISOString() };
				}

				return note;
			});
		});
	}
};
