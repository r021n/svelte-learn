import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function timeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' });

	if (seconds < 60) return 'baru saja';
	if (seconds < 3600) return rtf.format(-Math.floor(seconds / 60), 'minute');
	if (seconds < 86400) return rtf.format(-Math.floor(seconds / 3600), 'hour');
	if (seconds < 604800) return rtf.format(-Math.floor(seconds / 86400), 'day');

	return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}
