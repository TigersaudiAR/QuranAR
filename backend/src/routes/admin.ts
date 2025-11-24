import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// All admin routes require authentication and ADMIN role
router.use(authenticateToken);
router.use(requireRole('ADMIN'));

// User Management
router.get('/users', async (req: AuthRequest, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/users', async (req: AuthRequest, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'STUDENT',
      },
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/users/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { email, name, role, password } = req.body;

    const updateData: any = { email, name, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/users/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Lesson Management
router.get('/lessons', async (req: AuthRequest, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category: { name: category as string } } : {};

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { orderIndex: 'asc' },
    });

    res.json({ lessons });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/lessons', async (req: AuthRequest, res) => {
  try {
    const { title, categoryName, content, orderIndex } = req.body;

    if (!title || !categoryName || !content) {
      return res.status(400).json({ message: 'Title, category, and content are required' });
    }

    let category = await prisma.lessonCategory.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      category = await prisma.lessonCategory.create({
        data: { name: categoryName },
      });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        categoryId: category.id,
        content,
        orderIndex: orderIndex || 0,
      },
      include: {
        category: true,
      },
    });

    res.json({ lesson });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/lessons/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, categoryName, content, orderIndex } = req.body;

    const updateData: any = { title, content, orderIndex };

    if (categoryName) {
      let category = await prisma.lessonCategory.findUnique({
        where: { name: categoryName },
      });

      if (!category) {
        category = await prisma.lessonCategory.create({
          data: { name: categoryName },
        });
      }

      updateData.categoryId = category.id;
    }

    const lesson = await prisma.lesson.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true,
      },
    });

    res.json({ lesson });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/lessons/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.lesson.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Category Management
router.get('/categories', async (req: AuthRequest, res) => {
  try {
    const categories = await prisma.lessonCategory.findMany({
      include: {
        _count: {
          select: { lessons: true },
        },
      },
    });
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/categories', async (req: AuthRequest, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const category = await prisma.lessonCategory.create({
      data: { name, description },
    });

    res.json({ category });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Dhikr Management
router.get('/dhikr', async (req: AuthRequest, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category: category as string } : {};

    const adhkar = await prisma.dhikr.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
    });

    res.json({ adhkar });
  } catch (error) {
    console.error('Get dhikr error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/dhikr', async (req: AuthRequest, res) => {
  try {
    const { title, arabicText, transliteration, translation, category, repetitions, reference, orderIndex } = req.body;

    if (!title || !arabicText) {
      return res.status(400).json({ message: 'Title and Arabic text are required' });
    }

    const dhikr = await prisma.dhikr.create({
      data: {
        title,
        arabicText,
        transliteration,
        translation,
        category: category || 'general',
        repetitions: repetitions || 1,
        reference,
        orderIndex: orderIndex || 0,
      },
    });

    res.json({ dhikr });
  } catch (error) {
    console.error('Create dhikr error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/dhikr/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, arabicText, transliteration, translation, category, repetitions, reference, orderIndex } = req.body;

    const dhikr = await prisma.dhikr.update({
      where: { id: parseInt(id) },
      data: {
        title,
        arabicText,
        transliteration,
        translation,
        category,
        repetitions,
        reference,
        orderIndex,
      },
    });

    res.json({ dhikr });
  } catch (error) {
    console.error('Update dhikr error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/dhikr/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.dhikr.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Dhikr deleted successfully' });
  } catch (error) {
    console.error('Delete dhikr error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Halaqat Management
router.get('/halaqat', async (req: AuthRequest, res) => {
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
            assignments: true,
          },
        },
      },
    });

    res.json({ halaqat });
  } catch (error) {
    console.error('Get halaqat error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/halaqat/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.halaqah.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Halaqah deleted successfully' });
  } catch (error) {
    console.error('Delete halaqah error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
