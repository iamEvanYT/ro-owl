export async function POST() {
    const response = await fetch('https://apis.roblox.com/auth-token-service/v1/login/create', {
        method: "POST",
        cache: "no-cache"
    });

    const data = await response.json();
    return Response.json(data);
}