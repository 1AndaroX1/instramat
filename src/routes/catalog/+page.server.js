/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
	let page = parseInt(url.searchParams.get('page'));
	page = isNaN(page) ? 1 : page;

	const search = url.searchParams.get('search')

	const category = url.searchParams.get('category')
	const subCategory = url.searchParams.get('sub-category')
	const type = url.searchParams.get('type')

	let filter = []

	// поиск-поискует

	if (search && search?.length > 3 ) filter.push(`(name ~ "%${search}%" || description ~ "%${search}%")`)

	//фильтр-фильтырует

	if (category) filter.push(`category.slug ="${category}"`)
	if (subCategory) filter.push(`subCategory.slug ="${subCategory}"`)
	if (type) filter.push(`type.slug ="${type}"`)

	const result = await locals.pb.collection('products').getList(page, 8, {
		filter : filter.join("&&")
	});

	console.log(result);
	
	return {
		result: result.items.map((el) => {
			return {
				...el,
				picture: locals.pb.files.getUrl(el, el.pictures[0])
			};
		}),
		totalItems: result.totalItems,
		totalPages: Math.ceil(result.totalItems/8),
		page
	};
}
