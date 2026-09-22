# Word Search Puzzle

A relaxing word-search puzzle game. Hidden words are tucked into a 14×14 grid of
letters, running in every direction. Trace them out, beat the clock, and clear
the board.

## Play Now

▶️ **[Play Word Search Puzzle](https://kdev307.github.io/word-search-puzzle/)**

## How to Play

- A list of words sits beside the grid. Each one is hidden somewhere in the
  letters — horizontally, vertically, or diagonally.
- Click and drag across a straight line of letters to trace a word.
- Trace a listed word correctly and it locks in with its own color.
- Find every word to win.

## Need a Hand?

Stuck on a word? Use the list beside the grid:

- **Click a word** for a hint — it reveals where the word starts and which
  direction it runs.
- **Double-click a word** to reveal it fully on the grid.

Both cost a few points, so save them for when you're truly stuck.

## Scoring

| Action               | Points |
| -------------------- | ------ |
| Find a word yourself | +10    |
| Use a hint           | −5     |
| Reveal a word        | −10    |

Your score and time are tracked as you play, and a summary of how you did
appears once you clear the board. Your progress is saved automatically, so you
can refresh and pick up right where you left off.

## Tech Stack

Built as a single-page React app.

| Purpose          | Technology                        | Version |
| ---------------- | --------------------------------- | ------- |
| UI               | `react / react-dom`               | ^19.1.1 |
| Build tooling    | `vite`                            | ^7.1.7  |
| Styling          | `tailwindcss + @tailwindcss/vite` | ^4.1.16 |
| Icons            | `@heroicons/react`                | ^2.2.0  |
| Notifications    | `react-toastify`                  | ^11.0.5 |
| Win celebrations | `canvas-confetti`                 | ^1.9.4  |
| Linting          | `eslint`                          | ^9.36.0 |

## Project Information

- Single-page app, no backend — everything runs in the browser.
- Game state is managed with React Context and a reducer.
- Progress is stored in the browser's `sessionStorage`, so a refresh resumes
  the current game.
- Deployed as a static build to GitHub Pages.

### Run Locally

Requires Node.js 18+.

```bash
npm install     # install dependencies
npm run dev     # start the dev server (default http://localhost:5173)
npm run build   # production build to dist/
```

## Architecture

A brief map of how it fits together:

- **State** — a single reducer (`context/WOWContext.jsx`) holds the grid, word
  list, current selection, found words, score, hints/reveals used, and the
  timer. It persists to `sessionStorage` on every change and restores on load.
- **Grid generation** — words are placed at random positions and directions
  (8-way), then the remaining cells are filled with random letters.
- **Selection** — dragging locks a direction on the first move and extends only
  along that straight line; the traced letters are matched against the word
  list on release.
- **Highlighting** — each found word (and the active drag) is drawn as a single
  rounded capsule oriented along the word, so horizontal, vertical, and diagonal
  finds all render as clean pills.
- **Assists** — hints and reveals are dispatched from the word list; revealing a
  word runs a depth-first search to locate its exact path on the grid.
- **Results** — clearing the board opens a summary screen that grades the run
  and breaks down score, time, and assists used.
