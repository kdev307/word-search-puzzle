import { toast } from 'react-toastify';
import { ACTIONS } from '../constants/actions';
import useWOW from '../hooks/useWOW';
import type { Word } from '../types';
import Title from './Title';
import ToastHint from './ToastHint';

function FoundWords() {
    const { words, wordsFound } = useWOW();

    return (
        <div className="flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-gray-600 px-6 py-4 text-gray-100 shadow-xl">
            <Title as="h2" style="text-2xl font-bold text-gray-200 tracking-wide">
                Words to Find ({wordsFound.length}/{words.length})
            </Title>

            <ul className="scrollbar flex max-h-140 w-full flex-col gap-3 overflow-auto pr-3">
                {words.map((word) => {
                    const isFound = wordsFound.some((found) => found.word === word.word);
                    return <Word key={word.word} word={word} isFound={isFound} />;
                })}
            </ul>
        </div>
    );
}

interface WordProps {
    word: Word;
    isFound: boolean;
}

function Word({ word, isFound }: WordProps) {
    const { dispatch } = useWOW();
    const handleHint = () => {
        dispatch({ type: ACTIONS.NEED_HELP, payload: word });
        toast.info(
            <ToastHint
                word={word.word}
                startingCoord={word.startingCoord}
                direction={word.direction}
            />,
            {
                className: 'w-full rounded-xl',
                icon: false,
                autoClose: 3000,
                closeOnClick: true,
                hideProgressBar: true,
            },
        );
    };
    return (
        <li
            className={`rounded-xl px-4 py-2 text-center text-xl font-semibold transition-all duration-200 ${
                isFound
                    ? 'cursor-not-allowed bg-gray-700 text-gray-300'
                    : 'cursor-pointer bg-gray-900 text-gray-100 hover:bg-gray-200 hover:text-gray-800'
            } `}
            onClick={handleHint}
        >
            {word?.word?.toUpperCase()}
        </li>
    );
}

export default FoundWords;
