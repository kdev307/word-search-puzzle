import { useEffect } from 'react';
import {
    ArrowPathIcon,
    InformationCircleIcon,
    LightBulbIcon,
    PaperAirplaneIcon,
    PlusIcon,
    // TrashIcon,
} from '@heroicons/react/20/solid';
import Button from './Button';
import Title from './Title';
import Grid from './Grid';
import useWOW from '../hooks/useWOW';
import { columns, rows } from '../constants/game';
import { generateGrid } from '../utils/generateGrid';
import { ACTIONS } from '../constants/actions';
import Loader from './Loader';
import { getRandomWords } from '../utils/getRandomWords';

function WordsOfWonder() {
    const { loading, dispatch, grid, score } = useWOW();

    useEffect(() => {
        const selectedWords = getRandomWords((rows * columns) / 5);
        const newGrid = generateGrid(rows, columns, selectedWords);
        dispatch({ type: ACTIONS.INIT_GRID, payload: { grid: newGrid, words: selectedWords } });
    }, [dispatch]);

    const handleNewGame = () => {
        const selectedWords = getRandomWords((rows * columns) / 5);
        const newGrid = generateGrid(rows, columns, selectedWords);
        dispatch({
            type: ACTIONS.INIT_GRID,
            payload: { grid: newGrid, words: selectedWords },
        });
    };

    const handleRestartGame = () => {
        dispatch({ type: ACTIONS.RESET_GAME });
        const selectedWords = getRandomWords((rows * columns) / 5);
        const newGrid = generateGrid(rows, columns, selectedWords);
        dispatch({
            type: ACTIONS.INIT_GRID,
            payload: { grid: newGrid, words: selectedWords },
        });
    };

    const handleFinishGame = () => {
        dispatch({ type: ACTIONS.FINISH_GAME });
        alert('🎉 Game Finished! Your progress is saved.');
    };

    const handleNeedHelp = () => {
        dispatch({ type: ACTIONS.NEED_HELP });
        alert('💡 Hint: Look carefully! One of your words is hidden diagonally 😉');
    };

    return (
        <div className="flex h-dvh w-full flex-col items-center justify-center bg-gray-800">
            {loading ? (
                <Loader rows={rows} columns={columns} />
            ) : (
                <>
                    <div className="flex items-center justify-center gap-10 px-4">
                        <Title as="h1" style="text-4xl text-center font-bold text-gray-200">
                            Words of Wonder
                        </Title>

                        <InformationCircleIcon className="size-10 text-gray-200" />
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
                    <div className="flex items-center justify-evenly gap-10">
                        <>
                            <Grid grid={grid} />
                            <div className="flex w-3/4 flex-col items-center justify-center gap-10 px-10 py-5">
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
                                {/* <Button
                                icon={<ShieldCheckIcon className="size-8" />}
                                text="Validate Word"
                                style="bg-gray-700 text-white w-full"
                                onClick={() => alert("Validate")}
                                />
                                <Button
                                icon={<TrashIcon className="size-8" />}
                                text="Clear Selection"
                                style="bg-gray-700 text-white w-full"
                                onClick={() => alert("Clear")}
                                /> */}
                                <Button
                                    icon={<PaperAirplaneIcon className="size-8" />}
                                    text="Finish Game"
                                    style="bg-gray-700 text-white w-full"
                                    onClick={handleFinishGame}
                                />
                                <Button
                                    icon={<LightBulbIcon className="size-8" />}
                                    text="Need Help"
                                    style="bg-gray-700 text-white w-full"
                                    onClick={handleNeedHelp}
                                />
                            </div>
                        </>
                    </div>
                </>
            )}
        </div>
    );
}

export default WordsOfWonder;
