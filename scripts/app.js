/* ================================= 
  Global Variables
==================================== */
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const phraseDivUl = document.querySelector('#phrase ul');
const overlay = document.getElementById('overlay');
const startGame = document.querySelector('.btn__reset');
let missed = 0;

/* ================================= 
  Advent Listeners
==================================== */
// Start Game
startGame.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

//  'qwerty' keyboard
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== "chosen") {
        e.target.className = "chosen";
        checkLetter(e.target.textContent);
    }
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
            phrase = arr[i].split(''); // Split the string by character including spaces and stoare it in the variable phrase
        }
    }
    return phrase;
}

// Add Phrase to Display
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        phraseDivUl.appendChild(li);
        if (li.textContent !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Check Letter Function
function checkLetter(arr) {
    const phrase = phraseDivUl.children;
    let checked = [];
    let matched = null;
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i].className === "letter") {
            checked += phrase[i].innerHTML;
        }
        if (checked.includes(arr) && phrase[i].textContent.toLowerCase() === arr) {
            phrase[i].className = "show";
            matched = phrase[i].textContent;
        }
    }
}

// Check Win
// function checkWin() {
//     const overlayHeader = document.getElementByClassName('title');
//     const letter = document.querySelectorAll('.letter');
//     const show = document.querySelectorAll('.show');
//     if (letter.length === 0) {
//         overlay.className = 'win';
//         overlayHeader.innerHTML = 'You win!';
//         overlay.style.display = 'flex';        
//     } else if (missed > 4) {
//         overlay.className = 'lose';
//         overlayHeader.innerHTML = 'You lose!';
//         overlay.style.display = 'flex';
//     }
// }