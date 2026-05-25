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