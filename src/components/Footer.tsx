import Link from "next/link";
import { site, languages, footerQuickLinks } from "@/lib/constants";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export function Footer() {

  return (
    <footer className="relative overflow-hidden border-t border-[#B9E2FF]/60 bg-[#EEF7FF]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(29,155,240,0.12),transparent_30%),linear-gradient(180deg,#F4FAFF_0%,#EEF7FF_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">{site.name}</h3>
            <p className="text-[15px] leading-7 text-[#334155]">
<<<<<<< HEAD
<<<<<<< HEAD
              Foreign Language Academy helps learners in Chennai build
              exam-ready fluency through certified trainers, practical speaking
              practice, and flexible online or offline batches.
=======
              {site.tagline}
>>>>>>> b97b215 (Redesign: section gap halving, hero heading update, UI polish across all pages)
=======
              Foreign Language Academy helps learners to master
              every course through certified trainers and flexible online or offline batches.
>>>>>>> d7c2ee6 (Update certificate template and site refinements)
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#334155]">
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="size-4 shrink-0" />
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineMail className="size-4 shrink-0" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <HiOutlineLocationMarker className="mt-0.5 size-4 shrink-0" />
                <span>{site.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#334155]">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Languages
            </h4>
            <ul className="space-y-1.5 text-sm text-[#334155]">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <Link
                    href={`/courses/${lang.slug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {lang.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center border-t border-[#B9E2FF]/70 pt-8 text-center text-xs text-[#334155]">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
