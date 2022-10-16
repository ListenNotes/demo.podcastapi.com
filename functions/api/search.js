const {ClientForWorkers} = require('podcast-api');

export async function onRequest({request, env, params, waitUntil, next, data}) {
  //   request, // same as existing Worker API
  //   env, // same as existing Worker API
  //   params, // if filename includes [id] or [[path]]
  //   waitUntil, // same as ctx.waitUntil in existing Worker API
  //   next, // used for middleware or to fetch assets
  //   data, // arbitrary space for passing data between middlewares

  const client = ClientForWorkers({
    apiKey: env.LISTEN_API_KEY || null,
  });
  const term = 'elon musk';
  const res = await client.search({
    q: term,
  });
  return new Response(JSON.stringify(res.data), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}
