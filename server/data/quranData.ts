// بيانات القرآن الكريم

// أسماء السور
export const surahs = [
  { id: 1, name: "الفَاتِحة", englishName: "Al-Fātiḥah", revelationType: "meccan", versesCount: 7 },
  { id: 2, name: "البَقَرَة", englishName: "Al-Baqarah", revelationType: "medinan", versesCount: 286 },
  { id: 3, name: "آل عِمرَان", englishName: "Āl-'Imrān", revelationType: "medinan", versesCount: 200 },
  { id: 4, name: "النِّسَاء", englishName: "An-Nisā'", revelationType: "medinan", versesCount: 176 },
  { id: 5, name: "المَائدة", englishName: "Al-Mā'idah", revelationType: "medinan", versesCount: 120 },
  { id: 6, name: "الأنعَام", englishName: "Al-An'ām", revelationType: "meccan", versesCount: 165 },
  { id: 7, name: "الأعرَاف", englishName: "Al-A'rāf", revelationType: "meccan", versesCount: 206 },
  { id: 8, name: "الأنفَال", englishName: "Al-Anfāl", revelationType: "medinan", versesCount: 75 },
  { id: 9, name: "التوبَة", englishName: "At-Tawbah", revelationType: "medinan", versesCount: 129 },
  { id: 10, name: "يُونس", englishName: "Yūnus", revelationType: "meccan", versesCount: 109 },
  { id: 11, name: "هُود", englishName: "Hūd", revelationType: "meccan", versesCount: 123 },
  { id: 12, name: "يُوسُف", englishName: "Yūsuf", revelationType: "meccan", versesCount: 111 },
  { id: 13, name: "الرَّعْد", englishName: "Ar-Ra'd", revelationType: "meccan", versesCount: 43 },
  { id: 14, name: "إبراهِيم", englishName: "Ibrāhīm", revelationType: "meccan", versesCount: 52 },
  { id: 15, name: "الحِجْر", englishName: "Al-Ḥijr", revelationType: "meccan", versesCount: 99 },
  { id: 16, name: "النَّحْل", englishName: "An-Naḥl", revelationType: "meccan", versesCount: 128 },
  { id: 17, name: "الإسْرَاء", englishName: "Al-Isrā'", revelationType: "meccan", versesCount: 111 },
  { id: 18, name: "الكهْف", englishName: "Al-Kahf", revelationType: "meccan", versesCount: 110 },
  { id: 19, name: "مَريَم", englishName: "Maryam", revelationType: "meccan", versesCount: 98 },
  { id: 20, name: "طه", englishName: "Ṭā-Hā", revelationType: "meccan", versesCount: 135 },
  { id: 21, name: "الأنبيَاء", englishName: "Al-Anbiyā'", revelationType: "meccan", versesCount: 112 },
  { id: 22, name: "الحَج", englishName: "Al-Ḥajj", revelationType: "medinan", versesCount: 78 },
  { id: 23, name: "المُؤمنون", englishName: "Al-Mu'minūn", revelationType: "meccan", versesCount: 118 },
  { id: 24, name: "النُّور", englishName: "An-Nūr", revelationType: "medinan", versesCount: 64 },
  { id: 25, name: "الفُرْقان", englishName: "Al-Furqān", revelationType: "meccan", versesCount: 77 },
  { id: 26, name: "الشُّعَرَاء", englishName: "Ash-Shu'arā'", revelationType: "meccan", versesCount: 227 },
  { id: 27, name: "النَّمْل", englishName: "An-Naml", revelationType: "meccan", versesCount: 93 },
  { id: 28, name: "القَصَص", englishName: "Al-Qaṣaṣ", revelationType: "meccan", versesCount: 88 },
  { id: 29, name: "العَنكبوت", englishName: "Al-'Ankabūt", revelationType: "meccan", versesCount: 69 },
  { id: 30, name: "الرُّوم", englishName: "Ar-Rūm", revelationType: "meccan", versesCount: 60 },
  { id: 31, name: "لُقمان", englishName: "Luqmān", revelationType: "meccan", versesCount: 34 },
  { id: 32, name: "السَّجدَة", englishName: "As-Sajdah", revelationType: "meccan", versesCount: 30 },
  { id: 33, name: "الأحزَاب", englishName: "Al-Aḥzāb", revelationType: "medinan", versesCount: 73 },
  { id: 34, name: "سَبَأ", englishName: "Saba'", revelationType: "meccan", versesCount: 54 },
  { id: 35, name: "فَاطِر", englishName: "Fāṭir", revelationType: "meccan", versesCount: 45 },
  { id: 36, name: "يس", englishName: "Yā-Sīn", revelationType: "meccan", versesCount: 83 },
  { id: 37, name: "الصَّافات", englishName: "Aṣ-Ṣāffāt", revelationType: "meccan", versesCount: 182 },
  { id: 38, name: "ص", englishName: "Ṣād", revelationType: "meccan", versesCount: 88 },
  { id: 39, name: "الزُّمَر", englishName: "Az-Zumar", revelationType: "meccan", versesCount: 75 },
  { id: 40, name: "غَافِر", englishName: "Ghāfir", revelationType: "meccan", versesCount: 85 },
  { id: 41, name: "فُصِّلَت", englishName: "Fuṣṣilat", revelationType: "meccan", versesCount: 54 },
  { id: 42, name: "الشُّورى", englishName: "Ash-Shūrā", revelationType: "meccan", versesCount: 53 },
  { id: 43, name: "الزُّخْرُف", englishName: "Az-Zukhruf", revelationType: "meccan", versesCount: 89 },
  { id: 44, name: "الدُّخان", englishName: "Ad-Dukhān", revelationType: "meccan", versesCount: 59 },
  { id: 45, name: "الجَاثيَة", englishName: "Al-Jāthiyah", revelationType: "meccan", versesCount: 37 },
  { id: 46, name: "الأحقاف", englishName: "Al-Aḥqāf", revelationType: "meccan", versesCount: 35 },
  { id: 47, name: "مُحَمَّد", englishName: "Muḥammad", revelationType: "medinan", versesCount: 38 },
  { id: 48, name: "الفَتْح", englishName: "Al-Fatḥ", revelationType: "medinan", versesCount: 29 },
  { id: 49, name: "الحُجُرات", englishName: "Al-Ḥujurāt", revelationType: "medinan", versesCount: 18 },
  { id: 50, name: "ق", englishName: "Qāf", revelationType: "meccan", versesCount: 45 },
  { id: 51, name: "الذَّاريَات", englishName: "Adh-Dhāriyāt", revelationType: "meccan", versesCount: 60 },
  { id: 52, name: "الطُّور", englishName: "Aṭ-Ṭūr", revelationType: "meccan", versesCount: 49 },
  { id: 53, name: "النَّجْم", englishName: "An-Najm", revelationType: "meccan", versesCount: 62 },
  { id: 54, name: "القَمَر", englishName: "Al-Qamar", revelationType: "meccan", versesCount: 55 },
  { id: 55, name: "الرَّحمن", englishName: "Ar-Raḥmān", revelationType: "medinan", versesCount: 78 },
  { id: 56, name: "الوَاقِعَة", englishName: "Al-Wāqi'ah", revelationType: "meccan", versesCount: 96 },
  { id: 57, name: "الحَديد", englishName: "Al-Ḥadīd", revelationType: "medinan", versesCount: 29 },
  { id: 58, name: "المُجادلة", englishName: "Al-Mujādilah", revelationType: "medinan", versesCount: 22 },
  { id: 59, name: "الحَشر", englishName: "Al-Ḥashr", revelationType: "medinan", versesCount: 24 },
  { id: 60, name: "المُمتَحنَة", englishName: "Al-Mumtaḥanah", revelationType: "medinan", versesCount: 13 },
  { id: 61, name: "الصَّف", englishName: "Aṣ-Ṣaff", revelationType: "medinan", versesCount: 14 },
  { id: 62, name: "الجُمُعَة", englishName: "Al-Jumu'ah", revelationType: "medinan", versesCount: 11 },
  { id: 63, name: "المُنافِقون", englishName: "Al-Munāfiqūn", revelationType: "medinan", versesCount: 11 },
  { id: 64, name: "التَّغابُن", englishName: "At-Taghābun", revelationType: "medinan", versesCount: 18 },
  { id: 65, name: "الطَّلاق", englishName: "Aṭ-Ṭalāq", revelationType: "medinan", versesCount: 12 },
  { id: 66, name: "التَّحْريم", englishName: "At-Taḥrīm", revelationType: "medinan", versesCount: 12 },
  { id: 67, name: "المُلْك", englishName: "Al-Mulk", revelationType: "meccan", versesCount: 30 },
  { id: 68, name: "القَلَم", englishName: "Al-Qalam", revelationType: "meccan", versesCount: 52 },
  { id: 69, name: "الحَاقَّة", englishName: "Al-Ḥāqqah", revelationType: "meccan", versesCount: 52 },
  { id: 70, name: "المَعارج", englishName: "Al-Ma'ārij", revelationType: "meccan", versesCount: 44 },
  { id: 71, name: "نُوح", englishName: "Nūḥ", revelationType: "meccan", versesCount: 28 },
  { id: 72, name: "الجِن", englishName: "Al-Jinn", revelationType: "meccan", versesCount: 28 },
  { id: 73, name: "المُزَّمِّل", englishName: "Al-Muzzammil", revelationType: "meccan", versesCount: 20 },
  { id: 74, name: "المُدَّثِّر", englishName: "Al-Muddaththir", revelationType: "meccan", versesCount: 56 },
  { id: 75, name: "القِيامَة", englishName: "Al-Qiyāmah", revelationType: "meccan", versesCount: 40 },
  { id: 76, name: "الإنسان", englishName: "Al-Insān", revelationType: "medinan", versesCount: 31 },
  { id: 77, name: "المُرسَلات", englishName: "Al-Mursalāt", revelationType: "meccan", versesCount: 50 },
  { id: 78, name: "النَّبَأ", englishName: "An-Naba'", revelationType: "meccan", versesCount: 40 },
  { id: 79, name: "النّازعَات", englishName: "An-Nāzi'āt", revelationType: "meccan", versesCount: 46 },
  { id: 80, name: "عَبَس", englishName: "'Abasa", revelationType: "meccan", versesCount: 42 },
  { id: 81, name: "التَّكوير", englishName: "At-Takwīr", revelationType: "meccan", versesCount: 29 },
  { id: 82, name: "الانفِطار", englishName: "Al-Infiṭār", revelationType: "meccan", versesCount: 19 },
  { id: 83, name: "المُطَفِّفين", englishName: "Al-Muṭaffifīn", revelationType: "meccan", versesCount: 36 },
  { id: 84, name: "الانشِقاق", englishName: "Al-Inshiqāq", revelationType: "meccan", versesCount: 25 },
  { id: 85, name: "البُروج", englishName: "Al-Burūj", revelationType: "meccan", versesCount: 22 },
  { id: 86, name: "الطَّارق", englishName: "Aṭ-Ṭāriq", revelationType: "meccan", versesCount: 17 },
  { id: 87, name: "الأعلى", englishName: "Al-A'lā", revelationType: "meccan", versesCount: 19 },
  { id: 88, name: "الغاشِيَة", englishName: "Al-Ghāshiyah", revelationType: "meccan", versesCount: 26 },
  { id: 89, name: "الفَجْر", englishName: "Al-Fajr", revelationType: "meccan", versesCount: 30 },
  { id: 90, name: "البَلَد", englishName: "Al-Balad", revelationType: "meccan", versesCount: 20 },
  { id: 91, name: "الشَّمْس", englishName: "Ash-Shams", revelationType: "meccan", versesCount: 15 },
  { id: 92, name: "اللَّيل", englishName: "Al-Layl", revelationType: "meccan", versesCount: 21 },
  { id: 93, name: "الضُّحى", englishName: "Aḍ-Ḍuḥā", revelationType: "meccan", versesCount: 11 },
  { id: 94, name: "الشَّرْح", englishName: "Ash-Sharḥ", revelationType: "meccan", versesCount: 8 },
  { id: 95, name: "التِّين", englishName: "At-Tīn", revelationType: "meccan", versesCount: 8 },
  { id: 96, name: "العَلَق", englishName: "Al-'Alaq", revelationType: "meccan", versesCount: 19 },
  { id: 97, name: "القَدْر", englishName: "Al-Qadr", revelationType: "meccan", versesCount: 5 },
  { id: 98, name: "البَيِّنَة", englishName: "Al-Bayyinah", revelationType: "medinan", versesCount: 8 },
  { id: 99, name: "الزَّلزَلة", englishName: "Az-Zalzalah", revelationType: "medinan", versesCount: 8 },
  { id: 100, name: "العَادِيات", englishName: "Al-'Ādiyāt", revelationType: "meccan", versesCount: 11 },
  { id: 101, name: "القارِعَة", englishName: "Al-Qāri'ah", revelationType: "meccan", versesCount: 11 },
  { id: 102, name: "التَّكاثُر", englishName: "At-Takāthur", revelationType: "meccan", versesCount: 8 },
  { id: 103, name: "العَصْر", englishName: "Al-'Aṣr", revelationType: "meccan", versesCount: 3 },
  { id: 104, name: "الهُمَزَة", englishName: "Al-Humazah", revelationType: "meccan", versesCount: 9 },
  { id: 105, name: "الفِيل", englishName: "Al-Fīl", revelationType: "meccan", versesCount: 5 },
  { id: 106, name: "قُرَيْش", englishName: "Quraysh", revelationType: "meccan", versesCount: 4 },
  { id: 107, name: "المَاعُون", englishName: "Al-Mā'ūn", revelationType: "meccan", versesCount: 7 },
  { id: 108, name: "الكَوْثَر", englishName: "Al-Kawthar", revelationType: "meccan", versesCount: 3 },
  { id: 109, name: "الكافِرُون", englishName: "Al-Kāfirūn", revelationType: "meccan", versesCount: 6 },
  { id: 110, name: "النَّصر", englishName: "An-Naṣr", revelationType: "medinan", versesCount: 3 },
  { id: 111, name: "المَسَد", englishName: "Al-Masad", revelationType: "meccan", versesCount: 5 },
  { id: 112, name: "الإخْلاص", englishName: "Al-Ikhlāṣ", revelationType: "meccan", versesCount: 4 },
  { id: 113, name: "الفَلَق", englishName: "Al-Falaq", revelationType: "meccan", versesCount: 5 },
  { id: 114, name: "النَّاس", englishName: "An-Nās", revelationType: "meccan", versesCount: 6 }
];

