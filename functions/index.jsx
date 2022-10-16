import React from "react";
import ReactDOMServer from "react-dom/server";

class HelloMessage extends React.Component {
  render() {
    return <div>Hello, {this.props.name} from React server-side rendering</div>;
  }
}

class ServerSideElementHandler {
  async element(element) {
    const fromReact = ReactDOMServer.renderToString(<HelloMessage name="World" />);
    element.replace(
      '<div class="text-xl font-bold">Rendered from Functions (server-side)</div>' + fromReact,
      { html: true });
  }
}

export async function onRequest({request, env, params, waitUntil, next, data}) {
  //   request, // same as existing Worker API
  //   env, // same as existing Worker API
  //   params, // if filename includes [id] or [[path]]
  //   waitUntil, // same as ctx.waitUntil in existing Worker API
  //   next, // used for middleware or to fetch assets
  //   data, // arbitrary space for passing data between middlewares

  const response = await next();
  // const responseText = await response.text();
  const newResponse = new Response(response.body, response);
  newResponse.headers.append('x-workers-hello', 'Hello from Cloudflare Workers');
  return new HTMLRewriter().on('div#server-root', new ServerSideElementHandler()).transform(newResponse);
}
