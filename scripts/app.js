/* ================================= 
  Global Variables
==================================== */
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseDivUl = document.querySelector('#phrase ul');
const overlay = document.getElementById('overlay');
const startGame = document.querySelector('.btn__reset');
const tries = document.querySelectorAll('.tries');
const keyRow = document.querySelectorAll('.keyrow');
let missed = 0;

/* ================================= 
  Advent Listeners
==================================== */
// Start Game
startGame.addEventListener('click', (e) => {
    if (overlay.className === 'win' || overlay.className === 'lose') { // if the game is displaying the 'win' or 'lose' overlay
        phraseDivUl.innerHTML = ''; // reset the phrase back to an empty string
        missed = 0; // reset miss counter to 0
        for (let i = 0; i < keyRow.length; i++) { // loops through all three of the 'keyrow' divs
            const keyChild = keyRow[i].children; // gets access to the keys on each row as its loops through
            for (let i = 0; i < keyChild.length; i++) { // new loop to loop through each key on each row of the 'kewrow' div
                if (keyChild[i].className === 'chosen') { // if the key has a class of 'chosen' select it
                    keyChild[i].className = ''; // changes the selected key class back to no class
                }
            }
        };
        for (let i = 0; i < 5; i++) { // reset the lost hearts back to live hearts
            tries[i].innerHTML = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';
        };
        const phraseArray = getRandomPhraseAsArray(phrases); // randomly choose new phrase to display
        addPhraseToDisplay(phraseArray); // add the phrase to the display
        overlay.style.display = 'none'; // shows the game to the user
    } else { // if the game has not started yet
        const phraseArray = getRandomPhraseAsArray(phrases); // randomly choose phrase to display
        addPhraseToDisplay(phraseArray); // add the phrase to the display
        overlay.style.display = 'none'; // show the game to the user
    }
});

//  'qwerty' keyboard
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== "chosen") {
        e.target.className = "chosen";
        const letterFound = checkLetter(e.target.textContent);
        if (letterFound === null) { // checks if user selection matches any letter in the phrase
            missed += 1;
            for (let i = 0; i < missed; i++) { // if the user selection does 'not' match, replace a 'live' heart with a 'lost' heart
                tries[i].innerHTML = '<li class="tries"><img src="images/lostHeart.png" height="35px" width="30px"></li>';
            };
        }
    }
    checkWin();
});

/* ================================= 
  Arrays
==================================== */
const phrases = [
    "the truth will set you free",
    "there is no place like home",
    "all that glitters is not gold",
    "he travels the fastests who travels alone",
    "i think therefore i am"
];

/* ================================= 
  Functions
==================================== */
//Get Random Phrase
function getRandomPhraseAsArray(arr) {
    const random = Math.floor(Math.random() * arr.length) // Create random number between 0 and the array length
    let phrase; // initialize the split array value
    for (let i = 0; i < arr.length; i++) { // Loop through the array
        if (random === i) { // If the array string index matches the random number then select it
            phrase = arr[i].split(''); // Split the string by character including spaces and stoare it in the variable 'phrase'
        }
    }
    return phrase;
}

// Add Phrase to Display
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) { // loops over each character in the phrase
        const li = document.createElement('li'); // creates a list item
        li.textContent = arr[i]; // adds the character to the list item as its content
        phraseDivUl.appendChild(li); // adds the list item with the character to the display
        if (li.textContent !== " ") { // determines wheter the character is either a 'space' or 'letter' and applies the appropriate class name
            li.className = "letter";
        } else {
            li.className = "space";
        }
    }
}

// Check Letter Function
function checkLetter(arr) {
    const phrase = phraseDivUl.children; // gets access to each li element in the phrase
    let checked = []; // initialize an array to contain the checked li elements that have a class name of 'letter'
    let matched = null; // initialize the matched variable to null unless a letter is matched
    for (let i = 0; i < phrase.length; i++) { // loops through each li element in the phrase
        if (phrase[i].className === "letter") { // checks to see if the class name is 'letter'
            checked += phrase[i].innerHTML; // if the class name is 'letter' add it to the 'checked' array
        }
        if (checked.includes(arr) && phrase[i].textContent.toLowerCase() === arr) { // if the user selection matches the text content of any of the li elements in the phrase
            phrase[i].className = "show"; // changes the class name to 'show'
            matched = phrase[i].textContent; // adds the letter to the 'matched' variable to prevent to missed counter from increasing
        }
    }
    return matched; 
}

// Check Win
function checkWin() {
    const overlayHeader = document.querySelector('.title'); // get access to the overlay header
    const letter = document.querySelectorAll('.letter'); // gets access to all li elements with the class name 'letter'
    const show = document.querySelectorAll('.show'); // gets access to all li elements with the class name 'show'
    if (letter.length === 0) { // checks if any of the li elements in the phrase div contain the class name 'letter' / if not, game is won
        overlay.className = 'win'; // displays the 'win' overlay css
        overlayHeader.innerHTML = 'You win!'; // changes the header to display 'You win!'
        startGame.textContent = 'Play Again' // changes the 'start game' button text to display 'play again'
        overlay.style.display = 'flex'; // displays the 'win' overlay to the user   
    } else if (missed > 4) { // check if the missed counter exceeds 4
        overlay.className = 'lose'; // displays the 'lose' overlay css
        overlayHeader.innerHTML = 'You lose!'; // changes the header to display 'You lose!'
        startGame.textContent = 'Play Again'
        overlay.style.display = 'flex'; // displays the 'lose' overlay to the user
    }
}