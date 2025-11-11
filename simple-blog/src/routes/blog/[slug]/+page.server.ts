import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		post: {
			title: `Judul untuk Artikel: ${params.slug}`,
			content: `Ini adalah isi konten untuk artikel dengan slug "${params.slug}". Konten ini bisa datang dari CMS atau file markdown.`,
			slug: params.slug,
		},
	};
};
