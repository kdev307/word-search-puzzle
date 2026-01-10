/**
 * Generates a bright, vibrant random color in hex format.
 * Uses HSL to ensure high saturation & medium/light brightness.
 */

function hslToHex(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const r = Math.round(f(0) * 255);
    const g = Math.round(f(8) * 255);
    const b = Math.round(f(4) * 255);

    return (
        '#' +
        [r, g, b]
            .map((x) => x.toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase()
    );
}

function getBrightColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 80;
    const lightness = 40;

    return hslToHex(hue, saturation, lightness);
}

export function generateColorPalette(count: number) {
    const colors = new Set();

    while (colors.size < count) {
        colors.add(getBrightColor());
    }

    return Array.from(colors);
}
