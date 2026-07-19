"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle } from "lucide-react";

interface SiteSettingsForm {
  bio: string;
  tagline: string;
  profileImage: string;
  stats: { learners: number; blogVisits: number; yearsExperience: number; phdScholars: number };
  socialLinks: { linkedin: string; twitter: string; youtube: string; blog: string; email: string };
  cvUrl: string;
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettingsForm>({
    bio: "",
    tagline: "",
    profileImage: "",
    stats: { learners: 100000, blogVisits: 176181, yearsExperience: 25, phdScholars: 3 },
    socialLinks: { linkedin: "", twitter: "", youtube: "", blog: "", email: "" },
    cvUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setForm({
            bio: data.bio || "",
            tagline: data.tagline || "",
            profileImage: data.profileImage || "",
            stats: data.stats || form.stats,
            socialLinks: { ...form.socialLinks, ...data.socialLinks },
            cvUrl: data.cvUrl || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Site Settings</h1>
          <p className="text-sm text-muted font-body">
            Configure bio, stats, social links, and CV
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {/* Bio */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-semibold">Profile</h3>
          <div>
            <label className="block text-sm font-body font-medium mb-1">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" placeholder="10 traits, 1 digital identity" />
          </div>
          <div>
            <label className="block text-sm font-body font-medium mb-1">Bio</label>
            <textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all resize-none" placeholder="Your bio..." />
          </div>
          <div>
            <label className="block text-sm font-body font-medium mb-1">Profile Image URL</label>
            <input type="text" value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-body font-medium mb-1">CV Download URL</label>
            <input type="text" value={form.cvUrl} onChange={(e) => setForm({ ...form, cvUrl: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" placeholder="https://..." />
          </div>
        </div>

        {/* Stats */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-semibold">Impact Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {(["learners", "blogVisits", "yearsExperience", "phdScholars"] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-body font-medium mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                <input type="number" value={form.stats[key]} onChange={(e) => setForm({ ...form, stats: { ...form.stats, [key]: parseInt(e.target.value) || 0 } })} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-heading font-semibold">Social Links</h3>
          {(["email", "linkedin", "twitter", "youtube", "blog"] as const).map((key) => (
            <div key={key}>
              <label className="block text-sm font-body font-medium mb-1 capitalize">{key}</label>
              <input type="text" value={form.socialLinks[key]} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [key]: e.target.value } })} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" placeholder={key === "email" ? "sameer@iitgn.ac.in" : "https://..."} />
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-body font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 shadow-lg shadow-accent/20"
        >
          {saved ? (
            <><CheckCircle className="w-4 h-4" />Saved!</>
          ) : saving ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>
          ) : (
            <><Save className="w-4 h-4" />Save Settings</>
          )}
        </button>
      </form>
    </div>
  );
}