// تعرّيف لسورة الفاتحة
export const surahFatiha = {
  id: 1,
  name: "الفَاتِحة",
  englishName: "Al-Fātiḥah",
  revelationType: "meccan",
  versesCount: 7,
  verses: [
    { id: 1, number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 },
    { id: 2, number: 2, numberInSurah: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 },
    { id: 3, number: 3, numberInSurah: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 },
    { id: 4, number: 4, numberInSurah: 4, text: "مَالِكِ يَوْمِ الدِّينِ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 },
    { id: 5, number: 5, numberInSurah: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 },
    { id: 6, number: 6, numberInSurah: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 },
    { id: 7, number: 7, numberInSurah: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", surahName: "الفَاتِحة", juzNumber: 1, pageNumber: 1 }
  ]
};

// تعريف سورة البقرة
export const surahBaqarah = {
  id: 2,
  name: "البَقَرَة",
  englishName: "Al-Baqarah",
  revelationType: "medinan",
  versesCount: 286,
  verses: [
    { id: 1, number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 2, number: 2, numberInSurah: 2, text: "الم", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 3, number: 3, numberInSurah: 3, text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 4, number: 4, numberInSurah: 4, text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 5, number: 5, numberInSurah: 5, text: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 6, number: 6, numberInSurah: 6, text: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 7, number: 7, numberInSurah: 7, text: "إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 8, number: 8, numberInSurah: 8, text: "خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 9, number: 9, numberInSurah: 9, text: "وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 10, number: 10, numberInSurah: 10, text: "يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 11, number: 11, numberInSurah: 11, text: "فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 2 },
    { id: 12, number: 12, numberInSurah: 12, text: "وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 13, number: 13, numberInSurah: 13, text: "أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَٰكِن لَّا يَشْعُرُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 14, number: 14, numberInSurah: 14, text: "وَإِذَا قِيلَ لَهُمْ آمِنُوا كَمَا آمَنَ النَّاسُ قَالُوا أَنُؤْمِنُ كَمَا آمَنَ السُّفَهَاءُ ۗ أَلَا إِنَّهُمْ هُمُ السُّفَهَاءُ وَلَٰكِن لَّا يَعْلَمُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 15, number: 15, numberInSurah: 15, text: "وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا وَإِذَا خَلَوْا إِلَىٰ شَيَاطِينِهِمْ قَالُوا إِنَّا مَعَكُمْ إِنَّمَا نَحْنُ مُسْتَهْزِئُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 16, number: 16, numberInSurah: 16, text: "اللَّهُ يَسْتَهْزِئُ بِهِمْ وَيَمُدُّهُمْ فِي طُغْيَانِهِمْ يَعْمَهُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 17, number: 17, numberInSurah: 17, text: "أُولَٰئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَىٰ فَمَا رَبِحَت تِّجَارَتُهُمْ وَمَا كَانُوا مُهْتَدِينَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 18, number: 18, numberInSurah: 18, text: "مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ ذَهَبَ اللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِي ظُلُمَاتٍ لَّا يُبْصِرُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 19, number: 19, numberInSurah: 19, text: "صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَرْجِعُونَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 3 },
    { id: 20, number: 20, numberInSurah: 20, text: "أَوْ كَصَيِّبٍ مِّنَ السَّمَاءِ فِيهِ ظُلُمَاتٌ وَرَعْدٌ وَبَرْقٌ يَجْعَلُونَ أَصَابِعَهُمْ فِي آذَانِهِم مِّنَ الصَّوَاعِقِ حَذَرَ الْمَوْتِ ۚ وَاللَّهُ مُحِيطٌ بِالْكَافِرِينَ", surahName: "البَقَرَة", juzNumber: 1, pageNumber: 4 }
    // سنكتفي بالآيات العشرين الأولى كمثال، والتطبيق الكامل سيحتوي على كافة الآيات
  ]
};

// تعريف سورة آل عمران
export const surahImran = {
  id: 3,
  name: "آل عِمرَان",
  englishName: "Āl-'Imrān",
  revelationType: "medinan",
  versesCount: 200,
  verses: [
    { id: 1, number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 2, number: 2, numberInSurah: 2, text: "الم", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 3, number: 3, numberInSurah: 3, text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 4, number: 4, numberInSurah: 4, text: "نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 5, number: 5, numberInSurah: 5, text: "مِن قَبْلُ هُدًى لِّلنَّاسِ وَأَنزَلَ الْفُرْقَانَ ۗ إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ ۗ وَاللَّهُ عَزِيزٌ ذُو انتِقَامٍ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 6, number: 6, numberInSurah: 6, text: "إِنَّ اللَّهَ لَا يَخْفَىٰ عَلَيْهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 7, number: 7, numberInSurah: 7, text: "هُوَ الَّذِي يُصَوِّرُكُمْ فِي الْأَرْحَامِ كَيْفَ يَشَاءُ ۚ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 8, number: 8, numberInSurah: 8, text: "هُوَ الَّذِي أَنزَلَ عَلَيْكَ الْكِتَابَ مِنْهُ آيَاتٌ مُّحْكَمَاتٌ هُنَّ أُمُّ الْكِتَابِ وَأُخَرُ مُتَشَابِهَاتٌ ۖ فَأَمَّا الَّذِينَ فِي قُلُوبِهِمْ زَيْغٌ فَيَتَّبِعُونَ مَا تَشَابَهَ مِنْهُ ابْتِغَاءَ الْفِتْنَةِ وَابْتِغَاءَ تَأْوِيلِهِ ۗ وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللَّهُ ۗ وَالرَّاسِخُونَ فِي الْعِلْمِ يَقُولُونَ آمَنَّا بِهِ كُلٌّ مِّنْ عِندِ رَبِّنَا ۗ وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 9, number: 9, numberInSurah: 9, text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 50 },
    { id: 10, number: 10, numberInSurah: 10, text: "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 51 },
    { id: 11, number: 11, numberInSurah: 11, text: "إِنَّ الَّذِينَ كَفَرُوا لَن تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ وَلَا أَوْلَادُهُم مِّنَ اللَّهِ شَيْئًا ۖ وَأُولَٰئِكَ هُمْ وَقُودُ النَّارِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 51 },
    { id: 12, number: 12, numberInSurah: 12, text: "كَدَأْبِ آلِ فِرْعَوْنَ وَالَّذِينَ مِن قَبْلِهِمْ ۚ كَذَّبُوا بِآيَاتِنَا فَأَخَذَهُمُ اللَّهُ بِذُنُوبِهِمْ ۗ وَاللَّهُ شَدِيدُ الْعِقَابِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 51 },
    { id: 13, number: 13, numberInSurah: 13, text: "قُل لِّلَّذِينَ كَفَرُوا سَتُغْلَبُونَ وَتُحْشَرُونَ إِلَىٰ جَهَنَّمَ ۚ وَبِئْسَ الْمِهَادُ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 51 },
    { id: 14, number: 14, numberInSurah: 14, text: "قَدْ كَانَ لَكُمْ آيَةٌ فِي فِئَتَيْنِ الْتَقَتَا ۖ فِئَةٌ تُقَاتِلُ فِي سَبِيلِ اللَّهِ وَأُخْرَىٰ كَافِرَةٌ يَرَوْنَهُم مِّثْلَيْهِمْ رَأْيَ الْعَيْنِ ۚ وَاللَّهُ يُؤَيِّدُ بِنَصْرِهِ مَن يَشَاءُ ۗ إِنَّ فِي ذَٰلِكَ لَعِبْرَةً لِّأُولِي الْأَبْصَارِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 51 },
    { id: 15, number: 15, numberInSurah: 15, text: "زُيِّنَ لِلنَّاسِ حُبُّ الشَّهَوَاتِ مِنَ النِّسَاءِ وَالْبَنِينَ وَالْقَنَاطِيرِ الْمُقَنطَرَةِ مِنَ الذَّهَبِ وَالْفِضَّةِ وَالْخَيْلِ الْمُسَوَّمَةِ وَالْأَنْعَامِ وَالْحَرْثِ ۗ ذَٰلِكَ مَتَاعُ الْحَيَاةِ الدُّنْيَا ۖ وَاللَّهُ عِندَهُ حُسْنُ الْمَآبِ", surahName: "آل عِمرَان", juzNumber: 3, pageNumber: 51 }
    // سنكتفي بالآيات الخمسة عشر الأولى كمثال، والتطبيق الكامل سيحتوي على كافة الآيات
  ]
};

// محتوى سورة الإخلاص
export const surahIkhlas = {
  id: 112,
  name: "الإخْلاص",
  englishName: "Al-Ikhlāṣ",
  revelationType: "meccan",
  versesCount: 4,
  verses: [
    { id: 1, number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", surahName: "الإخْلاص", juzNumber: 30, pageNumber: 604 },
    { id: 2, number: 2, numberInSurah: 2, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", surahName: "الإخْلاص", juzNumber: 30, pageNumber: 604 },
    { id: 3, number: 3, numberInSurah: 3, text: "اللَّهُ الصَّمَدُ", surahName: "الإخْلاص", juzNumber: 30, pageNumber: 604 },
    { id: 4, number: 4, numberInSurah: 4, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", surahName: "الإخْلاص", juzNumber: 30, pageNumber: 604 },
    { id: 5, number: 5, numberInSurah: 5, text: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", surahName: "الإخْلاص", juzNumber: 30, pageNumber: 604 }
  ]
};

// محتوى سورة الفلق
export const surahFalaq = {
  id: 113,
  name: "الفَلَق",
  englishName: "Al-Falaq",
  revelationType: "meccan",
  versesCount: 5,
  verses: [
    { id: 1, number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", surahName: "الفَلَق", juzNumber: 30, pageNumber: 604 },
    { id: 2, number: 2, numberInSurah: 2, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", surahName: "الفَلَق", juzNumber: 30, pageNumber: 604 },
    { id: 3, number: 3, numberInSurah: 3, text: "مِن شَرِّ مَا خَلَقَ", surahName: "الفَلَق", juzNumber: 30, pageNumber: 604 },
    { id: 4, number: 4, numberInSurah: 4, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", surahName: "الفَلَق", juzNumber: 30, pageNumber: 604 },
    { id: 5, number: 5, numberInSurah: 5, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", surahName: "الفَلَق", juzNumber: 30, pageNumber: 604 },
    { id: 6, number: 6, numberInSurah: 6, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", surahName: "الفَلَق", juzNumber: 30, pageNumber: 604 }
  ]
};

// محتوى سورة الناس
export const surahNas = {
  id: 114,
  name: "النَّاس",
  englishName: "An-Nās",
  revelationType: "meccan",
  versesCount: 6,
  verses: [
    { id: 1, number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 },
    { id: 2, number: 2, numberInSurah: 2, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 },
    { id: 3, number: 3, numberInSurah: 3, text: "مَلِكِ النَّاسِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 },
    { id: 4, number: 4, numberInSurah: 4, text: "إِلَٰهِ النَّاسِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 },
    { id: 5, number: 5, numberInSurah: 5, text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 },
    { id: 6, number: 6, numberInSurah: 6, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 },
    { id: 7, number: 7, numberInSurah: 7, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", surahName: "النَّاس", juzNumber: 30, pageNumber: 604 }
  ]
};

// وظيفة للحصول على آيات السورة بناءً على رقمها
export function getSurahVerses(surahId: number) {
  // تحقق من السور المتوفرة مباشرة
  if (surahId === 1) {
    return surahFatiha.verses;
  } else if (surahId === 2) {
    return surahBaqarah.verses;
  } else if (surahId === 3) {
    return surahImran.verses;
  } else if (surahId === 112) {
    return surahIkhlas.verses;
  } else if (surahId === 113) {
    return surahFalaq.verses;
  } else if (surahId === 114) {
    return surahNas.verses;
  }
  
  // إذا لم تكن السورة متوفرة، استخدم البيانات العامة
  const surah = surahs.find(s => s.id === surahId);
  if (!surah) return [];
  
  const verses = [];
  const versesCount = surah.versesCount || 10; // عدد آيات السورة
  
  // إضافة البسملة كآية أولى لجميع السور ما عدا سورة التوبة (رقم 9)
  if (surahId !== 9) {
    verses.push({
      id: 1,
      number: 1,
      numberInSurah: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      surahName: surah.name,
      juzNumber: 1,
      pageNumber: 1,
    });
  }
  
  // إضافة باقي الآيات
  for (let i = (surahId !== 9 ? 2 : 1); i <= versesCount; i++) {
    verses.push({
      id: i,
      number: i,
      numberInSurah: i,
      text: `الآية رقم ${i} من سورة ${surah.name}`,
      surahName: surah.name,
      juzNumber: 1,
      pageNumber: 1,
    });
  }
  
  return verses;
}