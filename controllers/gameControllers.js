export const renderBlackjack = (req, res) => {
  res.render("blackjack.ejs");
};

export const bet = (req, res) => {
  res.render("blackjack.ejs", { hasStarted: true });
};

export const startGame = (req, res) => {
  res.render("blackjack.ejs", { hasStarted: true})
}