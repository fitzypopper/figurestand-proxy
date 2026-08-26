const PROXY_TARGET = "https://figurestand.workerlo.workers.dev";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Proxy all paths to the target
    const targetUrl = new URL(url.pathname + url.search, PROXY_TARGET);

    // Clone the request and change the URL
    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow",
    });

    const response = await fetch(proxyRequest);

    // Clone response and rewrite any absolute URLs in HTML responses
    const newResponse = new Response(response.body, response);
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("text/html")) {
      const html = await response.text();
      const rewritten = html.replace(
        new RegExp(PROXY_TARGET, "g"),
        url.origin
      );
      return new Response(rewritten, {
        status: response.status,
        headers: response.headers,
      });
    }

    return newResponse;
  },
};
