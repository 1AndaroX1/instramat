/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
	let page = parseInt(url.searchParams.get('page'));
	page = isNaN(page) ? 1 : page;

	const search = url.searchParams.get('search');

	const category = url.searchParams.get('category');
	const subCategory = url.searchParams.get('sub-category');
	const type = url.searchParams.get('type');

	let filter = [];

	//фильтр-фильтрует

	if (category) filter.push(`category.slug = "${category}"`);
	if (subCategory) filter.push(`subCategory.slug = "${subCategory}"`);
	if (type) filter.push(`type.slug = "${type}"`);

	const result = await locals.ms.index('products').search(search ?? '', {
		filter: filter.join(' AND '),
		hitsPerPage: 8,
		page: page
	});
	console.log(result);

	return {
		result: result.hits.map((el) => {
			return {
				...el,
				picture: locals.pb.files.getUrl(el, el.picture)
			};
		}),
		totalItems: result.totalHits,
		totalPages: Math.ceil(result.totalHits / 8),
		page
	};
}
