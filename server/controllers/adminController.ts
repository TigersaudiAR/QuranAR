import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '../constants';

export const adminController = {
  // User Management
  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json({ users });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createUser(req: AuthRequest, res: Response) {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || UserRole.STUDENT,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { email, name, role, password } = req.body;

      const updateData: any = {};
      if (email) updateData.email = email;
      if (name) updateData.name = name;
      if (role) updateData.role = role;
      if (password) updateData.password = await bcrypt.hash(password, 10);

      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      res.json({ user });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Lesson Management
  async getAllLessons(req: AuthRequest, res: Response) {
    try {
      const { category } = req.query;
      const where = category ? { category: category as string } : {};

      const lessons = await prisma.lesson.findMany({
        where,
        orderBy: { orderIndex: 'asc' },
      });

      res.json({ lessons });
    } catch (error) {
      console.error('Get all lessons error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createLesson(req: AuthRequest, res: Response) {
    try {
      const { title, category, content, orderIndex } = req.body;

      if (!title || !category || !content) {
        return res.status(400).json({ message: 'Title, category, and content are required' });
      }

      const lesson = await prisma.lesson.create({
        data: {
          title,
          category,
          content,
          orderIndex: orderIndex || 0,
        },
      });

      res.status(201).json({ lesson });
    } catch (error) {
      console.error('Create lesson error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateLesson(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, category, content, orderIndex } = req.body;

      const lesson = await prisma.lesson.update({
        where: { id: parseInt(id) },
        data: {
          ...(title && { title }),
          ...(category && { category }),
          ...(content && { content }),
          ...(orderIndex !== undefined && { orderIndex }),
        },
      });

      res.json({ lesson });
    } catch (error) {
      console.error('Update lesson error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteLesson(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      await prisma.lesson.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
      console.error('Delete lesson error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Halaqah Management
  async getAllHalaqat(req: AuthRequest, res: Response) {
    try {
      const halaqat = await prisma.halaqah.findMany({
        include: {
          teacher: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              members: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ halaqat });
    } catch (error) {
      console.error('Get all halaqat error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteHalaqah(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      await prisma.halaqah.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: 'Halaqah deleted successfully' });
    } catch (error) {
      console.error('Delete halaqah error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Dhikr Management
  async getAllDhikr(req: AuthRequest, res: Response) {
    try {
      const { category } = req.query;
      const where = category ? { category: category as string } : {};

      const adhkar = await prisma.dhikr.findMany({
        where,
        orderBy: { orderIndex: 'asc' },
      });

      res.json({ adhkar });
    } catch (error) {
      console.error('Get all dhikr error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createDhikr(req: AuthRequest, res: Response) {
    try {
      const { title, arabicText, transliteration, translation, category, repetitions, reference } = req.body;

      if (!title || !arabicText || !category || !repetitions) {
        return res.status(400).json({ message: 'Title, arabicText, category, and repetitions are required' });
      }

      const dhikr = await prisma.dhikr.create({
        data: {
          title,
          arabicText,
          transliteration,
          translation,
          category,
          repetitions: parseInt(repetitions),
          reference,
          orderIndex: 0,
        },
      });

      res.status(201).json({ dhikr });
    } catch (error) {
      console.error('Create dhikr error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateDhikr(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, arabicText, transliteration, translation, category, repetitions, reference, orderIndex } = req.body;

      const dhikr = await prisma.dhikr.update({
        where: { id: parseInt(id) },
        data: {
          ...(title && { title }),
          ...(arabicText && { arabicText }),
          ...(transliteration !== undefined && { transliteration }),
          ...(translation !== undefined && { translation }),
          ...(category && { category }),
          ...(repetitions && { repetitions: parseInt(repetitions) }),
          ...(reference !== undefined && { reference }),
          ...(orderIndex !== undefined && { orderIndex }),
        },
      });

      res.json({ dhikr });
    } catch (error) {
      console.error('Update dhikr error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteDhikr(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      await prisma.dhikr.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: 'Dhikr deleted successfully' });
    } catch (error) {
      console.error('Delete dhikr error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
