/* 
/   GLOBAL VARIABLES
*/

let openCards = []                          // Cards array for comparison
let counter = 0                             // Counts the players moves

/* 
/   FUNCTIONS
*/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array;
}

function toggle(card) {
    card.classList.toggle("open")
    card.classList.toggle("show")
}

function cardsMatching() {
    let image1 = openCards[0].querySelector("i").classList[1]
    let image2 = openCards[1].querySelector("i").classList[1]
    if (image1 == image2) {
        return true
    }
}

function addMove() {
    counter++
    document.querySelector(".moves").innerText = counter

}

function cardClick() {
    if (openCards.length == 0) {
        toggle(this);
        openCards.push(this);

    } else if (openCards.length == 1) {
        toggle(this);
        openCards.push(this);
        addMove()
        if (cardsMatching()) {
            openCards[0].removeEventListener("click", cardClick)
            openCards[1].removeEventListener("click", cardClick)
            openCards = []
        } else {
            setTimeout(function () {
                toggle(openCards[0])
                toggle(openCards[1])
                openCards = []
                counter
            }, 700);

        }
    }
}

/* 
/   SEQUENCE
*/

//  Get shuffled cards
var cards = shuffle([...document.querySelectorAll('.card')])

// Get all cards currently in deck
let deck = document.querySelector('.deck')

// Remove current cards from deck
while (deck.hasChildNodes()) {
    deck.removeChild(deck.lastChild)
}

// Add shuffled cards with eventlistener to deck
for (let card of cards) {
    deck.append(card)
    card.addEventListener("click", cardClick)
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
