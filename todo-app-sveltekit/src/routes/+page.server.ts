import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = request.formData();
		const text = (await formData).get('text')?.toString();

		if (!text || text.trim().length === 0) {
			return fail(400, {
				error: true,
				message: 'Teks tidak boleh kosong'
			});
		}

		return { success: true, text };
	}
};
