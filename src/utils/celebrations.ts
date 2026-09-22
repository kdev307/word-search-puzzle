import confetti from 'canvas-confetti';

let backgroundInterval: number | null = null;
let isCentralRunning: boolean = false;

export function stopAllConfetti() {
    if (backgroundInterval) {
        clearInterval(backgroundInterval);
        backgroundInterval = null;
    }
    isCentralRunning = false;
}

export function blastCelebration() {
    if (isCentralRunning) return;

    isCentralRunning = true;
    confetti({
        startVelocity: 50,
        particleCount: 500,
        spread: 180,
        origin: { y: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        shapes: ['circle', 'square'],
        gravity: 0.8,
        ticks: 150,
    });

    setTimeout(() => {
        isCentralRunning = false;
    }, 2000);
}

export function backgroundCelebration() {
    if (backgroundInterval) return;

    backgroundInterval = setInterval(() => {
        confetti({
            particleCount: 20,
            spread: 70 + Math.random() * 40,
            startVelocity: 20 + Math.random() * 10,
            gravity: 0.8,
            ticks: 200,
            origin: {
                x: Math.random(),
                y: -0.1,
            },
            colors: ['#c0c0c0', '#000000', '#ffffff'],
            shapes: ['circle', 'square'],
        });
    }, 60);
}
