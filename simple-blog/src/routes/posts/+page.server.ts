import { postsSchema } from '$lib/schemas';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts');

		setHeaders({
			'cache-control': 'max-age=3600',
		});

		if (!res.ok) {
			throw error(res.status, 'Gagal mengambil data dari API');
		}

		const data = await res.json();

		const validatedPosts = postsSchema.parse(data);

		return {
			posts: validatedPosts.slice(0, 10),
		};
	} catch (err) {
		console.error('Load error:', err);
		if (err instanceof z.ZodError) {
			throw error(500, 'Data tidak valid: ' + err.issues[0].message);
		}
		throw error(500, 'Terjadi kesalahan saat memuat postingan');
	}
};
