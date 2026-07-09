export interface LevelInfo {
  level: string;
  title: string;
  description: string;
  skills: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface CourseData {
  name: string;
  slug: string;
  flag: string;
  levels: string;
  duration: string;
  heroSummary: string;
  whyLearn: string[];
  whoShouldLearn: string[];
  levelDetails: LevelInfo[];
  teachingMethod: string[];
  exams: { name: string; description: string }[];
  careers: { title: string; description: string }[];
  faq: CourseFAQ[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

const german: CourseData = {
  name: "German",
  slug: "german",
  flag: "🇩🇪",
  levels: "A1–C2",
  duration: "3 months per level",
  heroSummary: "Germany's economic strength makes German one of the most valuable languages for engineers, healthcare professionals, and students. Learn from certified native trainers in Chennai.",
  metaTitle: "German Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn German in Chennai with certified native trainers. Goethe-Institut exam preparation. A1-C2 levels. German classes for study abroad, work visas & career growth.",
  metaKeywords: ["German course Chennai", "Learn German", "German classes Chennai", "Goethe Institut", "German language training"],
  whyLearn: [
    "Germany is the largest economy in Europe and the fourth-largest in the world, creating constant demand for German speakers.",
    "Over 100,000 Indian students and professionals migrate to Germany each year for higher education and employment.",
    "German is the second most commonly used scientific language, essential for research and academia.",
    "Goethe-Institut certificates are globally recognised by employers and universities across Europe.",
    "German companies like Siemens, Bosch, BMW, Volkswagen, SAP, and Mercedes-Benz have major operations in India and actively recruit German-speaking professionals.",
    "Germany offers free or low-cost tuition at public universities for international students, making it a top study-abroad destination.",
  ],
  whoShouldLearn: [
    "Engineers and IT professionals looking to work with German companies in India or Europe.",
    "Nurses and healthcare workers seeking employment opportunities in German hospitals and elderly care facilities.",
    "Students planning to pursue higher education at German universities.",
    "Professionals in automotive, manufacturing, logistics, or renewable energy sectors.",
    "Anyone interested in German culture, literature, philosophy, or music.",
    "Entrepreneurs and business owners who work with German clients or suppliers.",
  ],
  levelDetails: [
    { level: "A1", title: "Beginner", description: "Understand and use everyday expressions and basic phrases. Introduce yourself and ask simple questions.", skills: ["Basic greetings and introductions", "Numbers, dates, and simple directions", "Ordering food and shopping", "Reading simple signs and forms"] },
    { level: "A2", title: "Elementary", description: "Communicate in routine tasks requiring simple information exchange on familiar topics.", skills: ["Describing your job, family, and hobbies", "Making appointments and reservations", "Writing short letters and emails", "Understanding frequently used expressions"] },
    { level: "B1", title: "Intermediate", description: "Deal with most situations while travelling. Produce simple connected text on familiar topics.", skills: ["Expressing opinions and plans", "Handling everyday conversations with fluency", "Writing simple reports and messages", "Understanding radio and TV programmes"] },
    { level: "B2", title: "Upper Intermediate", description: "Interact with native speakers with a degree of fluency. Understand the main ideas of complex texts.", skills: ["Participating in technical discussions", "Reading articles and contemporary literature", "Writing detailed essays and reports", "Arguing and defending your point of view"] },
    { level: "C1", title: "Advanced", description: "Express ideas fluently and spontaneously. Use language flexibly for social, academic, and professional purposes.", skills: ["Understanding implicit meaning in text", "Presenting complex topics clearly", "Writing academic papers and business reports", "Adapting language style to different contexts"] },
    { level: "C2", title: "Mastery", description: "Understand virtually everything heard or read. Summarise information from different sources coherently.", skills: ["Reading classical and modern literature", "Debating abstract and specialised topics", "Writing at a near-native level", "Understanding all forms of spoken German"] },
  ],
  teachingMethod: [
    "Classes conducted by certified native-level German trainers with 5+ years of teaching experience.",
    "Communicative approach with emphasis on speaking from day one.",
    "Small batch sizes (8–12 students) for personalised attention.",
    "Blended learning: live classroom sessions + online practice materials.",
    "Regular mock tests aligned with Goethe-Institut exam patterns.",
    "Cultural immersion through German films, music, news, and role-play scenarios.",
    "Progress tracking with monthly assessments and personalised feedback.",
  ],
  exams: [
    { name: "Goethe-Zertifikat", description: "The most widely recognised German exam worldwide, conducted by Goethe-Institut. Required for university admission, work visas, and citizenship." },
    { name: "TestDaF", description: "Required for university admission in Germany. Accepted by all German universities." },
    { name: "ÖSD", description: "Austrian German diploma recognised in all over the world." },
    { name: "Telc", description: "European language certificate accepted by employers and institutions across Europe." },
  ],
  careers: [
    { title: "IT & Engineering", description: "Work with German tech giants like SAP, Siemens, Bosch, and Volkswagen in India or Germany. Average salary premium for German speakers." },
    { title: "Healthcare & Nursing", description: "Germany faces a severe shortage of nurses and healthcare workers. Certified German speakers can earn ₹30–50 LPA in German hospitals." },
    { title: "Automotive & Manufacturing", description: "German automotive companies prefer bilingual engineers for roles in design, quality, and project management." },
    { title: "Academia & Research", description: "German universities offer fully-funded PhD positions. German language skills unlock research opportunities in engineering, physics, and philosophy." },
    { title: "Translation & Interpretation", description: "Freelance or in-house translators earn ₹5–15 LPA. Specialised technical translators command higher rates." },
  ],
  faq: [
    { question: "How long does it take to learn German?", answer: "Each level (A1–C2) takes approximately 3 months with regular classes. You can reach conversational fluency (B1) in 9–12 months." },
    { question: "Is the Goethe certificate valid in India?", answer: "Yes, the Goethe-Zertifikat is globally recognised, including by Indian employers, universities, and immigration authorities." },
    { question: "Can I learn German online?", answer: "Yes, we offer live online classes with the same curriculum, trainers, and certification as our offline batches." },
    { question: "Do you offer weekend batches?", answer: "Yes, we have weekend batches for working professionals and students. Both Saturday and Sunday options are available." },
    { question: "What are the course fees?", answer: "Please contact us for the latest fee structure. We offer flexible payment plans and early-bird discounts." },
    { question: "Will I get a certificate after completing the course?", answer: "Yes, you receive a certificate from Foreign Language Academy upon completion. You can also appear for Goethe-Institut exams for official certification." },
    { question: "Do you offer placement assistance?", answer: "Yes, we provide guidance on job opportunities, interview preparation, and connect students with companies hiring German speakers." },
    { question: "Is there a demo class available?", answer: "Yes, you can attend a free demo class before enrolling. Contact us to schedule yours." },
    { question: "What is the age limit for learning German?", answer: "There is no age limit. We have students from 12 to 60+ years learning German." },
    { question: "Can I study in Germany after learning German?", answer: "Absolutely. German universities require B2–C1 level German for most courses. We prepare you for the language requirements." },
  ],
};

const french: CourseData = {
  name: "French",
  slug: "french",
  flag: "🇫🇷",
  levels: "A1–C2",
  duration: "3 months per level",
  heroSummary: "Spoken on five continents, French is the language of diplomacy, fashion, and fine dining. Open doors to France, Canada, Switzerland, and Belgium.",
  metaTitle: "French Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn French in Chennai with native trainers. DELF/DALF exam preparation. A1-C2 levels. French classes for Canadian immigration, study abroad & careers.",
  metaKeywords: ["French course Chennai", "Learn French", "French classes Chennai", "DELF preparation", "French language training"],
  whyLearn: [
    "French is spoken by over 300 million people across 5 continents, making it a truly global language.",
    "France is the world's fifth-largest economy and a major hub for business, fashion, and technology.",
    "Canada's official bilingual status means French speakers have significant advantages for immigration and employment.",
    "Switzerland, Belgium, and Luxembourg are wealthy European economies where French is an official language.",
    "French is the language of international organisations including the UN, UNESCO, NATO, and the International Olympic Committee.",
    "India has strong economic and cultural ties with France, with major French companies like Air Liquide, L'Oréal, and Sanofi operating in India.",
  ],
  whoShouldLearn: [
    "Students planning to study in France, Canada, Switzerland, or Belgium.",
    "Professionals in hospitality, fashion, luxury goods, and international relations.",
    "Anyone applying for Canadian immigration (Express Entry gives bonus points for French).",
    "Diplomats, translators, and international relations professionals.",
    "Chefs, sommeliers, and hospitality workers seeking international careers.",
    "Individuals interested in French cinema, literature, philosophy, and art.",
  ],
  levelDetails: [
    { level: "A1", title: "Beginner", description: "Understand and use familiar everyday expressions and very basic phrases.", skills: ["Greetings and introductions", "Numbers, time, and dates", "Ordering food and shopping", "Describing yourself and others"] },
    { level: "A2", title: "Elementary", description: "Communicate in simple and routine tasks on familiar topics.", skills: ["Talking about daily routines", "Making requests and offers", "Describing your home and city", "Writing short notes and messages"] },
    { level: "B1", title: "Intermediate", description: "Deal with most situations while travelling in French-speaking regions.", skills: ["Expressing opinions and feelings", "Handling phone conversations", "Reading news articles", "Writing connected text on familiar topics"] },
    { level: "B2", title: "Upper Intermediate", description: "Interact with native speakers with fluency and spontaneity.", skills: ["Participating in debates", "Understanding films and TV", "Writing detailed arguments", "Reading contemporary literature"] },
    { level: "C1", title: "Advanced", description: "Use French effectively for social, academic, and professional purposes.", skills: ["Presenting complex topics", "Writing academic essays", "Understanding implicit meaning", "Adapting register to context"] },
    { level: "C2", title: "Mastery", description: "Understand virtually everything heard or read with ease.", skills: ["Reading specialised texts", "Expressing yourself spontaneously", "Debating abstract concepts", "Near-native fluency"] },
  ],
  teachingMethod: [
    "Native-level French trainers with C1–C2 certification and teaching experience.",
    "Action-oriented approach focusing on real-life communication scenarios.",
    "Small groups with individual attention and regular speaking practice.",
    "DELF/DALF exam preparation with mock tests and personalised feedback.",
    "Cultural activities including French film screenings, cuisine workshops, and music sessions.",
    "Online practice platform with vocabulary drills and listening exercises.",
  ],
  exams: [
    { name: "DELF A1–B2", description: "Diplôme d'Études en Langue Française — the official French proficiency exam for beginners to upper-intermediate." },
    { name: "DALF C1–C2", description: "Diplôme Approfondi de Langue Française — advanced certification required for French university admission." },
    { name: "TCF", description: "Test de Connaissance du Français — used for Canadian immigration and French citizenship applications." },
    { name: "TEF", description: "Test d'Évaluation de Français — accepted for Canadian immigration (Express Entry and Quebec)." },
  ],
  careers: [
    { title: "International Relations", description: "French is the working language of the UN, UNESCO, NATO, and the International Red Cross. Careers in diplomacy and NGOs." },
    { title: "Hospitality & Tourism", description: "France is the world's most visited country. Multilingual hospitality professionals are in high demand." },
    { title: "Luxury & Fashion", description: "LVMH, Kering, Chanel, and L'Oréal are French companies that prefer French-speaking professionals." },
    { title: "Translation & Localisation", description: "French is the third most demanded language for translation services worldwide." },
    { title: "Education", description: "Teach French in Indian schools, colleges, and language institutes. Demand for qualified French teachers is growing." },
  ],
  faq: [
    { question: "How long does it take to learn French?", answer: "Each level takes 3 months. You can reach B1 (conversational fluency) in 9–12 months of regular classes." },
    { question: "What is DELF and DALF?", answer: "DELF (A1–B2) and DALF (C1–C2) are official French proficiency diplomas awarded by France's Ministry of Education. They are valid for life." },
    { question: "Can I immigrate to Canada with French?", answer: "Yes. Canada's Express Entry system awards up to 50 additional points for French proficiency. The TEF and TCF exams are accepted." },
    { question: "Do you offer online classes?", answer: "Yes, we offer live online classes with the same curriculum and certification as our offline batches." },
    { question: "Is French difficult to learn?", answer: "French is classified as a Category I language for English speakers by the FSI, meaning it is relatively easy to learn. The alphabet and grammar are familiar." },
    { question: "What are the career prospects after learning French?", answer: "French speakers are in demand in hospitality, fashion, international relations, teaching, translation, and tourism." },
    { question: "Can I study in France after learning French?", answer: "Yes. French universities require B2–C1 level French. We prepare you for the DELF/DALF exams needed for admission." },
    { question: "Do you provide study materials?", answer: "Yes, all study materials are included in the course fee. We use DELF-aligned textbooks, audio resources, and online practice tools." },
    { question: "What is the batch size?", answer: "Our batches have 8–12 students to ensure personalised attention and regular speaking practice." },
    { question: "Is there an age limit?", answer: "No age limit. We teach students from school age to senior citizens." },
  ],
};

// I'll create the remaining 7 languages with similarly detailed content
const japanese: CourseData = {
  name: "Japanese",
  slug: "japanese",
  flag: "🇯🇵",
  levels: "N5–N1",
  duration: "4 months per level",
  heroSummary: "Japan's technology, pop culture, and economy make Japanese a high-value language. Learn from trainers who have studied and worked in Japan.",
  metaTitle: "Japanese Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn Japanese in Chennai with native trainers. JLPT N5-N1 preparation. Japanese classes for study in Japan, IT careers & anime enthusiasts.",
  metaKeywords: ["Japanese course Chennai", "Learn Japanese", "Japanese classes Chennai", "JLPT preparation", "Japanese language training"],
  whyLearn: [
    "Japan is the third-largest economy in the world, with strong trade and investment ties to India.",
    "Japanese companies like Toyota, Honda, Sony, Hitachi, and Toshiba have major operations in India and actively recruit Japanese-speaking professionals.",
    "The JLPT certificate is required for higher education in Japan and preferred by Japanese employers worldwide.",
    "Japan offers generous scholarships for international students through MEXT and JASSO programmes.",
    "Anime, manga, and Japanese pop culture have created unprecedented interest in the language among younger generations.",
    "Japanese IT professionals are in high demand globally, with bilingual engineers commanding premium salaries.",
  ],
  whoShouldLearn: [
    "Engineers and IT professionals working with Japanese clients or companies.",
    "Students interested in studying at Japanese universities on scholarship.",
    "Anime, manga, and Japanese pop culture enthusiasts.",
    "Professionals in manufacturing, automotive, and electronics industries.",
    "Individuals seeking careers in translation, interpretation, or tourism.",
    "Anyone preparing for JLPT exams for career or personal growth.",
  ],
  levelDetails: [
    { level: "N5", title: "Basic", description: "Understand basic Japanese in everyday situations. Read hiragana, katakana, and basic kanji.", skills: ["Hiragana and katakana reading", "Basic greetings and self-introduction", "Simple sentence structures", "Understanding slow, clear speech"] },
    { level: "N4", title: "Elementary", description: "Understand basic Japanese used in daily life and read short passages on familiar topics.", skills: ["Basic kanji (approx. 300 characters)", "Describing experiences and plans", "Reading short articles and emails", "Understanding everyday conversations"] },
    { level: "N3", title: "Intermediate", description: "Understand Japanese used in everyday situations with some complexity.", skills: ["Intermediate kanji (approx. 650 characters)", "Expressing opinions and explaining reasons", "Reading news summaries", "Understanding natural conversations"] },
    { level: "N2", title: "Upper Intermediate", description: "Understand Japanese used in a variety of contexts, including professional settings.", skills: ["Advanced kanji (approx. 1000 characters)", "Professional communication skills", "Reading newspapers and magazines", "Understanding TV programmes and films"] },
    { level: "N1", title: "Advanced", description: "Understand sophisticated Japanese across diverse contexts, including academic and professional.", skills: ["Fluent reading and comprehension", "Sophisticated writing", "Understanding nuanced speech", "Professional proficiency"] },
  ],
  teachingMethod: [
    "Certified native Japanese trainers with JLPT N1–N2 qualification and teaching experience in India and Japan.",
    "Systematic kanji learning with mnemonics and spaced repetition.",
    "Speaking-focused approach with role-play and conversation practice.",
    "JLPT exam preparation with mock tests and detailed performance analysis.",
    "Japanese culture immersion through films, music, and calligraphy workshops.",
    "Small batch sizes for personalised kanji and pronunciation guidance.",
  ],
  exams: [
    { name: "JLPT N5–N1", description: "Japanese Language Proficiency Test — the most recognised Japanese exam worldwide, conducted twice a year in India." },
    { name: "J-Test", description: "Practical Japanese proficiency test accepted by Japanese companies for recruitment." },
    { name: "BJT", description: "Business Japanese Proficiency Test for professionals working with Japanese companies." },
  ],
  careers: [
    { title: "IT & Engineering", description: "Japanese IT companies like NEC, Fujitsu, and NTT Data prefer bilingual engineers. Salary premium of 40–60% for Japanese speakers." },
    { title: "Manufacturing & Automotive", description: "Toyota, Honda, Suzuki, and Yamaha have major Indian operations requiring Japanese-speaking professionals." },
    { title: "Translation & Interpretation", description: "High demand for English-Japanese translators in IT, legal, and business sectors." },
    { title: "Education & Academia", description: "Teach Japanese in Indian schools and language institutes. MEXT scholarships for study in Japan." },
    { title: "Travel & Tourism", description: "Guide Japanese tourists visiting India or work in Japan's booming tourism industry." },
  ],
  faq: [
    { question: "How long does it take to learn Japanese?", answer: "Each JLPT level takes 4 months. N4 (basic conversation) takes about 4–6 months, N2 (professional level) takes about 2 years." },
    { question: "Is Japanese difficult to learn?", answer: "Japanese has three writing systems (hiragana, katakana, kanji) which require dedicated practice, but grammar is logical and pronunciation is straightforward." },
    { question: "What is the JLPT?", answer: "The Japanese Language Proficiency Test (JLPT) is the standard certification for Japanese proficiency, offered at 5 levels (N5 being easiest, N1 most advanced)." },
    { question: "Can I study in Japan after learning Japanese?", answer: "Yes. Japanese universities require N2–N1 level. MEXT scholarships cover tuition and living expenses." },
    { question: "Do you offer weekend batches?", answer: "Yes, we offer weekend batches for students and working professionals." },
    { question: "Is kanji taught from the beginning?", answer: "Yes, kanji is introduced from N5 level gradually, with systematic learning methods including mnemonics and stroke order practice." },
    { question: "What career opportunities exist?", answer: "IT, automotive, translation, education, and tourism sectors actively hire Japanese speakers with competitive salaries." },
    { question: "Can I learn Japanese online?", answer: "Yes, live online classes with the same curriculum and native trainers are available." },
  ],
};

const spanish: CourseData = {
  name: "Spanish",
  slug: "spanish",
  flag: "🇪🇸",
  levels: "A1–C2",
  duration: "3 months per level",
  heroSummary: "Spanish connects you to 21 countries and 580 million speakers. It is the second most spoken native language in the world.",
  metaTitle: "Spanish Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn Spanish in Chennai with native trainers. DELE/SIELE exam preparation. A1-C2 levels. Spanish classes for travel, business & study abroad.",
  metaKeywords: ["Spanish course Chennai", "Learn Spanish", "Spanish classes Chennai", "DELE preparation", "Spanish language training"],
  whyLearn: [
    "Spanish is the official language of 21 countries and spoken by over 580 million people worldwide.",
    "The US has over 40 million Spanish speakers, making it increasingly valuable for business and healthcare.",
    "Spanish is the second most studied language in the world after English.",
    "Latin America is a rapidly growing economic region with strong trade ties to India and Europe.",
    "Spain and Latin America are popular destinations for higher education and tourism.",
    "Spanish literature, films, and music have global influence and cultural richness.",
  ],
  whoShouldLearn: [
    "Students planning to study in Spain, Mexico, or Latin American universities.",
    "Healthcare and social workers serving Spanish-speaking communities in the US.",
    "Professionals in international trade, logistics, and import-export businesses.",
    "Travel enthusiasts planning to explore Spain and Latin America.",
    "Individuals interested in Spanish and Latin American culture, literature, and music.",
    "Anyone seeking a relatively easy-to-learn second language.",
  ],
  levelDetails: [
    { level: "A1", title: "Beginner", description: "Understand and use basic phrases for everyday situations.", skills: ["Greetings and introductions", "Numbers and alphabet", "Ordering in restaurants", "Describing yourself"] },
    { level: "A2", title: "Elementary", description: "Communicate in routine situations requiring simple information exchange.", skills: ["Shopping and transactions", "Describing your routine", "Making requests and offers", "Writing short messages"] },
    { level: "B1", title: "Intermediate", description: "Deal with most situations while travelling in Spanish-speaking countries.", skills: ["Expressing opinions", "Describing experiences and plans", "Handling phone conversations", "Understanding news and articles"] },
    { level: "B2", title: "Upper Intermediate", description: "Interact with native speakers with fluency and spontaneity.", skills: ["Debating and discussing", "Understanding films and TV", "Writing detailed reports", "Reading contemporary literature"] },
    { level: "C1", title: "Advanced", description: "Use Spanish effectively for social, academic, and professional purposes.", skills: ["Presenting complex topics", "Writing academic essays", "Understanding implicit meaning", "Adapting to different registers"] },
    { level: "C2", title: "Mastery", description: "Understand virtually everything heard or read with ease.", skills: ["Near-native fluency", "Reading specialised texts", "Debating abstract concepts", "Mastering idiomatic expressions"] },
  ],
  teachingMethod: [
    "Native-level Spanish trainers with DELE certification and extensive teaching experience.",
    "Communicative approach focusing on spoken Spanish from day one.",
    "DELE and SIELE exam preparation with mock tests.",
    "Cultural exposure through Latin American films, music, and literature.",
    "Small batch sizes for personalised pronunciation and grammar guidance.",
  ],
  exams: [
    { name: "DELE A1–C2", description: "Diplomas de Español como Lengua Extranjera — official Spanish proficiency diplomas issued by Instituto Cervantes." },
    { name: "SIELE", description: "Servicio Internacional de Evaluación de la Lengua Española — computer-based exam recognised by universities and employers." },
  ],
  careers: [
    { title: "International Business", description: "Latin America is a growing market for Indian exports. Spanish speakers are in demand in trade and logistics." },
    { title: "Healthcare", description: "The US healthcare sector needs Spanish-speaking professionals to serve Hispanic communities." },
    { title: "Translation & Interpretation", description: "Spanish is among the top three languages demanded for translation services." },
    { title: "Education", description: "Teach Spanish in schools and institutes across India. Demand for Spanish teachers is rising." },
    { title: "Tourism & Hospitality", description: "Spanish tourists are among the top global spenders. Bilingual professionals are preferred in premium hospitality." },
  ],
  faq: [
    { question: "How long does it take to learn Spanish?", answer: "Each level takes 3 months. B1 (conversational fluency) can be achieved in 9 months with regular classes." },
    { question: "Is Spanish easy to learn?", answer: "Spanish is one of the easiest languages for English speakers. It uses the Latin alphabet and has consistent pronunciation rules." },
    { question: "What is DELE?", answer: "DELE is the official Spanish proficiency diploma issued by Instituto Cervantes on behalf of Spain's Ministry of Education." },
    { question: "Can I study in Spain after learning Spanish?", answer: "Yes. Spanish universities require B2 level. DELE B2 is accepted for university admission across Spain and Latin America." },
    { question: "Do you offer online classes?", answer: "Yes, live online classes with native trainers and the same curriculum as offline batches." },
    { question: "What career opportunities exist?", answer: "International trade, healthcare, education, translation, and tourism sectors actively hire Spanish speakers." },
  ],
};

const chinese: CourseData = {
  name: "Chinese",
  slug: "chinese",
  flag: "🇨🇳",
  levels: "HSK 1–6",
  duration: "4 months per level",
  heroSummary: "China is India's largest trading partner. Mandarin opens doors in business, diplomacy, and global supply chains.",
  metaTitle: "Chinese Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn Chinese (Mandarin) in Chennai with native trainers. HSK 1-6 preparation. Chinese classes for business, trade & study in China.",
  metaKeywords: ["Chinese course Chennai", "Learn Mandarin", "Chinese classes Chennai", "HSK preparation", "Chinese language training"],
  whyLearn: [
    "China is India's largest trading partner with bilateral trade exceeding $100 billion annually.",
    "Mandarin is the most spoken language in the world with over 1.1 billion native speakers.",
    "Chinese companies like Huawei, Xiaomi, Alibaba, and BYD have significant presence in India.",
    "The Chinese government offers scholarships for international students through the CSC programme.",
    "Mandarin proficiency is increasingly valued in global supply chain and logistics roles.",
    "Understanding Chinese language and culture provides a strategic advantage in diplomacy and international relations.",
  ],
  whoShouldLearn: [
    "Business professionals and entrepreneurs trading with Chinese companies.",
    "Supply chain and logistics professionals working with Chinese manufacturers.",
    "Students interested in studying at Chinese universities on CSC scholarships.",
    "Diplomats and international relations professionals.",
    "Professionals in import-export, manufacturing, and global trade.",
    "Anyone interested in Chinese culture, history, and calligraphy.",
  ],
  levelDetails: [
    { level: "HSK 1", title: "Beginner", description: "Understand and use basic Chinese phrases and sentences.", skills: ["Pinyin and tones", "Basic greetings", "Introducing yourself", "Numbers and time"] },
    { level: "HSK 2", title: "Elementary", description: "Communicate in simple everyday situations.", skills: ["Basic conversations", "Describing your routine", "Shopping and ordering", "Simple questions and answers"] },
    { level: "HSK 3", title: "Intermediate", description: "Handle most everyday communication needs.", skills: ["Intermediate vocabulary (600 words)", "Expressing opinions", "Reading simple articles", "Handling common scenarios"] },
    { level: "HSK 4", title: "Upper Intermediate", description: "Discuss a wide range of topics with fluency.", skills: ["Advanced vocabulary (1200 words)", "Professional communication", "Reading news and articles", "Understanding films and TV"] },
    { level: "HSK 5", title: "Advanced", description: "Read Chinese newspapers and express yourself fluently.", skills: ["Extensive vocabulary (2500 words)", "Academic and professional writing", "Reading contemporary literature", "Fluent conversation"] },
    { level: "HSK 6", title: "Mastery", description: "Understand and produce Chinese with ease on any topic.", skills: ["Near-native fluency", "Reading specialised texts", "Professional translation", "Mastering idiomatic expressions"] },
  ],
  teachingMethod: [
    "Native Mandarin-speaking trainers with HSK 6 certification and teaching experience.",
    "Systematic tone training with phonetic exercises and一对一 correction.",
    "Character writing practice from lesson one with stroke order guidance.",
    "HSK exam preparation with mock tests and vocabulary building.",
    "Focus on practical communication for business and travel.",
    "Chinese culture immersion including calligraphy, festivals, and cuisine.",
  ],
  exams: [
    { name: "HSK 1–6", description: "Hanyu Shuiping Kaoshi — the official Chinese proficiency test recognised by Chinese universities and employers worldwide." },
    { name: "HSKK", description: "Chinese speaking proficiency test that accompanies HSK for oral assessment." },
    { name: "BCT", description: "Business Chinese Test for professionals working with Chinese companies." },
  ],
  careers: [
    { title: "International Trade", description: "India-China bilateral trade creates demand for Mandarin-speaking professionals in import-export and logistics." },
    { title: "Supply Chain & Manufacturing", description: "Chinese manufacturers prefer Mandarin-speaking supply chain managers for smoother communication." },
    { title: "Translation & Interpretation", description: "Specialised Chinese translators are in high demand for business, legal, and technical documentation." },
    { title: "Diplomacy & International Relations", description: "Chinese language skills are valuable in diplomatic service and international organisations." },
    { title: "Education", description: "Growing interest in Chinese in India means more schools are hiring Mandarin teachers." },
  ],
  faq: [
    { question: "Is Chinese difficult to learn?", answer: "Chinese grammar is simpler than European languages, but tones and characters require dedicated practice. Systematic learning makes it achievable." },
    { question: "How long does it take to learn Chinese?", answer: "Each HSK level takes 4 months. HSK 3 (basic conversation) takes about 1 year with regular classes." },
    { question: "What is HSK?", answer: "HSK is the official Chinese proficiency test with 6 levels. HSK 4 is sufficient for Chinese university admission." },
    { question: "Can I study in China after learning Chinese?", answer: "Yes. Chinese universities offer CSC scholarships covering tuition and living expenses. HSK 4 is typically required." },
    { question: "Are tones really important?", answer: "Yes, tones distinguish word meanings in Chinese. We provide extensive tone practice from day one." },
    { question: "Can I learn Chinese online?", answer: "Yes, we offer live online classes with native trainers and interactive character practice tools." },
  ],
};

const english: CourseData = {
  name: "English",
  slug: "english",
  flag: "🇬🇧",
  levels: "A1–C2",
  duration: "2 months per level",
  heroSummary: "English is the global language of business, technology, and higher education. Master it for career success and international opportunities.",
  metaTitle: "English Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn English in Chennai with certified CELTA trainers. IELTS/TOEFL preparation. A1-C2 levels. Business English, spoken English & accent training.",
  metaKeywords: ["English course Chennai", "Learn English", "English classes Chennai", "IELTS preparation", "English language training"],
  whyLearn: [
    "English is the universal language of international business, aviation, science, and diplomacy.",
    "Proficiency in English directly correlates with higher salaries and better career opportunities in India.",
    "English is the primary language of the internet, with over 60% of all online content in English.",
    "Top global universities require IELTS or TOEFL scores for admission.",
    "Multinational companies in India consistently prefer candidates with strong English communication skills.",
    "English proficiency is a key factor for immigration to Canada, Australia, UK, and New Zealand.",
  ],
  whoShouldLearn: [
    "Students preparing for IELTS, TOEFL, or PTE for study abroad or immigration.",
    "Working professionals who want to improve their business communication skills.",
    "Job seekers preparing for interviews in multinational companies.",
    "Individuals planning to immigrate to English-speaking countries.",
    "Anyone who wants to speak English with confidence in social and professional settings.",
  ],
  levelDetails: [
    { level: "A1", title: "Beginner", description: "Understand and use basic English words and phrases.", skills: ["Alphabet and basic vocabulary", "Greetings and introductions", "Simple questions and answers", "Numbers and time"] },
    { level: "A2", title: "Elementary", description: "Communicate in simple everyday situations.", skills: ["Shopping and ordering", "Describing your home and family", "Talking about routines", "Writing short notes"] },
    { level: "B1", title: "Intermediate", description: "Handle most situations while travelling and in familiar work contexts.", skills: ["Expressing opinions", "Handling phone calls", "Reading articles and emails", "Writing connected text"] },
    { level: "B2", title: "Upper Intermediate", description: "Interact with native speakers with fluency.", skills: ["Participating in meetings", "Writing detailed reports", "Understanding films and news", "Arguing and persuading"] },
    { level: "C1", title: "Advanced", description: "Use English effectively for academic and professional purposes.", skills: ["Presenting complex ideas", "Writing academic essays", "Understanding implicit meaning", "Professional correspondence"] },
    { level: "C2", title: "Mastery", description: "Understand and produce English with near-native fluency.", skills: ["Reading specialised texts", "Debating abstract topics", "Mastering idiomatic expressions", "Teaching and mentoring"] },
  ],
  teachingMethod: [
    "Certified CELTA/TEFL trainers with experience teaching English as a foreign language.",
    "Communicative approach with emphasis on spoken fluency and accent neutralisation.",
    "IELTS/TOEFL exam preparation with practice tests and band score strategies.",
    "Business English modules for corporate professionals.",
    "Small groups with regular speaking practice and personalised feedback.",
    "Online practice platform with listening exercises and vocabulary building.",
  ],
  exams: [
    { name: "IELTS", description: "International English Language Testing System — required for university admission and immigration to UK, Australia, Canada, and New Zealand." },
    { name: "TOEFL", description: "Test of English as a Foreign Language — accepted by US and Canadian universities." },
    { name: "PTE", description: "Pearson Test of English — computer-based test accepted for study abroad and immigration." },
    { name: "OET", description: "Occupational English Test — for healthcare professionals seeking work in English-speaking countries." },
  ],
  careers: [
    { title: "Corporate Communication", description: "Strong English skills are essential for management roles in MNCs, consulting, and client-facing positions." },
    { title: "Content & Media", description: "Journalism, content writing, copywriting, and digital marketing require excellent English proficiency." },
    { title: "Customer Service", description: "International BPOs and KPOs require English-speaking professionals for global client support." },
    { title: "Education & Training", description: "Teach English or pursue higher education at English-medium universities worldwide." },
    { title: "Immigration", description: "Countries like Canada, Australia, and UK use language proficiency as a key immigration criterion." },
  ],
  faq: [
    { question: "How long does it take to learn English?", answer: "Each level takes 2 months. With regular practice, you can reach B1 (conversational fluency) in 6 months." },
    { question: "What is the IELTS exam?", answer: "IELTS tests English proficiency in listening, reading, writing, and speaking. Band scores from 1–9 determine eligibility for universities and immigration." },
    { question: "Do you offer business English courses?", answer: "Yes, we have specialised business English modules covering presentations, negotiations, emails, and meetings." },
    { question: "Can you help with accent reduction?", answer: "Yes, our trainers provide personalised accent neutralisation and pronunciation coaching." },
    { question: "Do you prepare for IELTS?", answer: "Yes, we have dedicated IELTS preparation batches with practice tests, strategies, and feedback." },
    { question: "What is the difference between IELTS and TOEFL?", answer: "IELTS is British English with a face-to-face speaking test. TOEFL is American English with a computer-based speaking section." },
  ],
};

const russian: CourseData = {
  name: "Russian",
  slug: "russian",
  flag: "🇷🇺",
  levels: "A1–C2",
  duration: "3 months per level",
  heroSummary: "Russia is a global power in energy, space, and defence. Russian speakers are in demand across engineering, medicine, and international business.",
  metaTitle: "Russian Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn Russian in Chennai with native trainers. TORFL preparation. A1-C2 levels. Russian classes for engineering, energy sector & study in Russia.",
  metaKeywords: ["Russian course Chennai", "Learn Russian", "Russian classes Chennai", "TORFL preparation", "Russian language training"],
  whyLearn: [
    "Russia is the largest country in the world and a major player in energy, defence, and space exploration.",
    "Russian is spoken by over 250 million people across 15 countries including Russia, Ukraine, Belarus, and Kazakhstan.",
    "Russia offers generous government scholarships for international students at top universities.",
    "Indian pharmaceutical and IT companies have strong business ties with Russia requiring Russian-speaking professionals.",
    "Russian is one of the six official languages of the United Nations.",
    "The Russian space programme and engineering sector offer unique career opportunities.",
  ],
  whoShouldLearn: [
    "Engineers and professionals in energy, defence, and space sectors.",
    "Students interested in Russian government scholarships for higher education.",
    "Professionals in international trade, especially with CIS countries.",
    "Diplomats and international relations professionals.",
    "Literature enthusiasts interested in Dostoevsky, Tolstoy, and Chekhov in original.",
    "Anyone seeking a less-commonly taught language with strong career prospects.",
  ],
  levelDetails: [
    { level: "A1", title: "Beginner", description: "Understand and use basic Russian phrases.", skills: ["Cyrillic alphabet", "Basic greetings", "Introducing yourself", "Numbers and time"] },
    { level: "A2", title: "Elementary", description: "Communicate in simple everyday situations.", skills: ["Shopping and ordering", "Describing your routine", "Simple conversations", "Reading signs and menus"] },
    { level: "B1", title: "Intermediate", description: "Handle most situations while travelling.", skills: ["Expressing opinions", "Handling phone calls", "Reading short articles", "Writing connected text"] },
    { level: "B2", title: "Upper Intermediate", description: "Interact with native speakers with fluency.", skills: ["Participating in discussions", "Understanding films and TV", "Writing detailed arguments", "Professional communication"] },
    { level: "C1", title: "Advanced", description: "Use Russian effectively for professional purposes.", skills: ["Presenting complex topics", "Writing academic essays", "Understanding implicit meaning", "Business Russian"] },
    { level: "C2", title: "Mastery", description: "Near-native fluency in all contexts.", skills: ["Reading specialised texts", "Debating abstract concepts", "Mastering idiomatic expressions", "Translation skills"] },
  ],
  teachingMethod: [
    "Native Russian-speaking trainers with teaching certification and experience.",
    "Cyrillic alphabet mastery from the first class.",
    "Communicative approach with focus on practical speaking skills.",
    "Preparation for TORFL (Test of Russian as a Foreign Language).",
    "Russian culture immersion through literature, films, and music.",
  ],
  exams: [
    { name: "TORFL A1–C2", description: "Test of Russian as a Foreign Language — the official Russian proficiency exam recognised by Russian universities and employers." },
  ],
  careers: [
    { title: "Energy & Oil", description: "Russian energy companies like Gazprom and Rosneft require Russian-speaking engineers and business professionals." },
    { title: "Defence & Aerospace", description: "India-Russia defence cooperation creates demand for Russian-speaking professionals in aerospace and engineering." },
    { title: "International Trade", description: "Trade between India and CIS countries requires Russian-speaking business professionals for negotiations and logistics." },
    { title: "Translation & Interpretation", description: "Technical and legal translators specialising in Russian are in high demand and command premium rates." },
    { title: "Education & Research", description: "Russian government scholarships (Vladimir Putin Scholarship) offer fully-funded education at top Russian universities." },
  ],
  faq: [
    { question: "Is Russian difficult to learn?", answer: "Russian has a different alphabet (Cyrillic) and complex grammar with cases, but with systematic learning it is achievable. The alphabet can be learned in a week." },
    { question: "How long does it take to learn Russian?", answer: "Each level takes 3 months. B1 (conversational fluency) takes about 9–12 months with regular classes." },
    { question: "What is TORFL?", answer: "TORFL is the official Russian proficiency test with 6 levels (A1–C2). Required for university admission and employment in Russia." },
    { question: "Can I study in Russia after learning Russian?", answer: "Yes. Russian universities offer scholarships covering tuition and living expenses. B1 level Russian is typically required." },
    { question: "Do you offer online classes?", answer: "Yes, live online classes with native Russian trainers are available." },
    { question: "What career opportunities exist?", answer: "Energy, defence, aerospace, international trade, and education sectors actively hire Russian speakers." },
  ],
};

const korean: CourseData = {
  name: "Korean",
  slug: "korean",
  flag: "🇰🇷",
  levels: "TOPIK 1–6",
  duration: "4 months per level",
  heroSummary: "Korea's global cultural influence and economic power make Korean one of the most exciting languages to learn. K-pop, K-dramas, and Korean technology drive demand.",
  metaTitle: "Korean Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn Korean in Chennai with native trainers. TOPIK 1-6 preparation. Korean classes for K-pop fans, IT careers & study in South Korea.",
  metaKeywords: ["Korean course Chennai", "Learn Korean", "Korean classes Chennai", "TOPIK preparation", "Korean language training"],
  whyLearn: [
    "South Korea is the 12th-largest economy in the world, home to global giants like Samsung, Hyundai, LG, and SK Group.",
    "Korean pop culture (K-pop, K-dramas, Korean cinema) has created unprecedented global interest in the language.",
    "Korean companies in India seek Korean-speaking professionals for management and technical roles.",
    "South Korea offers generous scholarships for international students through the Korean Government Scholarship Programme.",
    "Korea is a global leader in technology, semiconductors, and automobile manufacturing.",
    "Understanding Korean language opens career opportunities in entertainment, fashion, and beauty industries.",
  ],
  whoShouldLearn: [
    "K-pop and K-drama fans who want to understand content without subtitles.",
    "Engineers and IT professionals working with Korean companies.",
    "Students interested in Korean Government Scholarship for study in South Korea.",
    "Professionals in entertainment, fashion, beauty, and consumer electronics.",
    "Individuals interested in Korean culture, history, and cuisine.",
    "Anyone seeking a unique language skill with growing career prospects.",
  ],
  levelDetails: [
    { level: "TOPIK 1", title: "Beginner", description: "Understand basic Korean alphabet (Hangeul) and simple expressions.", skills: ["Hangeul reading and writing", "Basic greetings", "Self-introduction", "Numbers and time"] },
    { level: "TOPIK 2", title: "Elementary", description: "Communicate in everyday situations.", skills: ["Shopping and ordering", "Describing daily routine", "Simple conversations", "Reading signs and menus"] },
    { level: "TOPIK 3", title: "Intermediate", description: "Handle most everyday communication needs.", skills: ["Expressing opinions", "Handling social situations", "Reading articles", "Writing connected text"] },
    { level: "TOPIK 4", title: "Upper Intermediate", description: "Discuss a wide range of topics with fluency.", skills: ["Professional communication", "Understanding news and TV", "Writing detailed arguments", "Presenting ideas"] },
    { level: "TOPIK 5", title: "Advanced", description: "Use Korean effectively for professional and academic purposes.", skills: ["Academic writing", "Business communication", "Understanding films and dramas", "Reading newspapers"] },
    { level: "TOPIK 6", title: "Mastery", description: "Near-native fluency in all contexts.", skills: ["Research and academic work", "Professional translation", "Mastering idiomatic expressions", "Teaching Korean"] },
  ],
  teachingMethod: [
    "Native Korean-speaking trainers with TOPIK certification and teaching experience in India.",
    "Hangeul mastery from the first class — the Korean alphabet can be learned in a few hours.",
    "K-pop and K-drama based learning materials for engaging lessons.",
    "TOPIK exam preparation with mock tests and scoring strategies.",
    "Small groups with individual attention to pronunciation and intonation.",
    "Korean culture immersion through food, music, films, and festivals.",
  ],
  exams: [
    { name: "TOPIK 1–6", description: "Test of Proficiency in Korean — the official Korean proficiency test conducted by the Korean government. Required for university admission and employment." },
    { name: "KLAT", description: "Korean Language Ability Test for business and professional contexts." },
  ],
  careers: [
    { title: "Technology & Electronics", description: "Samsung, LG, Hyundai, and SK Group prefer Korean-speaking professionals for their Indian operations." },
    { title: "Entertainment & Media", description: "K-pop, K-dramas, and Korean cinema need Korean-speaking content creators, translators, and marketers." },
    { title: "International Trade", description: "India-Korea trade is growing rapidly. Korean speakers are in demand in import-export and logistics." },
    { title: "Translation & Interpretation", description: "Korean-English translators are in high demand for entertainment, business, and legal sectors." },
    { title: "Education", description: "Teach Korean in Indian schools and institutes. Demand for Korean teachers is rising with K-pop popularity." },
  ],
  faq: [
    { question: "Is Korean difficult to learn?", answer: "Korean has a logical and scientific alphabet (Hangeul) that can be learned in a few hours. Grammar is different from English but systematic." },
    { question: "How long does it take to learn Korean?", answer: "Each TOPIK level takes 4 months. TOPIK 3 (conversational fluency) takes about 1 year with regular classes." },
    { question: "What is TOPIK?", answer: "TOPIK is the official Korean proficiency test with 6 levels. TOPIK 3–4 is sufficient for Korean university admission." },
    { question: "Can I study in Korea after learning Korean?", answer: "Yes. Korean universities offer generous scholarships through the Korean Government Scholarship Programme (KGSP)." },
    { question: "Can I learn Korean through K-pop and K-dramas?", answer: "We incorporate K-pop, K-dramas, and Korean variety shows in our curriculum to make learning engaging and relevant." },
    { question: "What career opportunities exist?", answer: "Technology, entertainment, trade, translation, and education sectors actively hire Korean speakers." },
  ],
};

const italian: CourseData = {
  name: "Italian",
  slug: "italian",
  flag: "🇮🇹",
  levels: "A1–C2",
  duration: "3 months per level",
  heroSummary: "Italian is the language of art, music, design, and cuisine. Italy's economy and cultural influence make it a rewarding language to learn.",
  metaTitle: "Italian Language Course in Chennai | Foreign Language Academy",
  metaDescription: "Learn Italian in Chennai with native trainers. CELI/CILS preparation. A1-C2 levels. Italian classes for fashion, design, cuisine & study in Italy.",
  metaKeywords: ["Italian course Chennai", "Learn Italian", "Italian classes Chennai", "CELI preparation", "Italian language training"],
  whyLearn: [
    "Italy is the third-largest economy in the Eurozone and a global leader in fashion, design, and luxury goods.",
    "Italian is the language of classical music — most musical terms used globally are Italian.",
    "Italy has the most UNESCO World Heritage Sites in the world, making it a top travel destination.",
    "Italian companies like Ferrari, Lamborghini, Prada, Gucci, and Versace are global icons requiring Italian-speaking professionals.",
    "Italy offers scholarships for international students through Italian government programmes.",
    "Indian pharmaceutical and textile industries have strong trade relationships with Italy.",
  ],
  whoShouldLearn: [
    "Fashion, design, and luxury goods professionals.",
    "Art historians, architects, and museum professionals.",
    "Music students and opera enthusiasts.",
    "Professionals in food, wine, and hospitality industries.",
    "Students interested in studying at Italian universities.",
    "Anyone who loves Italian culture, travel, and lifestyle.",
  ],
  levelDetails: [
    { level: "A1", title: "Beginner", description: "Understand and use basic Italian phrases.", skills: ["Greetings and introductions", "Numbers and alphabet", "Ordering food and drinks", "Describing yourself"] },
    { level: "A2", title: "Elementary", description: "Communicate in simple everyday situations.", skills: ["Shopping and transactions", "Describing your routine", "Making requests", "Writing short messages"] },
    { level: "B1", title: "Intermediate", description: "Handle most situations while travelling in Italy.", skills: ["Expressing opinions", "Handling phone conversations", "Reading articles and stories", "Writing connected text"] },
    { level: "B2", title: "Upper Intermediate", description: "Interact with native speakers with fluency.", skills: ["Participating in debates", "Understanding films and TV", "Writing detailed arguments", "Professional communication"] },
    { level: "C1", title: "Advanced", description: "Use Italian effectively for professional purposes.", skills: ["Presenting complex topics", "Writing academic essays", "Understanding implicit meaning", "Business Italian"] },
    { level: "C2", title: "Mastery", description: "Near-native fluency in all contexts.", skills: ["Reading specialised texts", "Debating abstract concepts", "Mastering idiomatic expressions", "Translation skills"] },
  ],
  teachingMethod: [
    "Native Italian-speaking trainers with CELI/CILS certification and teaching experience.",
    "Communicative approach with focus on spoken fluency.",
    "Italian culture immersion through art, music, film, and cuisine.",
    "CELI and CILS exam preparation with mock tests.",
    "Small batch sizes for personalised pronunciation and grammar guidance.",
    "Regular conversation practice with native Italian speakers.",
  ],
  exams: [
    { name: "CELI A1–C2", description: "Certificato di Conoscenza della Lingua Italiana — official Italian proficiency exam issued by the University for Foreigners of Perugia." },
    { name: "CILS A1–C2", description: "Certificazione di Italiano come Lingua Straniera — official certification issued by the University for Foreigners of Siena." },
    { name: "PLIDA", description: "Italian proficiency certification issued by the Dante Alighieri Society." },
  ],
  careers: [
    { title: "Fashion & Luxury", description: "Prada, Gucci, Versace, Armani, and Ferrari prefer Italian-speaking professionals for global operations." },
    { title: "Design & Architecture", description: "Italy is a global leader in design. Italian speakers are preferred for roles in architecture and interior design." },
    { title: "Food & Wine", description: "Italian cuisine is loved worldwide. Italian speakers excel in fine dining, wine import, and culinary arts." },
    { title: "Art & Culture", description: "Museums, galleries, and cultural institutions value Italian speakers for art history and conservation." },
    { title: "International Trade", description: "India-Italy trade in pharmaceuticals, textiles, and machinery creates demand for Italian-speaking professionals." },
  ],
  faq: [
    { question: "Is Italian difficult to learn?", answer: "Italian is one of the easiest languages for English speakers. It has consistent pronunciation and familiar Latin-based vocabulary." },
    { question: "How long does it take to learn Italian?", answer: "Each level takes 3 months. B1 (conversational fluency) takes about 9 months with regular classes." },
    { question: "What is CELI?", answer: "CELI is the official Italian proficiency exam issued by the University for Foreigners of Perugia, recognised by Italian employers and universities." },
    { question: "Can I study in Italy after learning Italian?", answer: "Yes. Italian universities offer scholarships and B2 level Italian is typically required for university admission." },
    { question: "Do you offer online classes?", answer: "Yes, live online classes with native Italian trainers are available." },
    { question: "What career opportunities exist?", answer: "Fashion, design, luxury goods, food and wine, art and culture, and international trade actively hire Italian speakers." },
  ],
};

const softSkills: CourseData = {
  name: "Soft Skills Training",
  slug: "soft-skills",
  flag: "SS",
  levels: "Foundation to Advanced",
  duration: "8 weeks",
  heroSummary: "Build communication confidence, interview readiness, workplace etiquette, presentation skills, and leadership habits for study, work, and global careers.",
  metaTitle: "Soft Skills Training in Chennai | Foreign Language Academy",
  metaDescription: "Soft skills training for students and professionals. Improve communication, interviews, workplace etiquette, confidence, presentation and leadership skills.",
  metaKeywords: ["soft skills training", "communication skills", "interview training", "personality development", "workplace communication"],
  whyLearn: [
    "Strong communication helps students and professionals stand out in interviews, meetings, and client conversations.",
    "Soft skills improve confidence, clarity, teamwork, leadership, and professional presence.",
    "Employers increasingly value presentation skills, workplace etiquette, and emotional intelligence alongside technical ability.",
    "Better spoken communication supports study abroad, immigration interviews, campus placements, and corporate growth.",
    "Structured practice helps learners reduce hesitation and speak with purpose.",
  ],
  whoShouldLearn: [
    "Students preparing for campus placements, interviews, group discussions, or study abroad.",
    "Working professionals who want stronger workplace communication and presentation skills.",
    "Healthcare, hospitality, aviation, and customer-facing professionals.",
    "Entrepreneurs, team leads, and managers who need confident business communication.",
    "Anyone who wants to improve confidence, body language, and social communication.",
  ],
  levelDetails: [
    { level: "Foundation", title: "Confidence Builder", description: "Develop clear speech, self-introduction, active listening, and everyday communication confidence.", skills: ["Self introduction", "Body language", "Active listening", "Basic presentation"] },
    { level: "Professional", title: "Workplace Ready", description: "Learn email etiquette, meeting communication, interview handling, and team collaboration.", skills: ["Interview answers", "Email etiquette", "Meeting participation", "Workplace vocabulary"] },
    { level: "Advanced", title: "Leadership Communication", description: "Build persuasive speaking, conflict handling, client communication, and leadership presence.", skills: ["Public speaking", "Negotiation basics", "Client conversations", "Leadership presence"] },
  ],
  teachingMethod: [
    "Live role plays, mock interviews, and real workplace scenarios.",
    "Small group activities that improve confidence through practice.",
    "Personal feedback on pronunciation, body language, clarity, and structure.",
    "Presentation drills, group discussions, and practical assignments.",
    "Flexible batches for students, job seekers, and working professionals.",
  ],
  exams: [
    { name: "Interview Readiness Assessment", description: "Mock HR and technical interview practice with feedback." },
    { name: "Presentation Evaluation", description: "Structured presentation assessment covering clarity, confidence, and delivery." },
    { name: "Communication Progress Review", description: "Trainer-led review of speaking confidence, workplace etiquette, and fluency." },
  ],
  careers: [
    { title: "Campus Placements", description: "Improve interview performance, group discussion confidence, and professional first impressions." },
    { title: "Corporate Roles", description: "Communicate clearly in meetings, emails, presentations, and client conversations." },
    { title: "Customer-Facing Careers", description: "Build empathy, service communication, conflict handling, and confidence." },
    { title: "Leadership Growth", description: "Develop executive presence, persuasion, feedback skills, and team communication." },
  ],
  faq: [
    { question: "Who can join soft skills training?", answer: "Students, job seekers, working professionals, entrepreneurs, and anyone who wants to communicate more confidently can join." },
    { question: "Is this course only for English speakers?", answer: "No. The course focuses on confidence, communication habits, workplace etiquette, and presentation skills. English support can be included where needed." },
    { question: "Will there be interview practice?", answer: "Yes. Mock interviews, self-introductions, group discussions, and feedback sessions are part of the training." },
    { question: "Do I get a certificate?", answer: "Yes, you receive a Foreign Language Academy certificate after successful completion." },
  ],
};

export const courseDataMap: Record<string, CourseData> = {
  german,
  french,
  japanese,
  spanish,
  chinese,
  english,
  russian,
  korean,
  italian,
  "soft-skills": softSkills,
};

export const allSlugs = Object.keys(courseDataMap);
