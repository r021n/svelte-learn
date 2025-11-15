export type Theme = 'light' | 'dark';

let currentTheme = $state<Theme>('light');

export const theme = {
	get current() {
		return currentTheme;
	},
	toggle() {
		currentTheme = currentTheme === 'light' ? 'dark' : 'light';
	},
};
