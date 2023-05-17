import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import Login from '../model/Login';

export async function registerUser(username: string, password: string): Promise<void> {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();
}

export async function loginUser(username: string, password: string): Promise<string> {
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET!);

  const newLogin = new Login({
    username,
    token: token,
  });

  await newLogin.save();

  return token;
}
