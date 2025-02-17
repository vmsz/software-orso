import groupingModel from "../models/groupingModel.js";

class GroupingController {

  async get(req, res) {
    let groupings = []
    try {
      for await (const grouping of req.body.groupings) {
        const selectedGroup = await groupingModel.findOne({
          where: {
            code: {
              K: grouping.K,
              TT: grouping.TT,
              UU: grouping.UU,
              VVV: grouping.VVV
            }
          }
        })
        groupings.push(selectedGroup.dataValues)
      }
      return res.status(200).json(groupings);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async create(req, res) {
    await groupingModel
      .create(req.body)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

export default new GroupingController();
