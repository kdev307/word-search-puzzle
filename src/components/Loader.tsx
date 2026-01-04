import Title from "./Title";
import Grid from "./Grid";
import { useLoader } from "../hooks/useLoader";

interface LoaderProps {
    rows: number;
    columns: number;
}

function Loader({ rows, columns }: LoaderProps) {
    const animatedGrid = useLoader(rows, columns);

    return (
        <div className="flex flex-col items-center justify-center">
            <Grid grid={animatedGrid} />
            <Title as="h3" style="text-xl text-center font-semibold text-gray-300">
                Loading Grid...
            </Title>
        </div>
    );
}

export default Loader;
