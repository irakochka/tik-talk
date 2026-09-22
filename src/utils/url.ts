const BASE_URL = import.meta.env.DEV
    ? '/yt-course'
    : 'https://icherniakov.ru/yt-course';

export function toPublicUrl(path: string): string {
    const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
    const clean = path.replace(/^\/+/, '');

    return `${base}/${clean}`;
}

function isExternalOrSpecial(url: string) {
    return (
        url.startsWith('data:') ||
        url.startsWith('blob:') ||
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('//')
    );
}

export function toAssetUrl(path: string | null | undefined): string | null {
    if (!path) return null;

    const p = path.trim();
    if (!p) return null;

    if (isExternalOrSpecial(p)) return p;

    if (p === BASE_URL || p.startsWith(BASE_URL + '/')) return p;

    const base = BASE_URL.replace(/\/+$/, '');
    const clean = p.replace(/^\/+/, '');

    return `${base}/${clean}`;
}
