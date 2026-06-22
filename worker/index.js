import podcastApi from 'podcast-api';

const {ClientForWorkers} = podcastApi;

const JSON_HEADERS = {
  'content-type': 'application/json;charset=UTF-8',
};

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers || {}),
    },
  });
}

function readSearchParams(request) {
  const {searchParams} = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  return {
    q,
    sort_by_date: searchParams.get('sort_by_date') || '0',
    type: searchParams.get('type') || 'episode',
    offset: searchParams.get('offset') || '0',
  };
}

async function handleSearch(request, env) {
  const params = readSearchParams(request);
  if (!params.q) {
    return jsonResponse({error: 'Missing q parameter.'}, {status: 400});
  }

  const client = ClientForWorkers({
    apiKey: env.LISTEN_API_KEY || null,
  });

  try {
    const response = await client.search(params);
    const data = {...response.data};
    if (!env.LISTEN_API_KEY) {
      data.from_mock_server = true;
    }
    return jsonResponse(data);
  } catch (error) {
    return jsonResponse({}, {status: error?.response?.status || 500});
  }
}

export default {
  async fetch(request, env) {
    const {pathname} = new URL(request.url);

    if (pathname === '/api/search' || pathname === '/api/search/') {
      return handleSearch(request, env);
    }

    if (pathname.startsWith('/api/')) {
      return jsonResponse({error: 'Not found.'}, {status: 404});
    }

    return env.ASSETS.fetch(request);
  },
};
