const cardsRouter = require("express").Router();
const { getAllCards } = require("../controllers/cards");
const { createCard } = require("../controllers/cards");
const { deleteCard } = require("../controllers/cards");
const { likeCard } = require("../controllers/cards");
const { dislikeCard } = require("../controllers/cards");

cardsRouter.get("/", getAllCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
cardsRouter.put("/:cardId/likes", likeCard);
cardsRouter.delete("/:cardId/likes", dislikeCard);

module.exports = cardsRouter;
