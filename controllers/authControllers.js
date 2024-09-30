export const renderHome = (req, res) => {
    res.render("home.ejs");
};

export const handleGoogleAuth = (req, res) => {
    res.send("Google Auth Route");
};