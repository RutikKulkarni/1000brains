import Link from "next/link";
import { Brain, Mail, Heart } from "lucide-react";
import { NAV_ITEMS, PORTFOLIO_HEADS } from "@/types";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const socialLinks = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/sssameer/", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://x.com/drsameerss", label: "Twitter" },
  { icon: FacebookIcon, href: "https://www.facebook.com/sameerss23", label: "Facebook" },
  { icon: InstagramIcon, href: "https://www.instagram.com/sameerss_insta/", label: "Instagram" },
  { icon: GoogleScholarIcon, href: "https://scholar.google.com/citations?user=fEZp1N8AAAAJ&hl=en&authuser=1", label: "Google Scholar" },
  { icon: GlobeIcon, href: "https://ssameers.wordpress.com/?share=twitter&nb=1", label: "Blog" },
];

export default function Footer() {
  return (
    <div className="pt-8">
      <footer>
        <div className="section-container pt-12 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <Brain className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <span className="font-heading font-bold text-lg text-foreground">
                  1000<span className="text-accent">brains</span>
                </span>
              </Link>
              <p className="text-sm text-muted font-body leading-relaxed mb-5">
                The digital identity of Prof. Sameer Sahasrabudhe — 10 traits
                unified into one multidisciplinary creative practice.
              </p>

              {/* Emails */}
              <div className="mb-5 space-y-2 font-body text-sm text-muted">
                <a href="mailto:sameerss@iitgn.ac.in" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="truncate">sameerss@iitgn.ac.in</span>
                </a>
                <a href="mailto:iamsameerss@gmail.com" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="truncate">iamsameerss@gmail.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-5">
                Portfolio
              </h4>
              <ul className="space-y-3">
                {PORTFOLIO_HEADS.map((head) => (
                  <li key={head.slug}>
                    <Link
                      href={`/${head.slug}`}
                      className="text-sm text-muted hover:text-accent transition-colors duration-200 font-body flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-200" />
                      {head.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_ITEMS.filter((n) => n.href !== "/").map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted hover:text-accent transition-colors duration-200 font-body flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Affiliations */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-5">
                Affiliations
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "IIT Gandhinagar", href: "#" },
                  { name: "NPTEL / SWAYAM", href: "#" },
                  { name: "EdTech Society", href: "#" },
                  { name: "1000 Brains Blog", href: "#" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-accent transition-colors duration-200 font-body flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent/60 transition-colors duration-200" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-3 pb-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted font-body">
              &copy; {new Date().getFullYear()} Prof. Sameer Sahasrabudhe
              &middot; 1000brains. All rights reserved.
            </p>
            <p className="text-xs text-muted font-body flex items-center gap-1.5 shrink-0">
              Crafted with <Heart className="w-3 h-3 text-accent fill-accent" />{" "}
              by{" "}
              <a
                href="https://github.com/RutikKulkarni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Rutik Kulkarni
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
