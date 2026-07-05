export const site = {
  name: "Foreign Language Academy",
  tagline: "Online, offline, and hybrid foreign language learning since 2007.",
  phone: "+91 8129669247",
  email: "aforeignlanguage@gmail.com",
  address: "Maruthi Nagar, Rajakilpakkam-73, Chennai, India",
  hours: "Monday to Sunday, 8:00 AM – 10:00 PM",
  googleRating: "4.6",
};

export const mediaFallbacks = {
  hero: "/image36.webp",
  "courses-hero": "/image37.webp",
  "about-hero": "/image38.webp",
  "banner-10": "/image36.webp",
  "banner-11": "/image37.webp",
  "online-class": "/image41.webp",
  "offline-class": "/image42.webp",
  "hybrid-learning": "/image43.webp",
  "certification-prep": "/image44.webp",
  "study-abroad": "/image45.webp",
  "group-discussion": "/image55.webp",
} as const;

export const stats = [
  { label: "Students", value: 1900, suffix: "+", description: "Learning with us", icon: "users" as const },
  { label: "Courses", value: 455, suffix: "+", description: "Available to explore", icon: "book" as const },
  { label: "Google Rating", value: 4.6, prefix: "", suffix: " ★", description: "From 200+ reviews", icon: "star" as const },
  { label: "Since", value: 2007, suffix: "", description: "Trusted education", icon: "calendar" as const },
];

export const languages = [
  { name: "German", slug: "german", flag: "DE", levels: "A1-C2", duration: "3 months" },
  { name: "French", slug: "french", flag: "FR", levels: "A1-C2", duration: "3 months" },
  { name: "Japanese", slug: "japanese", flag: "JP", levels: "N5-N1", duration: "4 months" },
  { name: "Spanish", slug: "spanish", flag: "ES", levels: "A1-C2", duration: "3 months" },
  { name: "Chinese", slug: "chinese", flag: "CN", levels: "HSK 1-6", duration: "4 months" },
  { name: "English", slug: "english", flag: "EN", levels: "A1-C2", duration: "2 months" },
  { name: "Russian", slug: "russian", flag: "RU", levels: "A1-C2", duration: "3 months" },
  { name: "Korean", slug: "korean", flag: "KR", levels: "TOPIK 1-6", duration: "4 months" },
  { name: "Italian", slug: "italian", flag: "IT", levels: "A1-C2", duration: "3 months" },
  { name: "Soft Skills Training", slug: "soft-skills", flag: "SS", levels: "Foundation to Advanced", duration: "8 weeks" },
];

export const whyChooseUs = [
  {
    title: "Native Trainers",
    description: "Learn from certified native speakers with years of teaching experience.",
  },
  {
    title: "International Certifications",
    description: "Globally recognized certificates upon course completion.",
  },
  {
    title: "Flexible Batches",
    description: "Morning, evening, and weekend batches to fit your schedule.",
  },
  {
    title: "Practical Learning",
    description: "Real-world conversation practice from day one.",
  },
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const adminNav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Registrations", href: "/admin/registrations" },
  { label: "Demo Bookings", href: "/admin/demo-bookings" },
  { label: "Careers", href: "/admin/careers" },
  { label: "Job Applications", href: "/admin/job-applications" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Certificates", href: "/admin/certificates" },
  { label: "Site Content", href: "/admin/media" },
  { label: "Manage Admins", href: "/admin/admins" },
];


