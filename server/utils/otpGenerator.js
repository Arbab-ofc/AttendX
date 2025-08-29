import otpGenerator from 'otp-generator';

export const generateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    alphabets: true,
    upperCase: true,
    specialChars: false
  });
};
