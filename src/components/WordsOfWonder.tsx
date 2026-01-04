import { LightBulbIcon, PaperAirplaneIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import Title from "./Title";
import Grid from "./Grid";

function WordsOfWonder() {
    return (
        <div className="w-full h-dvh bg-gray-800 flex flex-col items-center justify-center">
            <Title as="h1" style="text-4xl text-center font-bold text-gray-200" className="mb-4">
                Words of Wonder Game
            </Title>

            <div className="flex items-center justify-evenly">
                <Grid />
            </div>

            <div className="flex items-center justify-center gap-10 px-10 py-5 w-3/4">
                <Button
                    icon={<ShieldCheckIcon className="size-8" />}
                    text="Validate Word"
                    style="bg-gray-700 text-white w-full"
                    onClick={() => alert("Validate")}
                />

                <Button
                    icon={<PaperAirplaneIcon className="size-8" />}
                    text="Finish"
                    style="bg-gray-700 text-white w-full"
                    onClick={() => alert("Finish")}
                />

                <Button
                    icon={<LightBulbIcon className="size-8" />}
                    text="Hint"
                    style="bg-gray-700 text-white w-full"
                    onClick={() => alert("Hint")}
                />
            </div>
        </div>
    );
}

export default WordsOfWonder;
