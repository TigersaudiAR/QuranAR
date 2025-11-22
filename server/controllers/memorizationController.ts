import { Response } from 'express';
import prisma from '../db';
import { AuthRequest } from '../middleware/auth';

export const memorizationController = {
  async getAllSets(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const sets = await prisma.memorizationSet.findMany({
        where: { userId: req.user.id },
        include: {
          items: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ sets });
    } catch (error) {
      console.error('Get all sets error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getSetById(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;

      const set = await prisma.memorizationSet.findFirst({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
        include: {
          items: true,
        },
      });

      if (!set) {
        return res.status(404).json({ message: 'Set not found' });
      }

      res.json({ set });
    } catch (error) {
      console.error('Get set by id error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createSet(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { title, type } = req.body;

      if (!title || !type) {
        return res.status(400).json({ message: 'Title and type are required' });
      }

      const set = await prisma.memorizationSet.create({
        data: {
          title,
          type,
          userId: req.user.id,
        },
        include: {
          items: true,
        },
      });

      res.status(201).json({ set });
    } catch (error) {
      console.error('Create set error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateSet(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;
      const { title, type } = req.body;

      const set = await prisma.memorizationSet.updateMany({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
        data: {
          ...(title && { title }),
          ...(type && { type }),
        },
      });

      if (set.count === 0) {
        return res.status(404).json({ message: 'Set not found' });
      }

      const updatedSet = await prisma.memorizationSet.findFirst({
        where: { id: parseInt(id) },
        include: { items: true },
      });

      res.json({ set: updatedSet });
    } catch (error) {
      console.error('Update set error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteSet(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;

      const result = await prisma.memorizationSet.deleteMany({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
      });

      if (result.count === 0) {
        return res.status(404).json({ message: 'Set not found' });
      }

      res.json({ message: 'Set deleted successfully' });
    } catch (error) {
      console.error('Delete set error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async addItem(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { setId } = req.params;
      const { surahNumber, pageNumber, verseRange, status, masteryLevel, nextReviewDate } = req.body;

      // Verify set belongs to user
      const set = await prisma.memorizationSet.findFirst({
        where: {
          id: parseInt(setId),
          userId: req.user.id,
        },
      });

      if (!set) {
        return res.status(404).json({ message: 'Set not found' });
      }

      const item = await prisma.memorizationItem.create({
        data: {
          setId: parseInt(setId),
          surahNumber,
          pageNumber,
          verseRange,
          status: status || 'NEW',
          masteryLevel: masteryLevel || 0,
          nextReviewDate: nextReviewDate ? new Date(nextReviewDate) : null,
        },
      });

      res.status(201).json({ item });
    } catch (error) {
      console.error('Add item error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateItem(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { itemId } = req.params;
      const { status, masteryLevel, nextReviewDate, surahNumber, pageNumber, verseRange } = req.body;

      // Verify item belongs to user's set
      const item = await prisma.memorizationItem.findFirst({
        where: { id: parseInt(itemId) },
        include: { set: true },
      });

      if (!item || item.set.userId !== req.user.id) {
        return res.status(404).json({ message: 'Item not found' });
      }

      const updatedItem = await prisma.memorizationItem.update({
        where: { id: parseInt(itemId) },
        data: {
          ...(status && { status }),
          ...(masteryLevel !== undefined && { masteryLevel }),
          ...(nextReviewDate && { nextReviewDate: new Date(nextReviewDate) }),
          ...(surahNumber !== undefined && { surahNumber }),
          ...(pageNumber !== undefined && { pageNumber }),
          ...(verseRange !== undefined && { verseRange }),
        },
      });

      res.json({ item: updatedItem });
    } catch (error) {
      console.error('Update item error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteItem(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { itemId } = req.params;

      // Verify item belongs to user's set
      const item = await prisma.memorizationItem.findFirst({
        where: { id: parseInt(itemId) },
        include: { set: true },
      });

      if (!item || item.set.userId !== req.user.id) {
        return res.status(404).json({ message: 'Item not found' });
      }

      await prisma.memorizationItem.delete({
        where: { id: parseInt(itemId) },
      });

      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Delete item error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
