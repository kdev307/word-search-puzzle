import Title from './Title';

function GameInformation() {
    return (
        <section aria-labelledby="info-heading">
            <header>
                <Title as="h2" style="text-xl font-bold text-center text-gray-900">
                    About Words of Wonder
                </Title>
            </header>

            <article className="text-gray-700">
                <p>
                    Welcome to the <strong>Words of Wonder</strong>! Your objective is to find all
                    the hidden words listed beside the puzzle grid. Words may appear horizontally,
                    vertically, or diagonally in any straight-line direction.
                </p>

                <section>
                    <Title
                        as="h3"
                        style="!py-2 text-lg text-center font-semibold text-gray-800 !normal-case text-start"
                    >
                        How to Play
                    </Title>
                    <ul className="ml-5 list-disc space-y-1">
                        <li>Click or tap on a letter to start selecting.</li>
                        <li>
                            Drag in a straight-line direction (horizontal, vertical, or diagonal).
                        </li>
                        <li>
                            If your selection matches a word from the list, the word is highlighted
                            and marked as found.
                        </li>
                        <li>
                            Found words get their own color, making overlaps easy to understand.
                        </li>
                    </ul>
                </section>

                <section>
                    <Title
                        as="h3"
                        style="!py-2 text-lg text-center font-semibold text-gray-800 !normal-case text-start"
                    >
                        Word List
                    </Title>
                    <p>
                        The words you need to find appear in the list beside the grid. When you find
                        a word, it is automatically marked as completed. Clicking a word in the list
                        (after finding it manually) grants you points.
                    </p>
                </section>

                <section>
                    <Title
                        as="h3"
                        style="!py-2 text-lg text-center font-semibold text-gray-800 !normal-case text-start"
                    >
                        Hints
                    </Title>
                    <p>
                        If you get stuck, you can use a hint. Click on the desired word for which
                        you want hint. A hint will always{' '}
                        <strong>reveal the full word on the grid</strong>. However, using a hint
                        comes with a cost: you will <strong>not earn points</strong> for that word.
                        Use hints strategically to progress without losing too many potential
                        points.
                    </p>
                </section>

                <section>
                    <Title
                        as="h3"
                        style="!py-2 text-lg text-center font-semibold text-gray-800 !normal-case text-start"
                    >
                        Scoring
                    </Title>
                    <ul className="ml-5 list-disc space-y-1">
                        <li>
                            <strong>Manual Find:</strong> Selecting a word yourself →{' '}
                            <strong>earns 10 points</strong>.
                        </li>
                        <li>
                            <strong>Hint Reveal:</strong> Word uncovered by hint →{' '}
                            <strong>0 points</strong>.
                        </li>
                        <li>
                            You can only claim points for words you personally find (not
                            hint-revealed ones).
                        </li>
                    </ul>
                </section>

                <footer className="mt-4">
                    <p className="text-center">
                        Find all the words and aim for the highest score. Good luck!
                    </p>
                </footer>
            </article>
        </section>
    );
}

export default GameInformation;
