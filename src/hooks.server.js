import {POCKETBASE_URL} from "$env/static/private"
import PocketBase from 'pocketbase'
export const handle = async ({event, resolve}) => {
    event.locals.pb = new PocketBase(POCKETBASE_URL)
    const response = await resolve(event)
    return response
}