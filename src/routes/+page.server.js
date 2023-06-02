/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
	const result = await locals.ms.index('products').search('', {
		filter: ['discount > 0'],
		hitsPerPage: 16
	});

	return {
		result: result.hits.map((el) => {
			return {
				...el,
				picture: locals.pb.files.getUrl(el, el.picture)
			};
		}),
		totalItems: result.totalHits,
		totalPages: Math.ceil(result.totalHits / 8)
	};
}
