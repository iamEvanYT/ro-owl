import { BASE_URL } from "@/configuration";
import { headersInitToObject, objectToHeaders } from "./headers";

async function fetchWithProxy(input: string | URL | globalThis.Request, init?: RequestInit) {
    const proxyBase = BASE_URL
    const proxyPath = "/api/proxy"

    const proxyUrl = new URL(proxyPath, proxyBase);

    const url = input;
    const body = init?.body;
    const headers = init?.headers && headersInitToObject(init?.headers);
    const method = init?.method || "GET";

    const payload = {
        url,
        body,
        headers,
        method
    }

    const response = await fetch(proxyUrl.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const {
        body: resultBody,
        status: resultStatus,
        headers: resultHeaders
    } = await response.json();

     // Create a fake response
     const fakeResponse = new Response(resultBody, {
        status: resultStatus,
        headers: objectToHeaders(resultHeaders)
    });

    return fakeResponse;
}

export async function requestWithProxy(input: string | URL | globalThis.Request, init?: RequestInit) {
    const hasExtension = false;
    if (!hasExtension) {
        return await fetchWithProxy(input, init);
    }

    // Proceed with the actual request
    return await fetch(input, {
        cache: "no-cache",
        mode: "cors",
        ...init
    });
}
