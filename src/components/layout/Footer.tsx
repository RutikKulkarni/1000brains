import Link from "next/link";
import {
  Brain,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  ExternalLink,
  Heart,
} from "lucide-react";
import { NAV_ITEMS, PORTFOLIO_HEADS } from "@/types";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)]">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
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
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Mail, href: "mailto:sameer@example.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-200 hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
              Portfolio
            </h4>
            <ul className="space-y-3">
              {PORTFOLIO_HEADS.map((head) => (
                <li key={head.slug}>
                  <Link
                    href={`/${head.slug}`}
                    className="text-sm text-muted hover:text-accent transition-colors font-body flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    {head.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.filter((n) => n.href !== "/").map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-accent transition-colors font-body flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliations */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground mb-4">
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
                    className="text-sm text-muted hover:text-accent transition-colors font-body flex items-center gap-1.5 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-body">
            © {new Date().getFullYear()} Prof. Sameer Sahasrabudhe · 1000brains.
            All rights reserved.
          </p>
          <p className="text-xs text-muted font-body flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-accent fill-accent" /> by{" "}
            <a
              href="https://github.com/RutikKulkarni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              RNH
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
