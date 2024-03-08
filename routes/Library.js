const Joi = require("joi");
const router = require("express").Router();

class Library {
  constructor(libraryController) {
    this.libraryController = libraryController;
    this.init();
  }
  init() {
    this.setMiddleware();
    this.setRoutes();
  }

  setMiddleware() {
    // We add any middlewares
    router.use((req, res, next) => {
      next();
    });
  }

  setRoutes() {
    router.get("/retriveAll", (req, res) => {
      try {
        let url =
          "https://www.googleapis.com/books/v1/volumes?q=cosmos&key=AIzaSyB3XGEMIcMwwlY6nhAtskPLdA35pbIFXCc";

        let options = {
          method: "GET",
          headers: {
            Accept: "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          },
        };

        fetch(url, options)
          .then((res) => res.json())
          .then((response) => {
            return res.status(200).json(response);
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      } catch (error) {
        return res.status(400).json(error);
      }
    });

    router.get("/retrive/:type/:query", (req, res) => {
      try {
        const schema = Joi.object({
          type: Joi.string().max(5).min(4).valid("title", "isbn").required(),
          query: Joi.string().max(30).min(3).required(),
        });

        const { error } = schema.validate(req.params);
        if (!error) {
          let url = `https://www.googleapis.com/books/v1/volumes?q=${
            req.params.type == "title"
              ? `intitle:${req.params.query}`
              : req.params.query == "isbn"
              ? `isbn:${req.params.query}`
              : req.params.query
          }&key=AIzaSyB3XGEMIcMwwlY6nhAtskPLdA35pbIFXCc`;

          let options = {
            method: "GET",
            headers: {
              Accept: "*/*",
            },
          };
          fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              return res.status(200).json(response);
            })
            .catch((err) => {
              return res.status(400).json(err);
            });
        } else {
          return res.status(400).json({ msg: error.details[0].message });
        }
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  }

  route() {
    return router;
  }
}

module.exports = (libraryController) => {
  return new Library(libraryController);
};
