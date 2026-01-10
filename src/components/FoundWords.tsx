import useWOW from '../hooks/useWOW';
import Title from './Title';

function FoundWords() {
    const { words, wordsFound } = useWOW();
    return (
        <div className="flex h-full flex-col items-center gap-4 rounded-2xl bg-gray-600 px-6 py-4 text-gray-100 shadow-xl md:w-3/4">
            <Title as="h2" style="text-2xl font-bold text-gray-200 tracking-wide">
                Words to Find ({wordsFound.length}/{words.length})
            </Title>

            <ul className="scrollbar flex max-h-150 w-full flex-col gap-3 overflow-auto pr-3">
                {words.map((word) => {
                    const isFound = wordsFound.some((found) => found.word === word);
                    return (
                        <li
                            key={word}
                            className={`rounded-xl px-4 py-2 text-center text-xl font-semibold transition-all duration-200 ${
                                isFound
                                    ? 'cursor-not-allowed bg-gray-700 text-gray-300'
                                    : 'cursor-pointer bg-gray-900 text-gray-100 hover:bg-gray-200 hover:text-gray-800'
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
