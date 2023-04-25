// 1. Create a function that creates a Deck of Cards.

// 2. Group the deck of playing cards into their respective suit.

// 3. Sort the Cards by their face value.


/*
 Least to Greatest Ordering, or "Ace High" Ordering:
 2 - 10, Jack, Queen, King, and Ace

There are four suits: hearts, diamonds, spades, and clubs. 

Thus there are 13 hearts, 13 diamonds, 13 spades, and 13 clubs.
The diamonds and hearts are printed in red. 

The spades and clubs are printed in black. 

So there are 26 red cards and 26 black cards.
Each rank has four cards in it (one for each of the four suits). 

This means there are four nines, four tens and so on.
The jacks, queens, and kings are all considered face cards. 

Thus there are three face cards for each suit and a total of 12 face cards in the deck.


*/


function card (value, suit){
	return {
    value : value,
		suit : suit
	}
}

function createDeck(){
	let cards = [];
  const cardValues =  ["Ace", 2,3,4,5,6,7,8,9,10, "Jack", "Queen", "King"]
	const suits = ["Hearts", "Diamonds", "Spades", "Clubs"] 

  for (let value of cardValues){
  	for(let suit of suits) {
    	cards.push(new card (value, suit));
    } 
  }
  
  let deck = cards.reduce((acc, curr) => {
  	acc[curr.suit] = acc[curr.suit] || [];
    acc[curr.suit].push(curr);
    return acc;}, {}); 
    
  console.log("deck", deck)
  
	for (let suit in deck) {
  	sortDeck(deck[suit], [2,3,4,5,6,7,8,9,10, "Jack", "Queen", "King","Ace"]);
		
  }
  
  return deck;
}

//Sort deck in in a given order
function sortDeck(cards, sortOrder) {
	cards.sort((l, r) => sortOrder.indexOf(l.value) - sortOrder.indexOf(r.value))
}

function render() {
  const deck = createDeck();
  let container = document.getElementById("deck");
  for(let suit in deck) {
        let cardElem = document.createElement("div");
        let value = document.createElement("div");
        let suitElem = document.createElement("div");
      for (let card of deck[suit]) {
        cardElem.className = "card";
        value.className = "value";
        suitElem.className = "suit " + suit;
        value.innerHTML = card.value;
        cardElem.appendChild(value);
        cardElem.appendChild(suitElem);
      }
      container.appendChild(cardElem);
  }
  
} 

// function renderDeck(deck) {
//   const deckDiv = document.getElementById("deck");
//   const suffleAnc = document.getElementsByClassName("btn");
//   console.log("suffleAnc", suffleAnc)
// 	for(let i = 0; i < deck.length; i++) {
// 		let card = document.createElement("div");
// 		let value = document.createElement("div");
// 		let suit = document.createElement("div");
// 		card.className = "card";
// 		value.className = "value";
// 		suit.className = "suit " + deck[i].suit;
// 		value.innerHTML = deck[i].value;
// 		card.appendChild(value);
// 		card.appendChild(suit);

// 		deckDiv.appendChild(card);
// 	}
// }

// createDeck();

render();