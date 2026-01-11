import { ArrowPathIcon, PlusIcon } from '@heroicons/react/20/solid';
import Button from './Button';
import Title from './Title';
import useWOW from '../hooks/useWOW';

interface ResultProps {
    onHandleNewGame: () => void;
    onHandleRestartGame: () => void;
}

function Result({ onHandleNewGame, onHandleRestartGame }: ResultProps) {
    const { score, time, words } = useWOW();
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Title as="h2" style="text-3xl font-bold mb-3 text-center text-gray-900 animate-pulse">
                Congratulations!
            </Title>
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
                    Time taken: {time}
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
