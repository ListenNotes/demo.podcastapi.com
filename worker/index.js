import {handleSearchRequest} from '../server/search';

function isSearchRoute(pathname) {
  return pathname === '/api/search' || pathname === '/api/search/';
}

export default {
  async fetch(request, env) {
    const {pathname} = new URL(request.url);

    if (isSearchRoute(pathname)) {
      return handleSearchRequest(request, env);
    }

    if (pathname.startsWith('/api/')) {
      return new Response('{}', {
        status: 404,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
