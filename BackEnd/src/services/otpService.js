// src/services/otpService.js
const otpStore = require("../utils/miniStore");

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutos

function generateOtp() {
  // 6 dígitos numéricos
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function saveOtp(userId, otp, ttlMs = OTP_TTL_MS) {
  otpStore.set(userId, otp, ttlMs);
}

function verifyOtp(userId, otp) {
  const stored = otpStore.get(userId);
  if (!stored) return false;
  const isValid = stored === otp;
  if (isValid) {
    otpStore.delete(userId);
  }
  return isValid;
}

function deleteOtp(userId) {
  otpStore.delete(userId);
}

module.exports = {
  generateOtp,
  saveOtp,
  verifyOtp,
  deleteOtp,
  OTP_TTL_MS,
};
