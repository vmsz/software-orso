import inputModel from "../models/inputModel.js";

class InputController {
  async create(req, res) {
    await inputModel
      .create(req.body)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

}

export default new InputController();
