export type SeoLandingPageContent = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  sections: Array<{
    title: string;
    body: string;
    points: string[];
  }>;
  keywords: string[];
};

export const seoLandingPages: SeoLandingPageContent[] = [
  {
    slug: "online-language-courses",
    eyebrow: "Live online classes",
    title: "Online Foreign Language Courses with Certificate",
    description:
      "Learn German, French, Japanese, Korean, Spanish, Mandarin, English, Russian, Italian, IELTS, and soft skills online with certified expert trainers from Foreign Language Academy Chennai.",
    primaryCta: "Book a free demo",
    secondaryCta: "Explore courses",
    keywords: [
      "Online Foreign Language Courses",
      "Online Language Classes with Certificate",
      "Online German Classes India",
      "Online French Classes India",
      "Online Japanese Classes",
      "Online Korean Classes",
      "Best Online Language Academy",
      "Live Online Language Classes",
      "Online Language Learning with Certificate",
      "Online Language Classes Worldwide",
    ],
    sections: [
      {
        title: "Live trainer-led learning",
        body:
          "Our online language classes are live sessions, not passive recorded lessons. Learners join structured batches with trainer correction, speaking practice, homework, and progress review.",
        points: [
          "Online German, French, Japanese, Korean, Spanish, Mandarin, English, Russian, and Italian classes",
          "Weekend and weekday batches for students and working professionals",
          "Beginner-friendly A1, N5, TOPIK 1, HSK 1, IELTS, and soft skills options",
        ],
      },
      {
        title: "Certification-focused curriculum",
        body:
          "Courses are planned around practical communication and exam readiness, including Goethe, DELF-DALF, JLPT, TOPIK, HSK, DELE, IELTS, and academy certificate pathways.",
        points: [
          "Mock tests, speaking drills, writing correction, and listening practice",
          "Course completion certificate from Foreign Language Academy",
          "Guidance for external language exams and study-abroad requirements",
        ],
      },
      {
        title: "Designed for India and overseas learners",
        body:
          "Learners from Chennai, Bangalore, Pune, Delhi, Australia, Canada, New Zealand, and other locations can join online batches from India-based expert trainers.",
        points: [
          "Flexible class timings for Indian and international learners",
          "Online language courses for career, immigration, higher studies, and confidence",
          "One-to-one guidance for choosing the right language and level",
        ],
      },
    ],
  },
  {
    slug: "study-abroad-language-courses",
    eyebrow: "Study abroad preparation",
    title: "Language Courses for Abroad Studies, Visa and Immigration",
    description:
      "Prepare for study in Germany, French for Canada, Japanese for Japan, Korean for South Korea, Mandarin for China, and English for IELTS with Foreign Language Academy.",
    primaryCta: "Plan your language path",
    secondaryCta: "View all courses",
    keywords: [
      "German Language for Germany",
      "French for Canada",
      "Language Training for Higher Studies",
      "Foreign Language for Immigration",
      "Language Course for Abroad Studies",
      "Study in Germany Language Course",
      "Language Classes for Visa",
      "Learn German for Masters",
      "Learn French for PR",
      "Language Training for International Students",
    ],
    sections: [
      {
        title: "Germany, Canada, Japan and beyond",
        body:
          "A strong language foundation can improve your confidence for university applications, visa interviews, immigration pathways, internships, and international work environments.",
        points: [
          "German for study in Germany, masters, nurses, engineers, and job opportunities",
          "French for Canada immigration, PR pathways, DELF, TEF, and TCF preparation",
          "Japanese, Korean, Mandarin, Spanish, Italian, Russian, and English for global careers",
        ],
      },
      {
        title: "Exam and interview readiness",
        body:
          "We help learners connect grammar, vocabulary, listening, speaking, reading, and writing to real outcomes such as interviews, university communication, exams, and workplace situations.",
        points: [
          "Goethe, TestDaF, DELF-DALF, JLPT, TOPIK, HSK, DELE, IELTS, and PTE-oriented guidance",
          "Speaking practice for interviews, counselling, travel, and professional introductions",
          "Level planning from beginner to intermediate and advanced fluency goals",
        ],
      },
      {
        title: "Online and Chennai classroom options",
        body:
          "Choose online, offline, or hybrid classes depending on your location, timeline, and target country. We support students, working professionals, and families planning international moves.",
        points: [
          "Foreign language classes in Chennai with online access across India and worldwide",
          "Weekend batches and flexible timings for working professionals",
          "Counselling to choose the right language level for your abroad-study timeline",
        ],
      },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
