import { page } from '$app/stores';
import { error } from '@sveltejs/kit';
import { parse } from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
	console.log(locals);
	let page = parseInt(url.searchParams.get('page'));
	page = isNaN(page) ? 1 : page;

	const result = await locals.pb.collection('products').getList(page, 8);
	console.log(result);
	return {
		result: result.items.map((el) => {
			return {
				...el,
				picture: locals.pb.files.getUrl(el, el.pictures[0])
			};
		}),
		totalItems: result.totalItems,
		totalPages: 200,
		page
	};
}
