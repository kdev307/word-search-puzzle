import { ArrowPathIcon, PlusIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/20/solid';
import Button from './Button';
import Title from './Title';
import useWOW from '../hooks/useWOW';
import { formatTime } from '../utils/formatTime';

interface ResultProps {
    onHandleNewGame: () => void;
    onHandleRestartGame: () => void;
}

function Result({ onHandleNewGame, onHandleRestartGame }: ResultProps) {
    const { score, timeTaken, words } = useWOW();
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center justify-center gap-6">
                <SparklesIcon className="size-10 animate-bounce" />
                <TrophyIcon className="size-10 animate-ping" />
                <Title as="h2" style="text-3xl font-bold text-center text-gray-900 animate-pulse">
                    Congratulations
                </Title>
                <TrophyIcon className="size-10 animate-ping" />
                <SparklesIcon className="size-10 animate-bounce" />
            </div>
            <p className="text-lg text-gray-700">You found all the words.</p>
            <div className="flex items-center justify-center gap-32">
                <Title
                    as="h3"
                    style="text-xl font-semibold mb-3 text-center text-gray-800 !normal-case "
                >
                    Score: {score}
                </Title>
                <Title
                    as="h3"
                    style="text-xl font-semibold mb-3 text-center text-gray-800 !normal-case "
                >
                    Time taken: {formatTime(timeTaken)}
                </Title>
                <Title
                    as="h3"
                    style="text-xl font-semibold mb-3 text-center text-gray-800 !normal-case "
                >
                    Hints used: {words.length - score / 10}
                </Title>
            </div>
            <div className="flex items-center justify-center gap-20">
                <Button
                    icon={<PlusIcon className="size-8" />}
                    text="New Game"
                    style="bg-gray-700 text-white w-full !gap-14"
                    onClick={onHandleNewGame}
                />
                <Button
                    icon={<ArrowPathIcon className="size-8" />}
                    text="Restart Game"
                    style="bg-gray-700 text-white w-full !gap-14"
                    onClick={onHandleRestartGame}
                />
            </div>
        </div>
    );
}

export default Result;
