/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	return { ...(await locals.pb.collection('products').getOne(params.id)) };
}
