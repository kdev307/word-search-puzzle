import {
    ArrowPathIcon,
    InformationCircleIcon,
    LightBulbIcon,
    PaperAirplaneIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import Button from "./Button";
import Title from "./Title";
import Grid from "./Grid";

function WordsOfWonder() {
    return (
        <div className="w-full h-dvh bg-gray-800 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-10 px-4 mb-10">
                <Title as="h1" style="text-4xl text-center font-bold text-gray-200" className="">
                    Words of Wonder
                </Title>

                <InformationCircleIcon className="size-10 text-gray-200" />
            </div>
            <div className="flex items-center justify-evenly gap-10">
                <Grid />
                <div className="flex flex-col items-center justify-center gap-10 px-10 py-5 w-3/4">
                    <Button
                        icon={<PlusIcon className="size-8" />}
                        text="New Game"
                        style="bg-gray-700 text-white w-full"
                        onClick={() => alert("New Game")}
                    />
                    <Button
                        icon={<ArrowPathIcon className="size-8" />}
                        text="Restart Game"
                        style="bg-gray-700 text-white w-full"
                        onClick={() => alert("Restart Game")}
                    />
                    <Button
                        icon={<TrashIcon className="size-8" />}
                        text="Clear Selection"
                        style="bg-gray-700 text-white w-full"
                        onClick={() => alert("Clear")}
                    />
                    <Button
                        icon={<PaperAirplaneIcon className="size-8" />}
                        text="Finish Game"
                        style="bg-gray-700 text-white w-full"
                        onClick={() => alert("Finish")}
                    />
                    <Button
                        icon={<LightBulbIcon className="size-8" />}
                        text="Need Help"
                        style="bg-gray-700 text-white w-full"
                        onClick={() => alert("Hint")}
                    />
                </div>
            </div>
        </div>
    );
}

export default WordsOfWonder;
