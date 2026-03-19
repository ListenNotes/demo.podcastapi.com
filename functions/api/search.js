import {handleSearchRequest} from '../../server/search';

export async function onRequest(context) {
  const {request, env} = context;
  return handleSearchRequest(request, env);
}
