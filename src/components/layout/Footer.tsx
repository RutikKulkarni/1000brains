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

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialLinks = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:sameer@example.com", label: "Email" },
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
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-lg text-foreground">
                  1000<span className="text-accent">brains</span>
                </span>
              </Link>
              <p className="text-sm text-muted font-body leading-relaxed mb-6">
                The digital identity of Prof. Sameer Sahasrabudhe — 10 traits
                unified into one multidisciplinary creative practice.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 hover:shadow-md transition-all duration-200 hover:scale-105"
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
