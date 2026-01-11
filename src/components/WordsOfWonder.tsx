import { useState, useEffect } from 'react';
import { ArrowPathIcon, InformationCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import Button from './Button';
import Title from './Title';
import Grid from './Grid';
import useWOW from '../hooks/useWOW';
import { columns, GAME_SESSION_KEY, rows } from '../constants/game';
import { generateGrid } from '../utils/generateGrid';
import { ACTIONS } from '../constants/actions';
import Loader from './Loader';
import { getRandomWords } from '../utils/getRandomWords';
import FoundWords from './FoundWords';
import Modal from './Modal';

function WordsOfWonder() {
    const { grid, loading, dispatch, score } = useWOW();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch({ type: ACTIONS.LOADING, payload: true });

        const existingSession = sessionStorage.getItem(GAME_SESSION_KEY);

        if (!existingSession) {
            const selectedWords = getRandomWords((rows * columns) / 5);
            const { grid, words } = generateGrid(rows, columns, selectedWords);

            dispatch({
                type: ACTIONS.NEW_GAME,
                payload: { grid, words },
            });
        } else {
            dispatch({ type: ACTIONS.LOADING, payload: false });
        }
    }, [dispatch]);

    const handleNewGame = () => {
        const selectedWords = getRandomWords((rows * columns) / 5);
        const { grid: wordGrid, words: wordsInGrid } = generateGrid(rows, columns, selectedWords);

        dispatch({
            type: ACTIONS.NEW_GAME,
            payload: { grid: wordGrid, words: wordsInGrid },
        });
    };

    const handleRestartGame = () => {
        dispatch({ type: ACTIONS.RESET_GAME });
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-800">
            {loading ? (
                <Loader rows={rows} columns={columns} />
            ) : (
                <>
                    <div className="flex items-center justify-center gap-10 px-4">
                        <Title as="h1" style="text-4xl text-center font-bold text-gray-200">
                            Words of Wonder
                        </Title>
                        <>
                            <InformationCircleIcon
                                className="size-10 cursor-pointer text-gray-200"
                                onClick={() => setOpen(true)}
                            />
                            <Modal isOpen={open} onClose={() => setOpen(false)}>
                                <section aria-labelledby="info-heading">
                                    <header>
                                        <h2 id="info-heading" className="mb-3 text-xl font-bold">
                                            Information
                                        </h2>
                                    </header>

                                    <article className="space-y-4 text-gray-700">
                                        <p>
                                            Welcome to the <strong>Words of Wonder</strong>! Your
                                            objective is to find all the hidden words listed beside
                                            the puzzle grid. Words may appear horizontally,
                                            vertically, or diagonally in any straight-line
                                            direction.
                                        </p>

                                        <section>
                                            <h3 className="mb-1 font-semibold">How to Play</h3>
                                            <ul className="ml-5 list-disc space-y-1">
                                                <li>
                                                    Click or tap on a letter to start selecting.
                                                </li>
                                                <li>
                                                    Drag in a straight-line direction (horizontal,
                                                    vertical, or diagonal).
                                                </li>
                                                <li>
                                                    If your selection matches a word from the list,
                                                    the word is highlighted and marked as found.
                                                </li>
                                                <li>
                                                    Found words get their own color, making overlaps
                                                    easy to understand.
                                                </li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="mb-1 font-semibold">Word List</h3>
                                            <p>
                                                The words you need to find appear in the list beside
                                                the grid. When you find a word, it is automatically
                                                marked as completed. Clicking a word in the list
                                                (after finding it manually) grants you points.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="mb-1 font-semibold">Hints</h3>
                                            <p>
                                                If you get stuck, you can use a hint. A hint will
                                                always{' '}
                                                <strong>reveal the full word on the grid</strong>.
                                                However, using a hint comes with a cost: you will{' '}
                                                <strong>not earn points</strong>
                                                for that word. Clicking a hint-revealed word in the
                                                word list will not award score. Use hints
                                                strategically to progress without losing too many
                                                potential points.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="mb-1 font-semibold">Scoring</h3>
                                            <ul className="ml-5 list-disc space-y-1">
                                                <li>
                                                    <strong>Manual Find:</strong> Selecting a word
                                                    yourself → <strong>earns 10 points</strong>.
                                                </li>
                                                <li>
                                                    <strong>Hint Reveal:</strong> Word uncovered by
                                                    hint → <strong>0 points</strong>.
                                                </li>
                                                <li>
                                                    You can only claim points for words you
                                                    personally find (not hint-revealed ones).
                                                </li>
                                            </ul>
                                        </section>

                                        <footer className="mt-4">
                                            <p>
                                                Find all the words and aim for the highest score.
                                                Good luck!
                                            </p>
                                        </footer>
                                    </article>
                                </section>
                            </Modal>
                        </>
                    </div>
                    <div className="flex items-center justify-center gap-10">
                        <Title as="h2" style="text-2xl text-center font-semibold text-gray-400">
                            Score: {score}
                        </Title>
                        {/* <Title as="h2" style="text-2xl text-center font-semibold text-gray-400">
          High Score: {score}
        </Title> */}
                        {/* <Title
                as="h2"
                style="text-2xl text-center font-semibold text-gray-400"
              >
                Timer: {timer}
              </Title> */}
                    </div>
                    <div className="flex items-center justify-center gap-10">
                        <>
                            <div className="rounded-2xl bg-gray-600 p-2">
                                <Grid grid={grid} />
                            </div>
                            <div className="flex w-full flex-col items-center justify-center gap-4">
                                <div className="flex w-full items-center justify-center gap-10 py-5">
                                    <Button
                                        icon={<PlusIcon className="size-8" />}
                                        text="New Game"
                                        style="bg-gray-700 text-white w-full"
                                        onClick={handleNewGame}
                                    />
                                    <Button
                                        icon={<ArrowPathIcon className="size-8" />}
                                        text="Restart Game"
                                        style="bg-gray-700 text-white w-full"
                                        onClick={handleRestartGame}
                                    />
                                </div>
                                <FoundWords />
                            </div>
                        </>
                    </div>
                </>
            )}
        </div>
    );
}

export default WordsOfWonder;
