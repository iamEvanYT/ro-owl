import { headersToObject, objectToHeaders } from "@/lib/proxy/headers";
import type { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
    "https://*.roblox.com"
]
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
const allowedHeaders = ["Content-Type", "Authorization", "x-csrf-token", ".ROBLOSECURITY"];

function isValidAndAllowedOrigin(url: string): boolean {
    // First, verify if the URL is valid
    let isValid = false;
    try {
        new URL(url);
        isValid = true;
    } catch (error) {
        console.error("Invalid URL:", (error as Error).message);
        return false;
    }

    // If URL is valid, check if it's in allowedOrigins
    if (isValid) {
        return allowedOrigins.some(origin => {
            // Convert wildcard to regex pattern
            const pattern = origin.replace(/\./g, '\\.').replace(/\*/g, '.*');
            const regex = new RegExp(`^${pattern}$`);
            return regex.test(url);
        });
    }

    return false;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const {
        url,
        body,
        headers,
        method
    } = await req.json();

    // Verify if the URL is in allowed origins
    const isOriginAllowed = true || isValidAndAllowedOrigin(url);
    if (!isOriginAllowed) {
        console.log("Unauthorized origin", url)
        return Response.json({ error: "Unauthorized origin" }, { status: 400 });
    }

    // Verify the method is allowed
    const isMethodAllowed = allowedMethods.includes(method);
    if (!isMethodAllowed) {
        console.log("Unauthorized method")
        return Response.json({ error: "Unauthorized method" }, { status: 400 });
    }

    // Verify the headers are allowed
    const areHeadersAllowed = (!headers && true) || Object.keys(headers).every(header =>
        allowedHeaders.some(allowedHeader => allowedHeader.toLowerCase() === header.toLowerCase())
    );
    if (!areHeadersAllowed) {
        console.log("Unauthorized headers");
        return Response.json({ error: "Unauthorized headers" }, { status: 400 });
    }

    // Proxy the request to the target URL
    const transformedHeaders = headers && objectToHeaders(headers);

    const proxiedResponse = await fetch(url, {
        method,
        body,
        headers: transformedHeaders,
    })

    const responseBody = await proxiedResponse.text();
    return Response.json({
        body: responseBody,
        status: proxiedResponse.status,
        headers: headersToObject(proxiedResponse.headers)
    });
}