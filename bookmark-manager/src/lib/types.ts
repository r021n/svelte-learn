export interface Bookmark {
	id: string;
	url: string;
	title: string;
	tags: string[];
	favicon?: string;
	createdAt: number;
}
