const SpaceDto = require("../dtos/space-dto");
const spaceService = require("../services/space-service");

class SpacesController {
  async createSpace(req, res) {
    const { topic, spaceType } = req.body;

    if (!topic || !spaceType) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const space = await spaceService.create({
      topic,
      spaceType,
      hostId: req.user._id,
    });

    return res.json(new SpaceDto(space));
  }

  async index(req, res) {
    const spaces = await spaceService.getAllSpaces(["public"]);
    const allSpaces = spaces.map((space) => new SpaceDto(space));
    return res.json(allSpaces);
  }

  async show(req, res) {
    const space = await spaceService.getSpace(req.params.spaceId);
    return res.json(space);
  }
}

module.exports = new SpacesController();
