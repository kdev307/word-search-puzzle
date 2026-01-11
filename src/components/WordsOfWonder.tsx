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
import GameInformation from './GameInformation';
import { formatTime } from '../utils/formatTime';
import Result from './Result';
import { backgroundCelebration, blastCelebration, stopAllConfetti } from '../utils/celebrations';

function WordsOfWonder() {
    const { grid, loading, dispatch, score, timeTaken, words, wordsFound } = useWOW();
    const [modal, setModal] = useState<{
        open: boolean;
        type: 'info' | 'result' | null;
    }>({
        open: false,
        type: null,
    });

    useEffect(() => {
        dispatch({ type: ACTIONS.LOADING, payload: true });

        const existingSession = sessionStorage.getItem(GAME_SESSION_KEY);

        if (!existingSession) {
            const selectedWords = getRandomWords((rows * columns) / 7);
            const { grid, words } = generateGrid(rows, columns, selectedWords);

            dispatch({
                type: ACTIONS.NEW_GAME,
                payload: { grid, words },
            });
        } else {
            dispatch({ type: ACTIONS.LOADING, payload: false });
        }
    }, [dispatch]);

    useEffect(() => {
        if (!words || !wordsFound) return;
        if (words.length > 0 && wordsFound.length === words.length) {
            dispatch({ type: ACTIONS.FINISH_GAME });
            setModal({ open: true, type: 'result' });
            stopAllConfetti();
            backgroundCelebration();
            blastCelebration();
        }
    }, [dispatch, wordsFound, words]);

    const handleNewGame = () => {
        stopAllConfetti();
        setModal({ open: false, type: null });
        const selectedWords = getRandomWords((rows * columns) / 7);
        const { grid: wordGrid, words: wordsInGrid } = generateGrid(rows, columns, selectedWords);

        dispatch({
            type: ACTIONS.NEW_GAME,
            payload: { grid: wordGrid, words: wordsInGrid },
        });
    };

    const handleRestartGame = () => {
        stopAllConfetti();
        setModal({ open: false, type: null });
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
                                onClick={() => setModal({ open: true, type: 'info' })}
                            />
                            <Modal
                                isOpen={modal.open && modal.type === 'info'}
                                onClose={() => setModal({ open: false, type: null })}
                            >
                                <GameInformation />
                            </Modal>
                        </>
                    </div>
                    <div className="flex items-center justify-center gap-10">
                        <Title as="h2" style="text-2xl text-center font-semibold text-gray-400">
                            Score: {score}
                        </Title>

                        <Title as="h2" style="text-2xl text-center font-semibold text-gray-400">
                            Time: {formatTime(timeTaken)}
                        </Title>
                    </div>
                    <div className="flex items-start justify-center gap-10">
                        <div className="rounded-2xl bg-gray-600 p-2">
                            <Grid grid={grid} />
                        </div>
                        <div className="flex w-full flex-col items-center justify-center gap-5">
                            <div className="flex w-full items-center justify-center gap-10">
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
                    </div>
                    <Modal
                        isOpen={modal.open && modal.type === 'result'}
                        onClose={() => setModal({ open: false, type: null })}
                    >
                        <Result
                            onHandleNewGame={handleNewGame}
                            onHandleRestartGame={handleRestartGame}
                        />
                    </Modal>
                </>
            )}
        </div>
    );
}

export default WordsOfWonder;
