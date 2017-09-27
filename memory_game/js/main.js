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
  if (score === 5) {
    bonus();
  }
}

// this funtion shuffles the objects in the cards array.
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
    if (score > 5) {
      score++;
    }
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
  this.removeEventListener("click", flipCard);
}


// creates img elements and sets to back of card for all. Also sets event listeners for card flip and reset/continue playing button.
var createBoard = function() {
	for (i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
    var startButton = document.getElementById("startGame");
    var resetButton = document.getElementById("resetButton");
    var replayButton = document.getElementById("playAgain");
		cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("data-id", i);
    cardElement.addEventListener("click", flipCard);
    startButton.addEventListener("click", runClock);
    resetButton.addEventListener("click", resetBoard);
    replayButton.addEventListener("click", playAgain);
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

// initiates bonus round by removing instructions and replacing with flashing text and changing background color.
var bonus = function() {
  var bonusElement = document.createElement("p");
  var body = document.getElementsByTagName("body")[0];
  var whiteCount = document.getElementById("count");
  var whiteClock = document.getElementsByTagName("h3")[0];
  bonusElement.setAttribute("class", "bonusStyle");
  bonusElement.textContent = "BONUS ROUND! x2 POINTS!"
  body.style.background = "#F15B31";
  whiteCount.style.color = "#FFF";
  whiteClock.style.color = "#FFF";
  document.getElementById("bonus").appendChild(bonusElement);
}

var runClock = function() {
  var countdownElement = document.getElementById('clock'), seconds = 39, second = 0, interval;
  interval = setInterval(function() {
    countdownElement.firstChild.textContent = (seconds - second);
    if (second >= seconds) {
      clearInterval(interval);
      countdownElement.firstChild.textContent = "Time's Up!";
      var endBonus = document.getElementById("bonus");
      var playAgain = document.getElementById("resetGame");
      var body = document.getElementsByTagName("body")[0];
      endBonus.style.display = "none";
      playAgain.style.display = "block";
      body.style.background = "#FFF";
      var colorCount = document.getElementById("count");
      var colorClock = document.getElementsByTagName("h3")[0];
      colorCount.style.color = "#000";
      colorClock.style.color = "#F15B31";
      var yourScore = document.createElement("h4");
      yourScore.textContent = "Final Score: " + score;
      document.getElementById("finalScore").appendChild(yourScore);
      var hideScore = document.getElementById("scoreCounter");
      hideScore.style.display = "none";
      var card1 = document.getElementsByTagName("img")[0];
      card1.removeEventListener("click", flipCard);
      var card2 = document.getElementsByTagName("img")[1];
      card2.removeEventListener("click", flipCard);
      var card3 = document.getElementsByTagName("img")[2];
      card3.removeEventListener("click", flipCard);
      var card4 = document.getElementsByTagName("img")[3];
      card4.removeEventListener("click", flipCard);
    }
    second++;
  }, 1000);
  var instructions = document.getElementById("instructions");
  var startButton = document.getElementById("startGame");
  instructions.style.display = "none";
  startButton.style.display = "none";
}

var playAgain = function() {
  location.reload();
}

// on page load: shuffles cards, sets out board and updates the current score to 0 in the html.
shuffle();
createBoard();
scoreUpdate();