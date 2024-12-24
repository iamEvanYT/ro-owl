import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const response = await fetch('https://apis.roblox.com/auth-token-service/v1/login/status', {
        method: "POST",
        cache: "no-cache",

        body: JSON.stringify(body),
        headers: {
            'x-csrf-token': body.csrfToken,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (typeof data == "string"){
        return new Response(data);
    }

    return Response.json({
        'csrfToken': response.headers.get("x-csrf-token"),
        ...data
    });
}