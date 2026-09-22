import { LightBulbIcon } from '@heroicons/react/24/solid';
import type { Word } from '../types';
import { directionToText } from '../utils/direction';

function ToastHint({ word, startingCoord: start, direction }: Word) {
    return (
        <div className="flex w-full max-w-xl min-w-xs flex-col items-center justify-center gap-4 rounded-xl bg-gray-700/50 p-4 text-gray-50 shadow-lg backdrop-blur-md select-none">
            <div className="flex items-center gap-4">
                <LightBulbIcon className="size-8 text-yellow-300" />
                <LightBulbIcon className="size-8 text-yellow-300" />
                <p className="text-xl font-semibold tracking-wide">Hint</p>
                <LightBulbIcon className="size-8 text-yellow-300" />
                <LightBulbIcon className="size-8 text-yellow-300" />
            </div>
            <div className="w-full space-y-2 text-sm">
                <div className="flex w-full justify-between rounded-lg bg-gray-50 p-2">
                    <span className="w-full font-semibold text-gray-700">Word</span>
                    <span className="w-full font-mono font-bold text-yellow-900">
                        {word.toUpperCase()}
                    </span>
                </div>
                <div className="flex w-full justify-between rounded-lg bg-gray-50 p-2">
                    <span className="w-full font-semibold text-gray-700">Starts At</span>
                    <span className="w-full font-mono font-bold text-blue-900">
                        {`Row: ${start[0] + 1}`}
                        <br /> {`Column: ${start[1] + 1}`}
                    </span>
                </div>

                <div className="flex w-full justify-between rounded-lg bg-gray-50 p-2">
                    <span className="w-full font-semibold text-gray-700">Direction</span>
                    <span className="w-full font-mono font-bold text-green-900">
                        {directionToText(direction.dx, direction.dy)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ToastHint;
