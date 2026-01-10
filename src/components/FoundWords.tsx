import useWOW from '../hooks/useWOW';
import Title from './Title';

function FoundWords() {
    const { words, wordsFound } = useWOW();
    return (
        <div className="flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-gray-600 px-6 py-4 text-gray-100 shadow-xl">
            <Title as="h2" style="text-2xl font-bold text-gray-200 tracking-wide">
                Words to Find ({wordsFound.length}/{words.length})
            </Title>

            <ul className="grid w-full grid-cols-1 gap-3">
                {words.map((word) => {
                    const isFound = wordsFound.some(foundWord => foundWord.word === word);
                    return (
                        <li
                            key={word}
                            className={`rounded-xl px-4 py-2 text-center text-xl font-semibold transition-all duration-200 ${
                                isFound
                                    ? 'animate-pulse bg-gray-900 text-gray-100'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-200 hover:text-gray-800'
                            } `}
                        >
                            {word.toUpperCase()}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default FoundWords;
