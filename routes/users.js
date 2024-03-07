const Joi = require("joi");
const router = require("express").Router();

class User {
  constructor(parent) {
    this.init();
    this.userController = parent;
  }
  init() {
    this.setMiddleware();
    this.setRoutes();
  }

  setMiddleware() {
    // some middlewares
    router.use((req, res, next) => {
      console.log(req.body);
      next();
    });
  }

  setRoutes() {
    router.post("/login", (req, res) => {
      const schema = Joi.object({
        name: Joi.alternatives().try(
          Joi.string().alphanum().min(3).max(30).required(),
          Joi.string().email().required()
        ),
        password: Joi.string().alphanum().min(3).max(30).required(),
      });

      const { error } = schema.validate(req.body);
      if (!error) {
        const { name, password } = req.body;

        return res.status(200).json({ name, password });
      } else {
        return res.status(400).json({ error: error.details[0].message });
      }
    });
  }
  route() {
    return router;
  }
}

module.exports = () => {
  return new User();
};
