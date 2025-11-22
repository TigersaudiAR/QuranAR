import { Response } from 'express';
import prisma from '../db';
import { AuthRequest } from '../middleware/auth';

export const lessonsController = {
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

  async getLessonById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const lesson = await prisma.lesson.findUnique({
        where: { id: parseInt(id) },
      });

      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }

      res.json({ lesson });
    } catch (error) {
      console.error('Get lesson by id error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
