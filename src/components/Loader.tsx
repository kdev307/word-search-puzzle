import Title from './Title';
import Grid from './Grid';
import { useLoader } from '../hooks/useLoader';

interface LoaderProps {
    rows: number;
    columns: number;
}

function Loader({ rows, columns }: LoaderProps) {
    const animatedGrid = useLoader(rows, columns);

    return (
        <div className="h-100dvh flex flex-col items-center justify-center">
            <div className="relative rounded-2xl bg-gray-600 p-2">
                <Grid grid={animatedGrid} />
                <div className="absolute top-[40%] left-[30%] rounded-2xl bg-gray-200 p-10">
                    <Title
                        as="h3"
                        style="text-3xl text-center font-semibold text-gray-700 !p-0 animate-pulse"
                    >
                        Loading Grid...
                    </Title>
                </div>
            </div>
        </div>
    );
}

export default Loader;
