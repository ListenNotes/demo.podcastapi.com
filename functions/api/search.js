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

    const queryParams = new URLSearchParams({
        q: 'startup',
    });
    const url = `https://listen-api.listennotes.com/api/v2/search?${queryParams}`;

    // let formData = new FormData();
    // formData.append('name', 'John');
    // formData.append('password', 'John123');

    const config = {
        method: 'GET',
        headers: {
            'X-ListenAPI-Key': null,
        },
        // body: formData,
    };
    const res = await fetch(url, config);
    const results = await res.json();

    /*
    X-ListenAPI-FreeQuota: 25000
    X-ListenAPI-Usage: 19231
    X-listenAPI-Latency-Seconds: 0.056
    X-Listenapi-NextBillingDate: 2020-09-26T17:27:33.110641+00:00
     */
    console.log(res.headers.get('X-ListenAPI-FreeQuota'));

    return new Response(JSON.stringify(results), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}