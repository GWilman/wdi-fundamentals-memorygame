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

var scoreUpdate = function() {
  document.getElementById("Count").textContent = score;
}

var checkForMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    alert("You found a match!");
    score++;
    console.log(score);
    scoreUpdate();
  } else {
    alert("Sorry, try again.");
  }
}

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

var resetBoard = function() {
  var playedCards = document.getElementById("game-board");
  var cardList = document.getElementsByTagName("img");
  var i = 3;
  while (i >= 0) {
    playedCards.removeChild(cardList[i]);
    cardsInPlay.pop();
    i--;
  }
  createBoard();
}

createBoard();

scoreUpdate();