## Próxima Palabra / Next Word

A front-end interface to play the popular "The Alphabet" style trivia game with your friends.

<img src="https://www.andresfrixione.com/pasapalabras/pasapalabrasdemo.jpg" />

## Live Demo

<a href="https://www.andresfrixione.com/pasapalabras">Live Demo</a>

## Purpose of the game

The purpose of the game is to go through the letters of the alphabet on the Wheel. For each letter, the player is read a definition of a word starting with or containing that letter. The player can either respond with a word, or can pass to the "Next Word". The winner is the player who completes the wheel with the highest number of points.

## How to install

Simply clone the project and then run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## How to play

1 ) In the login page, enter a username.

<h2>Options</h2>
<ul>
<li> Language: English or Spanish. If Spanish is selected, then the ñ letter will also appear.</li>
<li> Penalize Incorrect: If yes is selected, then incorrect answers will count against the player.</li>
<li>Duration: anywhere from 30 seconds to 300 seconds or No Limit. If no limit is selected, then the clock won't appear.
</ul>

<img src="https://www.andresfrixione.com/pasapalabras/pasapalabraslogin.jpg" />
2) Press "Start" to go to the main page.

## Game Dashboard

1. The clock starts running once the "Start" button is clicked. The "active" letter will flash in purpose, and will also appear on the middle of the wheel.

<h2>Scoring the questions</h2>
<ul>
<li>The operator can either press the green checkmark (or press "c" on the keyboard) to mark the letter correct and advance to the next letter. The clock will continue runnning.</li>
<li>The operator can press the red checkmark (or press "v" on the keyboard) to mark the letter incorrect. The clock will stop running.</li>
<li>The operator can press the yellow arrow (or the "right arrow key" on the keyboard) to skip to the next letter. The clock will stop running</li>
</ul>

2. The players points will appear on the rankings table and below the user's name.

3. To switch the current player, press the "Next Player" button (or press the "n" key on the keyboard).

4. The clock can be adjusted either pressing on the up and down arrows inside the clock.
   <img src="https://www.andresfrixione.com/pasapalabras/clock.jpg" />

5. The operator can modify the user settings by clicking on the "Settings" button.

<img src="https://www.andresfrixione.com/pasapalabras/settings.jpg" />

<h2>Player Settings</h2>
<ul>
<li>Time Left: the amount of time left on the user's clock.</li>
<li>Current Letter: the user's current letter on the wheel.</li>
<li>Wheel Letter: the wheel letter to adjust. You can adjust the response to: "Not Answered", "Correct", "Incorrect" or "Next Word"</li>
<li>Once finished, you can either save the changes or "Delete Player" to remove the player from the game.
</ul>
