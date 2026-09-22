export function directionToText(dx: number, dy: number): string {
    if (dx === 0 && dy === 1) return 'Left → Right (→)';
    if (dx === 0 && dy === -1) return 'Right → Left (←)';

    if (dx === 1 && dy === 0) return 'Top → Bottom (↓)';
    if (dx === -1 && dy === 0) return 'Bottom → Top (↑)';

    if (dx === 1 && dy === 1) return 'Top-left → Bottom-right (↘)';
    if (dx === -1 && dy === -1) return 'Bottom-right → Top-left (↖)';

    if (dx === 1 && dy === -1) return 'Top-right → Bottom-left (↙)';
    if (dx === -1 && dy === 1) return 'Bottom-left → Top-right (↗)';

    return 'Unknown Direction';
}
