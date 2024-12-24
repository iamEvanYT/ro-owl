export function headersToObject(headers: Headers): Record<string, string> {
    // Create an empty object to store the result
    const headersObject: Record<string, string> = {};

    // Iterate over the headers and add them to the object
    headers.forEach((value, key) => {
        headersObject[key] = value;
    });

    return headersObject;
}

export function headersInitToObject(headersInit: HeadersInit): Record<string, string> {
    // Create a new Headers object from the HeadersInit
    const headers = new Headers(headersInit);
    return headersToObject(headers);
}

export function objectToHeaders(headersObject: Record<string, string>): Headers {
    // Create a new Headers object
    const headers = new Headers();

    // Iterate over the object and add each key-value pair to the Headers object
    for (const [key, value] of Object.entries(headersObject)) {
        headers.append(key, value);
    }

    return headers;
}
