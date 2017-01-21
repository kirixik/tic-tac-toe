# Tic-Tac-Toe game with AI
Play game: https://kirixik.github.io/tic-tac-toe/

## Overview
Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
https://en.wikipedia.org/wiki/Tic-tac-toe

## Running Locally

1. Clone this repository: git clone https://github.com/kirixik/tic-tac-toe.git
2. Open the root directory of your cloned repository as the project root
3. npm install
4. npm start
5. Open http://localhost:3000/

## Run tests

1. Open the root directory of your cloned repository as the project root
2. npm install
3. npm test

## Supported Browsers

Latest versions of Chrome, Firefox, Safari, Microsoft Edge

## Technologies

1. React to create interactive UIs
2. Redux as  predictable state container for JavaScript apps
3. Enzyme used for testing 
4. HTML, CSS used for markup

#Gameplay

## First move
To play as first player click at the 'play first' button or click at any cell at board
To play as second player click at the 'play second' button

## Restart
To restart game click at the restart button

# AI

## Description
AI never loses, only wins or reduces to draw. Uses minimax algorithm

## Minimax algorithm
Tic-Tac-Toe is zero-sum game therefore we can use Minmax for AI.
Minimax (sometimes MinMax or MM) is a decision rule used in decision theory, game theory, statistics and philosophy for minimizing the possible loss for a worst case (maximum loss) scenario. Originally formulated for two-player zero-sum game theory, covering both the cases where players take alternate moves and those where they make simultaneous moves, it has also been extended to more complex games and to general decision-making in the presence of uncertainty.
AI at each its turn calculates minimax value in a worst-case approach: for each possible action it check all possible actions of player and determine the worst possible combination of actions - the one that gives player the smallest value.

## Score function
Algorithm has score function that evaluates score of the game's terminal state. If value is positive - AI wins, if negative - Player wins, if zero it is draw
