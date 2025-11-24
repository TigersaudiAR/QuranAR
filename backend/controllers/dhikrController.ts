import { Response } from 'express';
import prisma from '../db';
import { AuthRequest } from '../middleware/auth';

export const dhikrController = {
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

  async getDhikrById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const dhikr = await prisma.dhikr.findUnique({
        where: { id: parseInt(id) },
      });

      if (!dhikr) {
        return res.status(404).json({ message: 'Dhikr not found' });
      }

      res.json({ dhikr });
    } catch (error) {
      console.error('Get dhikr by id error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
