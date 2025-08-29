import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return token;
}

export default generateToken;