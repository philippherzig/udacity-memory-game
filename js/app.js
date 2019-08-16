/* 
/   GLOBAL VARIABLES
*/

// Cards array for comparison
let openCards = []

// Counts the players moves                      
let counter = 0

// Variable that holds all cards
var cards = [...document.querySelectorAll(".card")]

// Variable that holds all stars
let stars = [...document.querySelectorAll(".fa-star")]

// Defines the max move limts needed to achieve stars
let threeStarsLimit = 15
let twoStarsLimit = 25

// Helper to check if first click happened
let firstClick = false

// Variable that holds the current seconds elapsed
let secondsElapsed = 0

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

function open(card) {
    card.classList.add("open")
    card.classList.add("show")
    card.removeEventListener("click", cardClick)
    openCards.push(card)
}

function close(card) {
    card.classList.remove("open")
    card.classList.remove("show")
    card.addEventListener("click", cardClick)
}


function cardsMatching() {
    let image1 = openCards[0].querySelector("i").classList[1]
    let image2 = openCards[1].querySelector("i").classList[1]
    if (image1 == image2) {
        return true
    }
}

function resetStars() {
    for (star of stars) {
        star.classList.remove("red")
        star.classList.remove("lightgrey")
        star.classList.remove("gold")
    }
}

function addMove() {
    counter++
    document.querySelector(".moves").innerText = counter
    if (counter == twoStarsLimit) {
        resetStars()
        stars[0].classList.add("red")
        stars[1].classList.add("lightgrey")
        stars[2].classList.add("lightgrey")
    }
    if (counter == threeStarsLimit) {
        stars[0].classList.add("gold")
        stars[1].classList.add("gold")
        stars[2].classList.add("lightgrey")
    }
}

function checkWin() {
    let win = true
    for (card of cards) {
        if (card.classList.contains("match") == false) {
            win = false
        }
    }
    if (win == true) {
        document.querySelector(".overlay").style.display = "flex"
        document.querySelector(".final-moves").innerText = `Moves: ${counter}`
        document.querySelector(".final-time").innerText = `Seconds: ${secondsElapsed}`
    }
}

function startTimer() {
    startTime = Date.now()
    setInterval(updateTimer,1000)
}

function updateTimer() {
    secondsElapsed++
    document.querySelector(".timer").innerText = `Seconds: ${secondsElapsed}`
}

function cardClick() {

    // Start timer if it is the first click
    if (firstClick == false) {
        firstClick = true
        startTimer()
    }

    if (openCards.length == 0) {
        open(this);

    } else if (openCards.length == 1) {
        open(this);
        addMove()
        if (cardsMatching()) {
            openCards[0].classList.add("match")
            openCards[1].classList.add("match")
            openCards[0].removeEventListener("click", cardClick)
            openCards[1].removeEventListener("click", cardClick)
            openCards = []
            checkWin()
        } else {
            openCards[0].classList.add("nomatch")
            openCards[1].classList.add("nomatch")
            setTimeout(function () {
                openCards[0].classList.remove("nomatch")
                openCards[1].classList.remove("nomatch")
                close(openCards[0])
                close(openCards[1])
                openCards = []
            }, 900);

        }
    }
}

function resetAll() {

    // Hide congratulations overlay
    document.querySelector(".overlay").style.display = "none"
    
    // Reset counter
    counter = 0
    document.querySelector(".moves").innerText = counter

    // Reset stars
    resetStars()

    // Close open cards
    for (let card of cards) {
        card.classList.remove("open")
        card.classList.remove("show")
        card.classList.remove("match")
        card.classList.remove("nomatch")
    }

    //  Get shuffled cards
    cards = shuffle(cards)

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

}

/* 
/   SEQUENCE
*/

document.addEventListener('load', resetAll())