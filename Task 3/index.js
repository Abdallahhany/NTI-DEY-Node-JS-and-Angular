const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const article_router = require("./routes/article_routes");

app.use(express.static(path.join(__dirname, "./public/static")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./public/views"));
hbs.registerPartials(path.join(__dirname, "./public/layouts"));
app.use(express.urlencoded({ extended: true }));

app.use(article_router);
app.all("*", (req, res) => res.render("err404", { pageTitle: "Not found" }));

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
