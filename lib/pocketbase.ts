import { GetServerSidePropsContext, PreviewData } from 'next/types';
import PocketBase from 'pocketbase';
import { ParsedUrlQuery } from 'querystring';

export const pb = new PocketBase('https://dreampad2.fly.dev/');
// you can place this helper in a separate file so that it can be reused
export async function initPocketBase(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const { req, res } = context;
    // load the store data from the request cookie string
    pb.authStore.loadFromCookie(req?.headers?.cookie || '');

    // send back the default 'pb_auth' cookie to the client with the latest store state
    res?.setHeader('set-cookie', pb.authStore.exportToCookie());

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && (await pb.collection('users').authRefresh());
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
    }

    return pb;
}
