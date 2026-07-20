"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";
import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/context/LanguageContext";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { tc } = useLang();

  useEffect(() => {
    if (status === "sent") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: Mail, label: tc("contactInfo1Label"), value: tc("contactInfo1Value"), href: "mailto:info@ally-saleh.com" },
    { icon: Phone, label: tc("contactInfo2Label"), value: tc("contactInfo2Value"), href: "tel:+255777000000" },
    { icon: MapPin, label: tc("contactInfo3Label"), value: tc("contactInfo3Value") },
  ];

  const socialLinks = [
    { name: tc("socialFacebook"), icon: FacebookIcon, href: "https://web.facebook.com/ally.saleh.5" },
    { name: tc("socialInstagram"), icon: InstagramIcon, href: "https://www.instagram.com/allysaleh1512?igsh=bnNpOHRpMHBybHB2" },
  ];

  return (
    <section id="contact" className="relative py-32 lg:py-40 bg-deep-charcoal scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-copper text-sm tracking-[0.3em] uppercase font-medium">
              {tc("contactLabel")}
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-soft-white mt-6 leading-[1.15]">
              {tc("contactHeading")}{" "}
              <span className="text-gradient">{tc("contactHeadingHighlight")}</span>
            </h2>
            <p className="text-soft-white/70 mt-6 max-w-2xl mx-auto leading-relaxed">
              {tc("contactDescription")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="accent-card rounded-none p-6 flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full border border-copper/10 flex items-center justify-center flex-shrink-0 group-hover:border-copper/30 group-hover:bg-copper/5 transition-all">
                      <Icon
                        size={18}
                        className="text-copper/60 group-hover:text-copper transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-soft-white/60 text-xs tracking-wider uppercase mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-soft-white/80 hover:text-copper transition-colors text-sm"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-soft-white/80 text-sm">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="pt-4">
                <p className="text-soft-white/60 text-xs tracking-wider uppercase mb-3">
                  {tc("contactFollowLabel")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-copper/10 text-soft-white/70 text-xs tracking-wider uppercase hover:border-copper/30 hover:text-copper transition-all"
                      >
                        <Icon size={14} />
                        {social.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <form
              className="accent-card rounded-none p-8 sm:p-10"
              onSubmit={handleSubmit}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-soft-white/60 text-xs tracking-wider uppercase mb-2 group-focus-within:text-copper transition-colors"
                  >
                    {tc("formName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-copper/10 px-4 py-3 text-soft-white text-sm outline-none transition-all focus:border-copper/40 focus:bg-copper/5"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-soft-white/60 text-xs tracking-wider uppercase mb-2 group-focus-within:text-copper transition-colors"
                  >
                    {tc("formEmail")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-copper/10 px-4 py-3 text-soft-white text-sm outline-none transition-all focus:border-copper/40 focus:bg-copper/5"
                  />
                </div>
              </div>
              <div className="group mt-6">
                <label
                  htmlFor="subject"
                  className="block text-soft-white/60 text-xs tracking-wider uppercase mb-2 group-focus-within:text-copper transition-colors"
                >
                  {tc("formSubject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-copper/10 px-4 py-3 text-soft-white text-sm outline-none transition-all focus:border-copper/40 focus:bg-copper/5"
                />
              </div>
              <div className="group mt-6">
                <label
                  htmlFor="message"
                  className="block text-soft-white/60 text-xs tracking-wider uppercase mb-2 group-focus-within:text-copper transition-colors"
                >
                  {tc("formMessage")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-copper/10 px-4 py-3 text-soft-white text-sm outline-none transition-all focus:border-copper/40 focus:bg-copper/5 resize-none"
                />
              </div>
              <div className="relative">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-8 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-copper text-rich-black font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-soft-white hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  {status === "sending" ? tc("btnSending") : tc("btnSubmit")}
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {status === "sent" && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-rich-black/90 backdrop-blur-sm transition-all duration-300">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-copper/40 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" stroke="#D4AF37" />
                        </svg>
                      </div>
                      <span className="text-gold text-sm font-medium tracking-wider uppercase">{tc("sentSuccess")}</span>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <p className="mt-4 text-red-400 text-sm">{tc("sentError")}</p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
