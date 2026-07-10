import { site } from "@/lib/constants";

export type LegalSection = {
  title: string;
  body: string[];
};

export type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export const privacyPolicyContent: LegalPageContent = {
  eyebrow: "Privacy Policy",
  title: "How we handle learner information",
  description:
    "This policy explains what information Foreign Language Academy collects through our website, enquiry forms, demo bookings, registrations, certificate services, and student communication channels.",
  updated: "July 10, 2026",
  sections: [
    {
      title: "Information we collect",
      body: [
        "When you contact us, register for a course, book a demo, apply for a job, or request certificate support, we may collect your name, phone number, email address, city, preferred language, course level, learning goals, batch preference, and message details.",
        "For certificate generation and verification, we may store certificate number, student name, course name, level, marks, grade, issue date, and related form data required to create and verify the certificate.",
        "When you use the website, basic technical information such as device type, browser, pages visited, form submission status, and approximate usage activity may be collected through hosting, analytics, security, or performance tools.",
      ],
    },
    {
      title: "How we use information",
      body: [
        "We use the information to respond to enquiries, schedule demo classes, recommend suitable batches, process registrations, provide course support, issue certificates, verify certificates, manage job applications, and improve our website and services.",
        "We may contact you by phone, email, WhatsApp, SMS, or similar channels for service-related communication, class updates, counselling, fee information, reminders, and follow-up support.",
        "We may use aggregated or non-identifying information to understand demand for courses, improve page performance, plan batches, and measure the effectiveness of our campaigns.",
      ],
    },
    {
      title: "Sharing and service providers",
      body: [
        "We do not sell your personal information. We may share limited information with trusted service providers who help us operate the website, store data, deliver messages, host files, process forms, manage certificates, or maintain security.",
        "Examples include hosting providers, database providers, cloud storage providers, email or messaging tools, analytics tools, and payment or administrative tools where applicable.",
        "We may disclose information if required by law, regulation, legal process, fraud prevention, safety, or to protect the rights and operations of Foreign Language Academy.",
      ],
    },
    {
      title: "Payments and course records",
      body: [
        "If online payment or fee collection is enabled, payment processing may be handled by third-party payment providers. We do not intentionally store full card numbers or payment authentication credentials on our website.",
        "Course records, enquiries, certificates, and communication history may be retained for academic, administrative, accounting, support, and legal purposes.",
      ],
    },
    {
      title: "Cookies and analytics",
      body: [
        "Our website may use cookies or similar technologies to keep the site working, remember basic preferences, measure traffic, improve performance, and protect forms from misuse.",
        "You can adjust cookie settings in your browser. Some website features may not work correctly if essential cookies or scripts are blocked.",
      ],
    },
    {
      title: "Data security",
      body: [
        "We use reasonable technical and organisational measures to protect information against unauthorised access, misuse, alteration, or loss.",
        "No internet transmission or electronic storage method is completely secure. Please avoid sending sensitive documents or payment details through unsecured channels unless requested through an approved process.",
      ],
    },
    {
      title: "Your choices and rights",
      body: [
        "You may contact us to request access, correction, or deletion of personal information that we hold about you, subject to identity verification and records we are required to keep.",
        "You may ask us to stop promotional follow-ups. We may still contact you for active course, payment, certificate, legal, or service-related matters.",
      ],
    },
    {
      title: "Children and student information",
      body: [
        "Some learners may be minors. Where required, parents or guardians should provide consent and accurate contact details before enrolment or participation.",
        "We use student information only for education, administration, safety, communication, certification, and service support purposes.",
      ],
    },
    {
      title: "Updates to this policy",
      body: [
        "We may update this Privacy Policy when our services, systems, or legal requirements change. The revised date on this page will show the latest version.",
      ],
    },
    {
      title: "Contact",
      body: [
        `For privacy questions or data requests, contact ${site.name} at ${site.email} or ${site.phone}. Our address is ${site.address}.`,
      ],
    },
  ],
};

