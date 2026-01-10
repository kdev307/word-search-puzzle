import useWOW from '../hooks/useWOW';
import Title from './Title';

function FoundWords() {
    const { words } = useWOW();
    return (
        <div className="flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-gray-600 px-6 py-4 text-gray-100 shadow-xl">
            <Title as="h2" style="text-2xl font-bold text-gray-200 tracking-wide">
                Find These Words
            </Title>

            <ul className="grid w-full grid-cols-1 gap-3">
                {words.map((word) => {
                    return (
                        <li
                            key={word}
                            className="rounded-xl bg-gray-700 px-4 py-2 text-center text-xl font-semibold text-gray-300 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800"
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
