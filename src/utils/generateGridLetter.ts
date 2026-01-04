import { letters } from "../constants/game";

export function generateGridLetters() {
    return letters.charAt(Math.floor(Math.random() * letters.length));
}
