import { Response } from 'express';
import prisma from '../db';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '../constants';

export const halaqatController = {
  async getMyHalaqat(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      let halaqat;

      if (req.user.role === UserRole.TEACHER) {
        // Teachers see halaqat they created
        halaqat = await prisma.halaqah.findMany({
          where: { teacherId: req.user.id },
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
          orderBy: { createdAt: 'desc' },
        });
      } else {
        // Students see halaqat they're members of
        const memberships = await prisma.halaqahMember.findMany({
          where: { userId: req.user.id },
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
                _count: {
                  select: {
                    members: true,
                    assignments: true,
                  },
                },
              },
            },
          },
        });

        halaqat = memberships.map((m) => m.halaqah);
      }

      res.json({ halaqat });
    } catch (error) {
      console.error('Get my halaqat error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getHalaqahById(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
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
                  role: true,
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
                },
              },
            },
            orderBy: { dueDate: 'desc' },
          },
        },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      // Check if user has access
      const isMember = halaqah.members.some((m) => m.userId === req.user!.id);
      const isTeacher = halaqah.teacherId === req.user.id;
      const isAdmin = req.user.role === UserRole.ADMIN;

      if (!isMember && !isTeacher && !isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
      }

      res.json({ halaqah });
    } catch (error) {
      console.error('Get halaqah by id error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createHalaqah(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      if (req.user.role !== UserRole.TEACHER && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only teachers can create halaqat' });
      }

      const { name, description, schedule } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const halaqah = await prisma.halaqah.create({
        data: {
          name,
          description,
          schedule,
          teacherId: req.user.id,
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

      res.status(201).json({ halaqah });
    } catch (error) {
      console.error('Create halaqah error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateHalaqah(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;
      const { name, description, schedule } = req.body;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      if (halaqah.teacherId !== req.user.id && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updatedHalaqah = await prisma.halaqah.update({
        where: { id: parseInt(id) },
        data: {
          ...(name && { name }),
          ...(description !== undefined && { description }),
          ...(schedule !== undefined && { schedule }),
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

      res.json({ halaqah: updatedHalaqah });
    } catch (error) {
      console.error('Update halaqah error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async addMember(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;
      const { userId, role } = req.body;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      if (halaqah.teacherId !== req.user.id && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only the teacher can add members' });
      }

      const member = await prisma.halaqahMember.create({
        data: {
          halaqahId: parseInt(id),
          userId: parseInt(userId),
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

      res.status(201).json({ member });
    } catch (error) {
      console.error('Add member error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async removeMember(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id, memberId } = req.params;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      if (halaqah.teacherId !== req.user.id && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only the teacher can remove members' });
      }

      await prisma.halaqahMember.delete({
        where: { id: parseInt(memberId) },
      });

      res.json({ message: 'Member removed successfully' });
    } catch (error) {
      console.error('Remove member error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createAssignment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;
      const { userId, rangeStart, rangeEnd, dueDate, notes } = req.body;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      if (halaqah.teacherId !== req.user.id && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only the teacher can create assignments' });
      }

      if (!userId || !rangeStart || !rangeEnd || !dueDate) {
        return res.status(400).json({ message: 'userId, rangeStart, rangeEnd, and dueDate are required' });
      }

      const assignment = await prisma.assignment.create({
        data: {
          halaqahId: parseInt(id),
          userId: parseInt(userId),
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
            },
          },
        },
      });

      res.status(201).json({ assignment });
    } catch (error) {
      console.error('Create assignment error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getMyAssignments(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const assignments = await prisma.assignment.findMany({
        where: { userId: req.user.id },
        include: {
          halaqah: {
            select: {
              id: true,
              name: true,
              teacher: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { dueDate: 'asc' },
      });

      res.json({ assignments });
    } catch (error) {
      console.error('Get my assignments error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateAssignment(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { assignmentId } = req.params;
      const { status, notes, rangeStart, rangeEnd, dueDate } = req.body;

      const assignment = await prisma.assignment.findUnique({
        where: { id: parseInt(assignmentId) },
        include: { halaqah: true },
      });

      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }

      // Students can only update status, teachers can update everything
      const isTeacher = assignment.halaqah.teacherId === req.user.id;
      const isStudent = assignment.userId === req.user.id;

      if (!isTeacher && !isStudent && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updateData: any = {};
      if (status && isStudent) updateData.status = status;
      if (isTeacher || req.user.role === UserRole.ADMIN) {
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;
        if (rangeStart) updateData.rangeStart = rangeStart;
        if (rangeEnd) updateData.rangeEnd = rangeEnd;
        if (dueDate) updateData.dueDate = new Date(dueDate);
      }

      const updatedAssignment = await prisma.assignment.update({
        where: { id: parseInt(assignmentId) },
        data: updateData,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      res.json({ assignment: updatedAssignment });
    } catch (error) {
      console.error('Update assignment error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createSessionLog(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;
      const { date, studentLogs, notes } = req.body;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      if (halaqah.teacherId !== req.user.id && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only the teacher can create session logs' });
      }

      if (!studentLogs) {
        return res.status(400).json({ message: 'studentLogs is required' });
      }

      const sessionLog = await prisma.sessionLog.create({
        data: {
          halaqahId: parseInt(id),
          date: date ? new Date(date) : new Date(),
          studentLogs: JSON.stringify(studentLogs),
          notes,
        },
      });

      res.status(201).json({ sessionLog });
    } catch (error) {
      console.error('Create session log error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getSessionLogs(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const { id } = req.params;

      const halaqah = await prisma.halaqah.findUnique({
        where: { id: parseInt(id) },
      });

      if (!halaqah) {
        return res.status(404).json({ message: 'Halaqah not found' });
      }

      // Check if user has access
      const isMember = await prisma.halaqahMember.findFirst({
        where: {
          halaqahId: parseInt(id),
          userId: req.user.id,
        },
      });

      const isTeacher = halaqah.teacherId === req.user.id;
      const isAdmin = req.user.role === UserRole.ADMIN;

      if (!isMember && !isTeacher && !isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
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
  },
};
