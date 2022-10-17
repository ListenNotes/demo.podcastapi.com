const {ClientForWorkers} = require('podcast-api');

export async function onRequest(context) {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    // params, // if filename includes [id] or [[path]]
    // waitUntil, // same as ctx.waitUntil in existing Worker API
    // next, // used for middleware or to fetch assets
    // data, // arbitrary space for passing data between middlewares
  } = context;

  const client = ClientForWorkers({
    apiKey: env.LISTEN_API_KEY || null,
  });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const sortByDate = searchParams.get('sort_by_date') || '0';
  const type = searchParams.get('type') || 'episode';
  const offset = searchParams.get('offset') || '0';

  try {
    const res = await client.search({
      q,
      sort_by_date: sortByDate,
      type,
      offset,
    });
    return new Response(JSON.stringify(res.data), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    return new Response('{}', {status: error.response.status});
  }
}
