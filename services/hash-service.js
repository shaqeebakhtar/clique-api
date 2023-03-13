const crypto = require("crypto");

class HashService {
  async generateHash(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
