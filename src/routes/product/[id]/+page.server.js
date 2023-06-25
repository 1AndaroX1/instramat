/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const result = await locals.pb.collection('products').getOne(params.id);

	return {
		...result,
		picturesURLs: result.pictures.map((el) => locals.pb.files.getUrl(result, el))
	};
}
