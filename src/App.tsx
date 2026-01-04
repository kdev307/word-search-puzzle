import WordsOfWonder from "./components/WordsOfWonder";
import { WOWProvider } from "./context/WOWContext";

function App() {
    return (
        <>
            <WOWProvider>
                <WordsOfWonder />
            </WOWProvider>
        </>
    );
}

export default App;
