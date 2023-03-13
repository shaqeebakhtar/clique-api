const Jimp = require("jimp");
const path = require("path");
const UserDto = require("../dtos/user-dto");
const userService = require("../services/user-service");

class ActivateController {
  async activate(req, res) {
    const { name, username, avatar } = req.body;

    if (!name || !username || !avatar) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    ); // avatar

    const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imageName}`));
    } catch (error) {
      return res.status(500).json({ message: "unable to process the image" });
    }

    // update user
    const userId = req.user._id;

    try {
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.activated = true;
      user.name = name;
      user.username = username;
      user.avatar = `/storage/${imageName}`;
      await user.save();
      return res.json({ user: new UserDto(user), auth: true });
    } catch (error) {
      return res.status(500).json({ message: "something went wrong" });
    }
  }
}

module.exports = new ActivateController();
