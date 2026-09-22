import wordsList from "../data/words.json";

export function getRandomWords(count: number = 5) {
    const allWords = wordsList.words;
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
