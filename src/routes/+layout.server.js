/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	const categories = await locals.pb.collection('categories').getFullList({});
	console.log(categories);
	const subCategories = await locals.pb
		.collection('subCategories')
		.getFullList({ expand: 'category' });
	const types = await locals.pb.collection('types').getFullList({
		expand: 'subCategory'
	});

	return {
		categories: categories.map((el) => ({
			...el
		})),
		subCategories: subCategories.map((el) => ({
			title: el.title,
			slug: el.slug,
			category: { ...el.expand.category }
		})),
		types: types.map((el) => ({
			title: el.title,
			slug: el.slug,
			subCategory: { ...el.expand.subCategory }
		}))
	};
}
