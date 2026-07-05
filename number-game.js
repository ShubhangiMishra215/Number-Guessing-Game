const fs = require("fs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let maxAttempts, difficultyKey;

const highScoreFile = "highScore.json";

function loadHighScore() {
  try {
    return JSON.parse(fs.readFileSync(highScoreFile));
  } catch {
    return { easy: null, medium: null, hard: null };
  }
}

function saveHighScores(scores) {
  fs.writeFileSync("highScore.json", JSON.stringify(scores, null, 2));
}

let highScores = loadHighScore();

function playGame() {
  console.log(
    "Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\nYou have 5 chances to guess the correct number.\n",
  );
  console.log(
    "Please select the difficulty level:\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n",
  );

  const min = 1;
  const max = 100;
  const secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const startTime = Date.now();

  function playAgain() {
    rl.question("Do you want to continue ? ", (reply) => {
      if (reply.toLowerCase() == "yes") {
        playGame();
      } else {
        rl.close();
      }
    });
  }

  function Timer(endTime) {
    const time = (endTime - startTime) / 1000;
    console.log(`Total time : ${time}seconds`);
  }

  function hintNumber(secretNumber) {
    if (secretNumber % 2 == 0) {
      console.log("The number is even");
    } else {
      console.log("Number is odd");
    }
  }

  rl.question("Enter your choice : ", (choice) => {
    if (choice == 1) {
      console.log("Great! You have selected the Easy difficulty level.");
      maxAttempts = 10;
      difficultyKey = "easy";
    } else if (choice == 2) {
      console.log("Great! You have selected the Medium difficulty level.");
      maxAttempts = 5;
      difficultyKey = "medium";
    } else if (choice == 3) {
      console.log("Great! You have selected the Difficult difficulty level.");
      maxAttempts = 3;
      difficultyKey = "hard";
    } else {
      console.log("Please select a valid number");
      rl.close();
      return;
    }

    console.log("Let's start the game!");

    let attempt = 0;

    function askGuess() {
      rl.question("Enter your guess : ", (guessInput) => {
        if (guessInput.toLowerCase() === "hint") {
          hintNumber(secretNumber);
          askGuess();
          return;
        }
        const guess = parseInt(guessInput);
        attempt++;

        if (guess === secretNumber) {
          console.log(
            `Congratulations! You guessed the correct number in ${attempt} attempts.`,
          );
          if (
            highScores[difficultyKey] === null ||
            attempt < highScores[difficultyKey]
          ) {
            highScores[difficultyKey] = attempt;
            saveHighScores(highScores);
            console.log(
              `New high score for ${difficultyKey}: ${attempt} attempts!`,
            );
          } else {
            console.log(
              `Best score for ${difficultyKey}: ${highScores[difficultyKey]} attempts`,
            );
          }

          const endTime = Date.now();
          Timer(endTime);

          playAgain();
        } else if (attempt >= maxAttempts) {
          console.log(`Game over! The correct number was ${secretNumber}.`);

          const endTime = Date.now();
          Timer(endTime);

          playAgain();
        } else {
          if (secretNumber > guess) {
            console.log(`Incorrect! The number is greater than ${guess}.`);
          } else {
            console.log(`Incorrect! The number is less than ${guess}.`);
          }
          askGuess();
        }
      });
    }

    askGuess();
  });
}

playGame();
