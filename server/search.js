const {ClientForWorkers} = require('podcast-api');

function getErrorStatus(error) {
  return error?.response?.status || 500;
}

export async function handleSearchRequest(request, env) {
  const client = ClientForWorkers({
    apiKey: env.LISTEN_API_KEY || null,
  });

  const {searchParams} = new URL(request.url);
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

    if (!env.LISTEN_API_KEY) {
      res.data.from_mock_server = true;
    }

    return new Response(JSON.stringify(res.data), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    return new Response('{}', {status: getErrorStatus(error)});
  }
}
