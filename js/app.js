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
let threeStarsLimit = 20
let twoStarsLimit = 30

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
    }
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
                toggle(openCards[0])
                toggle(openCards[1])
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