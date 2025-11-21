import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const filter = url.searchParams.get('filter') || 'all';

	return { filter };
};
