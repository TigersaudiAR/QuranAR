import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

// All routes require authentication
router.use(authenticateToken);

// Get user's halaqat (as teacher or student)
router.get('/', async (req: AuthRequest, res) => {
  try {
    const halaqat = await prisma.halaqah.findMany({
      where: {
        OR: [
          { teacherId: req.user!.id },
          { members: { some: { userId: req.user!.id } } },
        ],
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
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

// Get specific halaqah
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        OR: [
          { teacherId: req.user!.id },
          { members: { some: { userId: req.user!.id } } },
        ],
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        assignments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { dueDate: 'asc' },
        },
        sessionLogs: {
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found' });
    }

    res.json({ halaqah });
  } catch (error) {
    console.error('Get halaqah error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create halaqah (Teacher/Admin only)
router.post('/', requireRole('TEACHER', 'ADMIN'), async (req: AuthRequest, res) => {
  try {
    const { name, description, schedule } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const halaqah = await prisma.halaqah.create({
      data: {
        name,
        description,
        schedule,
        teacherId: req.user!.id,
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({ halaqah });
  } catch (error) {
    console.error('Create halaqah error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update halaqah
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, description, schedule } = req.body;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        teacherId: req.user!.id,
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found or unauthorized' });
    }

    const updatedHalaqah = await prisma.halaqah.update({
      where: { id: parseInt(id) },
      data: { name, description, schedule },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({ halaqah: updatedHalaqah });
  } catch (error) {
    console.error('Update halaqah error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add member to halaqah
router.post('/:id/members', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        teacherId: req.user!.id,
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found or unauthorized' });
    }

    const member = await prisma.halaqahMember.create({
      data: {
        halaqahId: parseInt(id),
        userId,
        role: role || 'STUDENT',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({ member });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove member from halaqah
router.delete('/:id/members/:memberId', async (req: AuthRequest, res) => {
  try {
    const { id, memberId } = req.params;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        teacherId: req.user!.id,
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found or unauthorized' });
    }

    await prisma.halaqahMember.delete({
      where: { id: parseInt(memberId) },
    });

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create assignment
router.post('/:id/assignments', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { userId, rangeStart, rangeEnd, dueDate, notes } = req.body;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        teacherId: req.user!.id,
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found or unauthorized' });
    }

    if (!userId || !rangeStart || !rangeEnd || !dueDate) {
      return res.status(400).json({ message: 'userId, rangeStart, rangeEnd, and dueDate are required' });
    }

    const assignment = await prisma.assignment.create({
      data: {
        halaqahId: parseInt(id),
        userId,
        rangeStart,
        rangeEnd,
        dueDate: new Date(dueDate),
        notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({ assignment });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's assignments
router.get('/assignments/me', async (req: AuthRequest, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { userId: req.user!.id },
      include: {
        halaqah: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { dueDate: 'asc' },
    });

    res.json({ assignments });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update assignment
router.put('/assignments/:assignmentId', async (req: AuthRequest, res) => {
  try {
    const { assignmentId } = req.params;
    const { status, notes } = req.body;

    const assignment = await prisma.assignment.findUnique({
      where: { id: parseInt(assignmentId) },
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (assignment.userId !== req.user!.id) {
      const halaqah = await prisma.halaqah.findFirst({
        where: {
          id: assignment.halaqahId,
          teacherId: req.user!.id,
        },
      });

      if (!halaqah) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    }

    const updatedAssignment = await prisma.assignment.update({
      where: { id: parseInt(assignmentId) },
      data: { status, notes },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({ assignment: updatedAssignment });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create session log (Teacher only)
router.post('/:id/session-logs', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { date, studentLogs, notes } = req.body;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        teacherId: req.user!.id,
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found or unauthorized' });
    }

    const sessionLog = await prisma.sessionLog.create({
      data: {
        halaqahId: parseInt(id),
        date: date ? new Date(date) : new Date(),
        studentLogs: JSON.stringify(studentLogs),
        notes,
      },
    });

    res.json({ sessionLog });
  } catch (error) {
    console.error('Create session log error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get session logs for halaqah
router.get('/:id/session-logs', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const halaqah = await prisma.halaqah.findFirst({
      where: {
        id: parseInt(id),
        OR: [
          { teacherId: req.user!.id },
          { members: { some: { userId: req.user!.id } } },
        ],
      },
    });

    if (!halaqah) {
      return res.status(404).json({ message: 'Halaqah not found or unauthorized' });
    }

    const sessionLogs = await prisma.sessionLog.findMany({
      where: { halaqahId: parseInt(id) },
      orderBy: { date: 'desc' },
    });

    res.json({ sessionLogs });
  } catch (error) {
    console.error('Get session logs error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
