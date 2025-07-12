function generateStrongOTP(length = 6) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const all = lower + upper + digits;

  if (length < 3) throw new Error("OTP length must be at least 3");

  let OTP = [
    lower[Math.floor(Math.random() * lower.length)],
    upper[Math.floor(Math.random() * upper.length)],
    digits[Math.floor(Math.random() * digits.length)],
  ];

  for (let i = 3; i < length; i++) {
    OTP.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Shuffle to avoid predictable order
  return OTP
    .sort(() => Math.random() - 0.5)
    .join("");
}

export default generateStrongOTP;
