# Number Guessing Game

A command-line number guessing game built with Node.js. The game picks a random number between 1 and 100, and you have to guess it within a limited number of attempts based on the difficulty you choose. High scores are tracked per difficulty and saved locally, so you can try to beat your best run every time you play.

## Features

- **Three difficulty levels**
  - Easy — 10 chances
  - Medium — 5 chances
  - Hard — 3 chances
- **Hint system** — type `hint` instead of a guess to find out if the number is even or odd
- **Round timer** — tracks and displays how long each round took
- **Persistent high scores** — the fewest attempts it took to win is saved per difficulty in `highScore.json`, and updates automatically whenever you beat your previous best
- **Play again loop** — keep playing multiple rounds in the same session without restarting the script

## Requirements

- [Node.js](https://nodejs.org/) (v14 or later recommended)

## Installation

1. Clone or download this project.
2. Navigate to the project folder:
   ```bash
   cd number-guessing-game
   ```
3. No external dependencies are required — the game only uses Node's built-in `fs` and `readline` modules.

## How to Play

Run the game with:

```bash
node number-game.js
```

1. Choose a difficulty level by entering `1`, `2`, or `3`:
   - `1` → Easy (10 chances)
   - `2` → Medium (5 chances)
   - `3` → Hard (3 chances)
2. Enter a number between 1 and 100 as your guess.
3. After each guess, you'll be told whether the secret number is **greater** or **less** than your guess.
4. Stuck? Type `hint` at any guess prompt to learn whether the number is even or odd.
5. Keep guessing until you find the number or run out of attempts.
6. At the end of the round, you'll see:
   - The total time taken
   - Whether you set a new high score, or what the current best score is
7. You'll be asked if you want to play again — type `yes` to start a new round, or anything else to exit.

## Example

```
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice : 2
Great! You have selected the Medium difficulty level.
Let's start the game!
Enter your guess : 50
Incorrect! The number is less than 50.
Enter your guess : 25
Incorrect! The number is greater than 25.
Enter your guess : hint
The number is even
Enter your guess : 38
Congratulations! You guessed the correct number in 4 attempts.
New high score for medium: 4 attempts!
Total time : 12.4seconds
Do you want to continue ? 
```

## High Scores

High scores are stored in `highScore.json` in the project directory, in the following format:

```json
{
  "easy": 6,
  "medium": 4,
  "hard": null
}
```

- Each value represents the fewest attempts it took to win at that difficulty.
- A value of `null` means that difficulty hasn't been won yet.
- The file is created automatically the first time you win a round.

## Project Structure

```
number-guessing-game/
├── number-game.js         # Main game logic
├── highScore.json   # Auto-generated high score storage
└── README.md
```

## Possible Improvements

- Input validation for non-numeric or out-of-range guesses
- Configurable number range instead of a fixed 1–100
- Additional hint types (e.g., "close" vs "far" proximity hints)
- Unit tests for game logic

## License

This project is open source and available for personal or educational use.