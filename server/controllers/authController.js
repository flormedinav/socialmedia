import AuthServices from "../services/authServices.js";

const services = new AuthServices();

class AuthController {
  constructor() {}

  async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picture,
        location,
        occupation,
      } = req.body;

      const createdUserWithToken = await services.create({
        firstName,
        lastName,
        email,
        password,
        picture,
        location,
        occupation,
      });

      res.cookie("token", createdUserWithToken.data.token, {
        sameSite: "strict",
      });

      res.status(201).json(createdUserWithToken);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userAndToken = await services.login({
        email,
        password,
      });

      res.cookie("token", userAndToken.data.token, {
        sameSite: "strict",
      });

      res.status(200).json(userAndToken);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController;
