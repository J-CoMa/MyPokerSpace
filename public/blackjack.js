var houseCards = [];
var playerCards = [];

var houseCardsUI = document.getElementById("house-cards");
var playerCardsUI = document.getElementById("player-cards");

$(document).ready(function(){
  $(".hit").click(function(){
    $("#player-cards").append("<li class='card'><img src='images/decks/StylizedDeck/PNG/white/Clovers_Jack_white.png' alt=''></li>");
  });
});
