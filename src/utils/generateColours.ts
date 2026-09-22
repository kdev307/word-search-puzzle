/**
 * Generates a bright, vibrant random color in hex format.
 * Uses HSL to ensure high saturation & medium/light brightness.
 */
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);

    const f = (n: number) =>
        l -
        a *
        Math.max(
            -1,
            Math.min(k(n) - 3, Math.min(9 - k(n), 1)),
        );

    const rgb = [f(0), f(8), f(4)].map((value) =>
        Math.round(value * 255),
    );

    return `#${rgb
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()}`;
}

export function generateColorPalette(count: number): string[] {
    if (count <= 0) return [];

    const colors: string[] = [];

    // Golden-ratio distribution gives better spacing
    // than simply dividing 360 / count.
    const goldenRatio = 0.618033988749895;

    let hue = 0;

    for (let i = 0; i < count; i++) {
        hue = (hue + goldenRatio * 360) % 360;

        // Keep colors vivid but not excessively bright.
        const saturation = 75;
        const lightness = 45;

        colors.push(hslToHex(hue, saturation, lightness));
    }

    return colors;
}
