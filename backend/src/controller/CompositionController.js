import { QueryTypes } from "sequelize";
import database from "../config/database.js";

import compositionModel from "../models/compositionModel.js";
import inputModel from "../models/inputModel.js";

class CompositionController {

  async searchByDescription(req, res) {
    try {
      let compositions = await database.query(`
        (SELECT * FROM compositions 
        WHERE unaccent(LOWER(description)) LIKE '%' || :search || '%' LIMIT 6) 
        ORDER BY description ASC`, {
        replacements: { search: req.body.search },
        type: QueryTypes.SELECT,
      })

      for await (const composition of compositions) {
        for await (const input of composition.inputs) {

          let selectedInput = await inputModel.findOne({
            where: {
              code: input.code
            }
          })

          const resourceTotal = input.resourceTotal
          const quantity = input.quantity

          const indexOfInput = composition.inputs.indexOf(input)
          const indexOfComposition = compositions.indexOf(composition)

          compositions[indexOfComposition].inputs[indexOfInput] = {
            ...selectedInput.dataValues,
            resourceTotal,
            quantity
          }
        }
      }
      return res.status(200).json(compositions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async searchByCode(req, res) {
    try {
      let compositions = await database.query(`
        (SELECT * FROM compositions 
        WHERE unaccent(LOWER(concat(code->>'K', code->>'TT', code->>'UU', code->>'VVV', code->>'WWW'))) LIKE '%' || :search || '%' LIMIT 6) 
        ORDER BY concat(code->>'K', code->>'TT', code->>'UU', code->>'VVV', code->>'WWW') ASC`, {
        replacements: { search: req.body.search },
        type: QueryTypes.SELECT,
      })

      for await (const composition of compositions) {
        for await (const input of composition.inputs) {

          let selectedInput = await inputModel.findOne({
            where: {
              code: input.code
            }
          })

          const resourceTotal = input.resourceTotal
          const quantity = input.quantity

          const indexOfInput = composition.inputs.indexOf(input)
          const indexOfComposition = compositions.indexOf(composition)

          compositions[indexOfComposition].inputs[indexOfInput] = {
            ...selectedInput.dataValues,
            resourceTotal,
            quantity
          }
        }
      }
      return res.status(200).json(compositions);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async create(req, res) {
    await compositionModel
      .create(req.body)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

export default new CompositionController();
