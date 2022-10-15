const {Client} = require('podcast-api-cloudflare-workers');

export async function onRequest(context) {
    // Contents of context object
    // const {
    //   request, // same as existing Worker API
    //   env, // same as existing Worker API
    //   params, // if filename includes [id] or [[path]]
    //   waitUntil, // same as ctx.waitUntil in existing Worker API
    //   next, // used for middleware or to fetch assets
    //   data, // arbitrary space for passing data between middlewares
    // } = context;

    const client = Client();
    const term = 'elon musk';
    const res = await client.search({
        q: term,
    });
    const results = await res.json();
    return new Response(JSON.stringify(results), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}
