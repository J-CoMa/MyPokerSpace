// Game variables
const suits = ["H", "D", "C", "S"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;

let gameStarted = false;

// UI variables
let cardDeckSource = "images/decks/StylizedDeck/white/";

// Player balance
let playerBalance = 100;
let currentBet = 0;

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame(bet) {
  gameStarted = true;
  currentBet = bet;
  playerBalance -= currentBet;

  createDeck();
  shuffleDeck();
  playerHand = [drawCard("player"), drawCard("player")];
  dealerHand = [drawCard("dealer"), drawCard("dealer")];
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);

  checkGameOver();
}

function drawCard(hand) {
  let drawnCard = deck.pop();

  $(document).ready(function () {
    $("#" + hand + "-cards").append(
        `<li class='card'><img src=${cardDeckSource}${drawnCard.suit}${drawnCard.value}.png></li>`
    );
  });

  return drawnCard;
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;

  hand.forEach((card) => {
    if (card.value === "A") {
      aceCount++;
      score += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  });

  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
}

function dealerTurn() {
  while (dealerScore < 17) {
    dealerHand.push(drawCard("dealer"));
    dealerScore = calculateScore(dealerHand);
  }
  checkWinner();
}

function checkGameOver() {
  if (playerScore > 21) {
    // Player bust
    settleBet("lose");
  } else if (dealerScore > 21) {
    // Dealer bust
    settleBet("win");
  } else if (playerScore === 21 && playerHand.length === 2) {
    // Blackjack player
    settleBet("blackjack");
  }
}

function checkWinner() {
  if (dealerScore > 21 || playerScore > dealerScore) {
    // Player win
    settleBet("win");
  } else if (playerScore < dealerScore) {
    // Dealer win
    settleBet("lose");
  } else {
    // Tie
    settleBet("tie");
  }
}

function settleBet(outcome) {
  if (outcome === "win") {
    // Win balance
    playerBalance += currentBet * 2;
  } else if (outcome === "blackjack") {
    // Blackjack balance
    playerBalance -= currentBet * 2.5;
  } else if (outcome === "lose") {
    // Lose balance
  } else if (outcome === "tie") {
    // Tie balance
    playerBalance += currentBet;
  }
  currentBet = 0;
  checkBalance();
}

function checkBalance() {
  if (playerBalance <= 0) {
    // No more balance
  } else {
    // Replay
  }
}

$(document).ready(function(){
  $(".hit").click(function(){
    playerHand.push(drawCard("player"));
    playerScore = calculateScore(playerHand);
    checkGameOver();
  });

  $(".stand").click(function(){
    dealerTurn();
  });
});

startGame();