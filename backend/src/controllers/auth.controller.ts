import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const user = new User({
      email,
      password,
      name,
      role: 'user',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const user = new User({
      email,
      password,
      name,
      role: 'admin',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Error creating admin user' });
  }
}; 