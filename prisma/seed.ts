import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@quran.com' },
    update: {},
    create: {
      email: 'admin@quran.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create teacher user
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@quran.com' },
    update: {},
    create: {
      email: 'teacher@quran.com',
      password: teacherPassword,
      name: 'Teacher User',
      role: 'TEACHER',
    },
  });
  console.log('Created teacher user:', teacher.email);

  // Create student user
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@quran.com' },
    update: {},
    create: {
      email: 'student@quran.com',
      password: studentPassword,
      name: 'Student User',
      role: 'STUDENT',
    },
  });
  console.log('Created student user:', student.email);

  // Create Tajweed lesson
  const tajweedLesson = await prisma.lesson.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Introduction to Tajweed',
      category: 'tajweed',
      content: JSON.stringify({
        introduction: 'Tajweed is the science of Quranic recitation.',
        sections: [
          {
            title: 'What is Tajweed?',
            content: 'Tajweed means "to improve" or "to make better". It is the set of rules governing how the Quran should be read.',
          },
          {
            title: 'Importance of Tajweed',
            content: 'Learning Tajweed helps us recite the Quran correctly and beautifully, as it was revealed to Prophet Muhammad (PBUH).',
          },
        ],
      }),
      orderIndex: 1,
    },
  });
  console.log('Created Tajweed lesson:', tajweedLesson.title);

  // Create Arabic lesson
  const arabicLesson = await prisma.lesson.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Arabic Alphabet Basics',
      category: 'arabic',
      content: JSON.stringify({
        introduction: 'Learn the basics of the Arabic alphabet.',
        sections: [
          {
            title: 'Introduction',
            content: 'The Arabic alphabet consists of 28 letters, all of which are consonants.',
          },
          {
            title: 'Reading Direction',
            content: 'Arabic is written and read from right to left.',
          },
        ],
      }),
      orderIndex: 1,
    },
  });
  console.log('Created Arabic lesson:', arabicLesson.title);

  // Create Fiqh lesson
  const fiqhLesson = await prisma.lesson.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Basics of Wudu',
      category: 'fiqh',
      content: JSON.stringify({
        introduction: 'Learn the proper way to perform ablution (Wudu).',
        sections: [
          {
            title: 'What is Wudu?',
            content: 'Wudu is the Islamic procedure for washing parts of the body using water, typically in preparation for formal prayers (salah).',
          },
          {
            title: 'Steps of Wudu',
            content: '1. Make intention (Niyyah)\n2. Say Bismillah\n3. Wash hands three times\n4. Rinse mouth three times\n5. Rinse nose three times\n6. Wash face three times\n7. Wash arms up to elbows three times\n8. Wipe head once\n9. Wipe ears once\n10. Wash feet up to ankles three times',
          },
        ],
      }),
      orderIndex: 1,
    },
  });
  console.log('Created Fiqh lesson:', fiqhLesson.title);

  // Create Dhikr entries
  const morningDhikr = await prisma.dhikr.upsert({
    where: { id: 1 },
    update: {},
    create: {
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
  console.log('Created Morning Dhikr:', morningDhikr.title);

  const eveningDhikr = await prisma.dhikr.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Evening Protection',
      arabicText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      transliteration: 'A\'udhu bi-kalimat illahi at-tammati min sharri ma khalaq',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
      category: 'evening',
      repetitions: 3,
      reference: 'Sahih Muslim',
      orderIndex: 1,
    },
  });
  console.log('Created Evening Dhikr:', eveningDhikr.title);

  const generalDhikr = await prisma.dhikr.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Istighfar',
      arabicText: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
      transliteration: 'Astaghfirullah wa atubu ilayh',
      translation: 'I seek forgiveness from Allah and repent to Him',
      category: 'general',
      repetitions: 100,
      reference: 'Sahih Bukhari',
      orderIndex: 1,
    },
  });
  console.log('Created General Dhikr:', generalDhikr.title);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
