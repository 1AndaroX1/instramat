import { POCKETBASE_URL } from '$env/static/private';
import { MEILISEARCH_URL } from '$env/static/private';
import { MEILISEARCH_MASTERKEY } from '$env/static/private';
import PocketBase from 'pocketbase';
import { MeiliSearch } from 'meilisearch';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(POCKETBASE_URL);
	event.locals.ms = new MeiliSearch({
		host: MEILISEARCH_URL,
		apiKey: MEILISEARCH_MASTERKEY
	});
	const response = await resolve(event);
	return response;
};
