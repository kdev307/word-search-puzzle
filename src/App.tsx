import { ToastContainer } from 'react-toastify';
import WordsOfWonder from './components/WordsOfWonder';
import { WOWProvider } from './context/WOWContext';

function App() {
    return (
        <>
            <WOWProvider>
                <WordsOfWonder />

                <ToastContainer position="top-right" theme="dark" />
            </WOWProvider>
        </>
    );
}

export default App;
