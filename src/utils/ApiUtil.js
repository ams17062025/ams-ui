
export async function getCall(url, requestParam) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    return res.json();
}
 