export const termsContent: LegalPageContent = {
  eyebrow: "Terms and Conditions",
  title: "Terms for using our website and services",
  description:
    "These terms apply when you access the Foreign Language Academy website, submit forms, book demos, register for courses, use certificate verification, or communicate with us about our services.",
  updated: "July 10, 2026",
  sections: [
    {
      title: "Acceptance of terms",
      body: [
        "By using this website or submitting information to Foreign Language Academy, you agree to these Terms and Conditions. If you do not agree, please do not use the website or services.",
        "Additional terms may apply to specific courses, batches, exams, payment plans, offers, or certificates. Those details may be shared during counselling, registration, or admission.",
      ],
    },
    {
      title: "Our services",
      body: [
        "Foreign Language Academy provides language training, demo counselling, online and offline classes, exam-oriented preparation, soft skills training, student support, course registration, and certificate-related services.",
        "Course availability, trainers, schedules, class mode, fees, batch size, duration, and curriculum may vary by language, level, student requirement, and operational needs.",
      ],
    },
    {
      title: "Enquiries, demo classes, and registration",
      body: [
        "When you submit an enquiry, demo booking, registration, or contact form, you agree to provide accurate and current information.",
        "Submitting a form does not guarantee admission, seat availability, a particular trainer, a specific schedule, or a confirmed course fee until confirmed by Foreign Language Academy.",
      ],
    },
    {
      title: "Fees, payments, and refunds",
      body: [
        "Course fees, instalment options, discounts, offers, and payment timelines may differ by programme and batch. The applicable details will be communicated before or during registration.",
        "Students are responsible for paying fees on time. Access to classes, materials, certificates, or services may be paused if payment requirements are not met.",
        "Refunds, transfers, batch changes, or postponements are handled according to the specific course agreement or written confirmation provided at the time of enrolment. Unless separately stated in writing, fees paid for confirmed batches, used services, completed sessions, or reserved seats may not be refundable.",
      ],
    },
    {
      title: "Student responsibilities",
      body: [
        "Students are expected to attend classes on time, participate respectfully, complete assigned work, follow trainer instructions, and use class materials only for personal learning.",
        "Disruptive behaviour, harassment, abuse, misuse of online class links, unauthorised recording, sharing paid materials, impersonation, or false information may lead to suspension or cancellation of access.",
      ],
    },
    {
      title: "Certificates and verification",
      body: [
        "Certificates issued by Foreign Language Academy are based on the course, assessment, attendance, performance, and administrative criteria applicable to the student.",
        "Certificate verification pages and QR codes are provided to help confirm details recorded by us. They do not replace official third-party exam certificates such as Goethe, DELF, JLPT, IELTS, TOPIK, or other external examination bodies.",
        "Any attempt to edit, forge, misuse, reproduce, or misrepresent a certificate is strictly prohibited.",
      ],
    },
    {
      title: "Website content and intellectual property",
      body: [
        "Text, graphics, course descriptions, layouts, certificates, logos, images, videos, learning materials, and other content on the website or shared during classes belong to Foreign Language Academy or its licensors unless otherwise stated.",
        "You may not copy, republish, resell, modify, distribute, scrape, or use our content for commercial purposes without written permission.",
      ],
    },
    {
      title: "Third-party links and tools",
      body: [
        "The website may include links, maps, forms, payment tools, video platforms, messaging tools, cloud services, or external exam references. We are not responsible for third-party websites, policies, downtime, fees, or decisions.",
        "External exam rules, dates, fees, recognition, and results are controlled by the respective exam bodies and may change independently.",
      ],
    },
    {
      title: "Limitation of liability",
      body: [
        "We work to keep information accurate and services reliable, but we do not guarantee that the website will always be uninterrupted, error-free, or free from technical issues.",
        "To the extent permitted by law, Foreign Language Academy will not be liable for indirect, incidental, consequential, or special losses arising from website use, class scheduling changes, third-party platform issues, or reliance on general website information.",
      ],
    },
    {
      title: "Changes to these terms",
      body: [
        "We may update these Terms and Conditions when our services, policies, website features, or legal requirements change. Continued use of the website after updates means you accept the revised terms.",
      ],
    },
    {
      title: "Contact",
      body: [
        `For questions about these terms, contact ${site.name} at ${site.email} or ${site.phone}. Our address is ${site.address}.`,
      ],
    },
  ],
};
