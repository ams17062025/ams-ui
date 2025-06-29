
export async function getCall(url, requestParam) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return res.json();
}

export async function postCall(url, requestBody) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
    });
    if (!res.ok) throw new Error('Network error');
    return res.json();
}

export async function deleteCall(url, requestBody) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)
    });
    if (!res.ok) throw new Error('Network error');
    return res.json();
}