import { NextApiRequest, NextApiResponse } from "next";
import { createProxyServer } from "http-proxy";
import { updateQueryStringParameter as updateQuery  } from "@helpers";

const BACK_END_BASE_URL = process.env.BACK_END_BASE_URL;
const BACK_END_API_KEY = process.env.BACK_END_API_KEY ?? "";

const proxy = createProxyServer();

export const config = { 
  api: {
    bodyParser: false,
  },
};

export default (clientReq: NextApiRequest,clientRes: NextApiResponse): Promise<void> => {

  return new Promise<void>((resolve, reject) => {
  
    // Rewrite URL, strip out leading '/api'
    // '/api/proxy/*' becomes '${BACK_END_BASE_URL}/*'
    clientReq.url = `${BACK_END_BASE_URL}${clientReq.url!.replace(/^\/api\/proxy/,"")}`;

    // Don't forward cookies to API
    clientReq.headers.cookie = "";

    // Set api-key query from .env.local
    clientReq.url = updateQuery(clientReq.url,'key',BACK_END_API_KEY);
  
    proxy
      .once("proxyRes",() => {})
      .once("error", reject)
      .web(
        clientReq,
        clientRes,
        {
          target: BACK_END_BASE_URL,
          secure: true, // Depends on your needs, could be false.
          autoRewrite: false,
          selfHandleResponse: false,
          changeOrigin: true,
        },
        reject
      );
    proxy.on("error", () => reject);
  });
};
