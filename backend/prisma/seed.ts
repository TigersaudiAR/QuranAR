import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('Admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedAdminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create lesson categories
  const tajweedCategory = await prisma.lessonCategory.upsert({
    where: { name: 'Tajweed' },
    update: {},
    create: {
      name: 'Tajweed',
      description: 'Rules of Quran recitation',
    },
  });

  const arabicCategory = await prisma.lessonCategory.upsert({
    where: { name: 'Arabic' },
    update: {},
    create: {
      name: 'Arabic',
      description: 'Arabic language lessons',
    },
  });

  const fiqhCategory = await prisma.lessonCategory.upsert({
    where: { name: 'Fiqh' },
    update: {},
    create: {
      name: 'Fiqh',
      description: 'Islamic jurisprudence',
    },
  });

  console.log('Created lesson categories');

  // Create example lesson
  const lesson = await prisma.lesson.create({
    data: {
      title: 'Introduction to Tajweed',
      categoryId: tajweedCategory.id,
      content: JSON.stringify({
        introduction: 'Tajweed is the science of proper Quranic recitation.',
        sections: [
          {
            title: 'What is Tajweed?',
            content: 'Tajweed means to improve, to make better. In the context of the Quran, it means to recite it properly, giving each letter its rights and dues.',
          },
          {
            title: 'Importance of Tajweed',
            content: 'Learning Tajweed is obligatory for every Muslim who wants to recite the Quran correctly.',
          },
        ],
      }),
      orderIndex: 1,
    },
  });
  console.log('Created example lesson:', lesson.title);

  // Create example dhikr
  const dhikr1 = await prisma.dhikr.create({
    data: {
      title: 'Morning Tasbih',
      arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
      transliteration: 'Subhana Allahi wa bihamdihi',
      translation: 'Glory be to Allah and praise Him',
      category: 'morning',
      repetitions: 100,
      reference: 'Sahih Muslim',
      orderIndex: 1,
    },
  });

  const dhikr2 = await prisma.dhikr.create({
    data: {
      title: 'Evening Protection',
      arabicText: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i, wa Huwas-Sami\'ul-\'Alim',
      translation: 'In the Name of Allah, Who with His Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing',
      category: 'evening',
      repetitions: 3,
      reference: 'Abu Dawud, At-Tirmidhi',
      orderIndex: 1,
    },
  });

  console.log('Created example dhikr');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
