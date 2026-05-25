const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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