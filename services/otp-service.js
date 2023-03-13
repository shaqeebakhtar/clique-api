const crypto = require("crypto");
const hashService = require("./hash-service");

const twilioSid = process.env.TWILIO_SMS_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require("twilio")(twilioSid, twilioAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendOtpBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your OTP is ${otp}. Valid for 5 minutes - Clique`,
    });
  }

  async verifyOtp(hashedOtp, data) {
    const hashedData = await hashService.generateHash(data);
    return hashedData === hashedOtp;
  }
}

module.exports = new OtpService();
