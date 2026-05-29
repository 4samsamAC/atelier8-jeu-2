const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const difficulties = { // ill see for a custome one
    easy: 8,
    medium: 16,
    hard: 24
};

function createDeck() { // maybe ill do an class for the deck and cards later for now its make it
    const deck = [];

    for (const suit of suits) {
        for (const value of values) {
            deck.push({
                symbol: `${value}${suit}`
            });
        }
    }

    return deck;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGame(cardCount = 8) { // againe ill maybe do a class of it
    const deck = createDeck();

    const pairCount = cardCount / 2;

    const shuffledDeck = shuffle(deck);

    const selectedCards = shuffledDeck.slice(0, pairCount);

    const gameCards = [...selectedCards, ...selectedCards];

    return shuffle(gameCards).map((card, index) => ({
        id: index,
        symbol: card.symbol,
        flipped: false,
        matched: false
    }));
}

let cards = createGame(8);

let firstCard = null;
let secondCard = null;

let lockBoard = false;

function flipCard(cardId) {
    if (lockBoard) return;
  
    const card = cards.find(c => c.id === cardId);
  
    if (card.flipped || card.matched) return;
  
    card.flipped = true;
  
    updateUI();
  
    if (!firstCard) {
      firstCard = card;
      return;
    }
  
    secondCard = card;
  
    checkMatch();
}

function checkMatch() {
    lockBoard = true;
  
    const isMatch = firstCard.symbol === secondCard.symbol;
  
    if (isMatch) {
      firstCard.matched = true;
      secondCard.matched = true;
  
      resetTurn();
  
      checkWin();
  
    } else {
  
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
  
        resetTurn();
  
        updateUI();
  
      }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    const won = cards.every(card => card.matched);
  
    if (won) {
      alert("Bravo !");
    }
}

function updateUI() {
    const game = document.getElementById("game");
  
    game.innerHTML = "";
  
    cards.forEach(card => {
      const div = document.createElement("div");
  
      div.className = "card";
  
      div.textContent =
        card.flipped || card.matched
          ? card.symbol
          : "?";
  
      div.addEventListener("click", () => {
        flipCard(card.id);
      });
  
      game.appendChild(div);
    });
}