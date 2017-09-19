var cards = [
{
rank: "queen",
suit: "hearts",
cardImage: "images/queen-of-hearts.png"
},
{
rank: "queen",
suit: "diamonds",
cardImage: "images/queen-of-diamonds.png"
},
{
rank: "king",
suit: "hearts",
cardImage: "images/king-of-hearts.png"
},
{
rank: "king",
suit: "diamonds",
cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];

var score = 0;

var modal = document.getElementById("myModal");

// this function adds 1 to the score each time the user finds a match.
var scoreUpdate = function() {
  document.getElementById("count").textContent = score;
}

/* this funtion shuffles the objects in the cards array. I'm not sure if it's mathematically sound, 
(I I don't think it's a Fisher-Yates shuffle) but it seems to do the job. */
var shuffle = function() {
  var i = 3;
  var j = Math.floor((Math.random() * i));
  while (i >= 0) {
    var temp = cards[j];
    cards[j] = cards[i];
    cards[i] = temp;
    i--;
  }
}

// checks for card match and prompts modal outcome box, if successful match triggers score update and shuffle (no shuffle if no match).
var checkForMatch = function() {
  modal.style.display = "block";
  var outcome = document.createElement("p");
  outcome.setAttribute("id", "outcome");
  outcome.setAttribute("class", "modalAlert")
  document.getElementById("outcomeAlert").appendChild(outcome);
  if (cardsInPlay[0] === cardsInPlay[1]) {
    outcome.textContent = "You found a match!";
    score++;
    console.log(score);
    scoreUpdate();
    shuffle();
  } else {
    outcome.textContent = "Sorry, try again.";
  }
}

// flips card by changing img src attribute, if two cards flipped it triggers checkForMatch function.
var flipCard = function() {
	var cardId = this.getAttribute("data-id");
  this.setAttribute('src', cards[cardId].cardImage);
  console.log("User flipped " + cards[cardId].rank);
  cardsInPlay.push(cards[cardId].rank);
  console.log(cards[cardId].suit);
  console.log(cards[cardId].cardImage);
  if (cardsInPlay.length === 2) {
    checkForMatch();
  }
}


// creates img elements and sets to back of card for all. Also sets event listeners for card flip and reset/continue playing button.
var createBoard = function() {
	for (i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
    var resetButton = document.getElementsByTagName("button")[0];
		cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener("click", flipCard);
    resetButton.addEventListener("click", resetBoard);
    document.getElementById("game-board").appendChild(cardElement);
	}
}

// removes card image elements and clears cardsInPlay array. Hides modal box and triggers createBoard function.
var resetBoard = function() {
  var playedCards = document.getElementById("game-board");
  var cardList = document.getElementsByTagName("img");
  var i = 3;
  while (i >= 0) {
    playedCards.removeChild(cardList[i]);
    cardsInPlay.pop();
    i--;
  }
  modal.style.display = "none";
  var outcomeRemove = document.getElementById("outcome");
  var outcomeContainer = document.getElementById("outcomeAlert");
  outcomeContainer.removeChild(outcomeRemove);
  createBoard();
}



shuffle();

createBoard();

scoreUpdate();

