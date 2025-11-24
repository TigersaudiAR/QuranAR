import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// All routes require authentication
router.use(authenticateToken);

// Get user's memorization sets
router.get('/sets', async (req: AuthRequest, res) => {
  try {
    const sets = await prisma.memorizationSet.findMany({
      where: { userId: req.user!.id },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ sets });
  } catch (error) {
    console.error('Get sets error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get specific set
router.get('/sets/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const set = await prisma.memorizationSet.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user!.id,
      },
      include: {
        items: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!set) {
      return res.status(404).json({ message: 'Set not found' });
    }

    res.json({ set });
  } catch (error) {
    console.error('Get set error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new set
router.post('/sets', async (req: AuthRequest, res) => {
  try {
    const { title, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required' });
    }

    if (!['SURAH', 'PAGE'].includes(type)) {
      return res.status(400).json({ message: 'Type must be SURAH or PAGE' });
    }

    const set = await prisma.memorizationSet.create({
      data: {
        title,
        type,
        userId: req.user!.id,
      },
      include: {
        items: true,
      },
    });

    res.json({ set });
  } catch (error) {
    console.error('Create set error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update set
router.put('/sets/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, type } = req.body;

    const existingSet = await prisma.memorizationSet.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user!.id,
      },
    });

    if (!existingSet) {
      return res.status(404).json({ message: 'Set not found' });
    }

    const set = await prisma.memorizationSet.update({
      where: { id: parseInt(id) },
      data: { title, type },
      include: {
        items: true,
      },
    });

    res.json({ set });
  } catch (error) {
    console.error('Update set error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete set
router.delete('/sets/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const existingSet = await prisma.memorizationSet.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user!.id,
      },
    });

    if (!existingSet) {
      return res.status(404).json({ message: 'Set not found' });
    }

    await prisma.memorizationSet.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Set deleted successfully' });
  } catch (error) {
    console.error('Delete set error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add item to set
router.post('/sets/:setId/items', async (req: AuthRequest, res) => {
  try {
    const { setId } = req.params;
    const { surahNumber, pageNumber, verseRange, status, masteryLevel, nextReviewDate } = req.body;

    const set = await prisma.memorizationSet.findFirst({
      where: {
        id: parseInt(setId),
        userId: req.user!.id,
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

    res.json({ item });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update item
router.put('/items/:itemId', async (req: AuthRequest, res) => {
  try {
    const { itemId } = req.params;
    const { status, masteryLevel, nextReviewDate } = req.body;

    const item = await prisma.memorizationItem.findUnique({
      where: { id: parseInt(itemId) },
      include: { set: true },
    });

    if (!item || item.set.userId !== req.user!.id) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const updatedItem = await prisma.memorizationItem.update({
      where: { id: parseInt(itemId) },
      data: {
        status,
        masteryLevel,
        nextReviewDate: nextReviewDate ? new Date(nextReviewDate) : undefined,
      },
    });

    res.json({ item: updatedItem });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete item
router.delete('/items/:itemId', async (req: AuthRequest, res) => {
  try {
    const { itemId } = req.params;

    const item = await prisma.memorizationItem.findUnique({
      where: { id: parseInt(itemId) },
      include: { set: true },
    });

    if (!item || item.set.userId !== req.user!.id) {
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
});

export default router;
