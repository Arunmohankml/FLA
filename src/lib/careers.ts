export interface CareerListing {
  id: string;
  title: string;
  description: string;
  location: string;
  workMode: string;
  employmentType: string;
  code: string;
  accent?: string;
  createdAt?: string;
}

export const fallbackCareers: CareerListing[] = [
  {
    id: "fallback-german-faculty",
    title: "German Language Faculty",
    description: "Are you passionate about the German language and eager to share your knowledge with learners?",
    location: "Chennai",
    workMode: "Online",
    employmentType: "Full-time",
    code: "FLA001",
    accent: "#e8734a",
  },
  {
    id: "fallback-lxo",
    title: "Learner Experience Officer",
    description: "Help students choose the right learning path and stay supported throughout their course journey.",
    location: "Remote",
    workMode: "Remote",
    employmentType: "Full-time",
    code: "FLA002",
    accent: "#f0a35e",
  },
  {
    id: "fallback-soft-skills",
    title: "Soft Skills Trainer",
    description: "Lead confident communication, interview readiness, and workplace etiquette sessions.",
    location: "Bangalore",
    workMode: "Hybrid",
    employmentType: "Part-time",
    code: "FLA003",
    accent: "#d86340",
  },
];
