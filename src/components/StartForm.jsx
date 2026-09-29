"use client";

import { useEffect, useState } from "react";
import {
  GOALS,
  CURRENCIES,
  TIMELINES,
  WHATSAPP_NUMBER,
  EMAIL_RE,
  formatBudget,
  buildWhatsAppMessage,
} from "@/lib/enquiry";

const STEPS = ["About you", "Your project", "Budget", "Timeline"];

async function submitEnquiry(data) {
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong sending that.");
  }
  return res.json();
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3C7.03 3 3 7.03 3 12c0 1.77.5 3.42 1.36 4.83L3 21l4.31-1.32A8.93 8.93 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 8.4c.2-.45.4-.46.6-.47h.5c.16 0 .38-.06.58.44.2.5.7 1.7.75 1.83.06.13.1.28 0 .45-.09.17-.14.28-.28.43-.14.15-.29.34-.42.46-.14.13-.28.27-.12.55.16.28.7 1.16 1.52 1.88 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.82.89-1.1.19-.28.37-.23.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.16 1.34-.23.66-1.34 1.27-1.84 1.31-.5.05-.5.39-3.18-.66-2.68-1.06-4.3-3.6-4.43-3.78-.13-.17-1.06-1.41-1.06-2.7 0-1.28.68-1.9.92-2.16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="flex items-center justify-center w-11 h-11 rounded-full border border-black/15 text-black hover:border-black hover:bg-black hover:text-white transition-all duration-200 shrink-0"
    >
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
        <path
          d="M11 7H3M3 7L7 3M3 7L7 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-black/15 bg-white font-inter text-base text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors duration-200";

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="font-inter text-sm font-semibold text-black">
        {label}
        {required && <span className="text-[#D4908A] ml-1">*</span>}
      </span>
      <div className="mt-2.5">{children}</div>
      {error && (
        <span className="block font-inter text-sm text-[#D4908A] mt-2">{error}</span>
      )}
    </label>
  );
}

function CheckboxRow({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 text-left px-5 py-4 rounded-xl border transition-colors duration-200 ${
        selected ? "border-black bg-black/[0.03]" : "border-black/15 hover:border-black/35"
      }`}
    >
      <span
        className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-[6px] border-2 transition-colors duration-200 ${
          selected ? "bg-black border-black" : "border-black/25"
        }`}
      >
        {selected && (
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7.5L5.5 10.5L11.5 3.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="font-inter text-base font-medium text-black leading-snug">
        {label}
      </span>
    </button>
  );
}

function RadioRow({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 text-left px-5 py-4 rounded-xl border transition-colors duration-200 ${
        selected ? "border-black bg-black/[0.03]" : "border-black/15 hover:border-black/35"
      }`}
    >
      <span
        className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors duration-200 ${
          selected ? "border-black" : "border-black/25"
        }`}
      >
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-black" />}
      </span>
      <span className="font-inter text-base font-medium text-black leading-snug">
        {label}
      </span>
    </button>
  );
}

const initialData = {
  name: "",
  email: "",
  phone: "",
  website: "",
  goals: [],
  description: "",
  currency: "NGN",
  amount: "",
  timeline: "",
};

export default function StartForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reviewing, setReviewing] = useState(false);

  const update = (field) => (e) => {
    setData((d) => ({ ...d, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const toggleGoal = (goal) => {
    setData((d) => ({
      ...d,
      goals: d.goals.includes(goal)
        ? d.goals.filter((g) => g !== goal)
        : [...d.goals, goal],
    }));
  };

  const validateStep0 = () => {
    const next = {};
    if (!data.name.trim()) next.name = "Let me know what to call you.";
    if (!data.email.trim()) next.email = "I'll need an email to reach you.";
    else if (!EMAIL_RE.test(data.email.trim())) next.email = "That email doesn't look right.";
    if (!data.phone.trim()) next.phone = "A number I can reach you on.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step === 0 && !validateStep0()) return;
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setReviewing(true);
    }
  };

  const goBack = () => {
    if (reviewing) {
      setReviewing(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, reviewing, submitted]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(data)
  )}`;

  const whatsappFollowUpHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(data, { alreadySubmitted: true })
  )}`;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitEnquiry(data);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err.message || "Something went wrong sending that. Try again, or message me on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const progressPct = reviewing || submitted ? 100 : ((step + 1) / STEPS.length) * 100;

  return (
    <div>
      {!submitted && (
        <div className="mb-8 md:mb-10">
          {step === 0 && !reviewing && (
            <div className="animate-hero-fade text-center mb-10 md:mb-12">
              <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-black tracking-tighter leading-[1.1]">
                Let&apos;s build something.
              </h1>
              <p className="font-inter text-xl md:text-2xl font-semibold text-black/80 mt-3">
                Tell me what you&apos;re working on.
              </p>
              <p className="font-inter text-base text-muted mt-4 max-w-sm mx-auto">
                Share a few details about your business and what you&apos;d like to
                build.
              </p>
            </div>
          )}

          <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-10">
        {submitted ? (
          <div key="submitted" className="animate-hero-fade text-center py-6">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-black tracking-tight">
              Thanks{data.name.trim() ? `, ${data.name.trim()}` : ""}.
            </h2>
            <p className="font-inter text-base text-muted mt-4 max-w-md mx-auto">
              I&apos;ve got your details and I&apos;ll get back to you soon. If
              it&apos;s urgent, message me on WhatsApp and I&apos;ll reply
              faster.
            </p>
            <a
              href={whatsappFollowUpHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full bg-black text-white font-inter font-semibold hover:bg-white hover:text-black border-2 border-black transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Message me on WhatsApp
            </a>
          </div>
        ) : reviewing ? (
          <div key="review" className="animate-hero-fade text-center py-6">
            <p className="font-mono text-xs text-muted mb-3">Ready to send</p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-black tracking-tight">
              That&apos;s everything I need.
            </h2>
            <p className="font-inter text-base text-muted mt-4 max-w-sm mx-auto">
              Send it over, or message me directly on WhatsApp if you&apos;d
              rather talk it through there.
            </p>

            <div className="flex flex-col items-center gap-5 mt-10">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-black text-white font-inter font-semibold hover:bg-white hover:text-black border-2 border-black transition-all duration-200 disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send Project Enquiry"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 11L11 3M11 3H4.5M11 3V9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {submitError && (
                <p className="font-inter text-sm text-[#D4908A] max-w-xs">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col items-center gap-2.5">
                <p className="font-inter text-sm text-muted">Prefer WhatsApp?</p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-black bg-white text-black font-inter font-semibold hover:bg-black hover:text-white transition-all duration-200"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Message me directly
                </a>
              </div>

              <BackButton onClick={goBack} />
            </div>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs text-muted mb-6">
              Step {step + 1} of {STEPS.length}
            </p>

            <div key={step} className="animate-hero-fade">
              {step === 0 && (
                <div className="flex flex-col gap-7">
                  <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-black tracking-tight">
                    About you
                  </h2>

                  <Field label="Your name" required error={errors.name}>
                    <input
                      type="text"
                      value={data.name}
                      onChange={update("name")}
                      placeholder="Anna Afolabi"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Email" required error={errors.email}>
                    <input
                      type="email"
                      value={data.email}
                      onChange={update("email")}
                      placeholder="you@email.com"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="WhatsApp or phone number" required error={errors.phone}>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={update("phone")}
                      placeholder="+234 000 000 0000"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Current website (if you have one)">
                    <input
                      type="text"
                      value={data.website}
                      onChange={update("website")}
                      placeholder="https://yourwebsite.com"
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-8">
                  <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-black tracking-tight">
                    Your project
                  </h2>

                  <div>
                    <span className="font-inter text-sm font-semibold text-black">
                      What are you looking to achieve?
                    </span>
                    <p className="font-inter text-sm text-muted mt-1">
                      Pick as many as apply.
                    </p>
                    <div className="flex flex-col gap-2.5 mt-4">
                      {GOALS.map((goal) => (
                        <CheckboxRow
                          key={goal}
                          label={goal}
                          selected={data.goals.includes(goal)}
                          onClick={() => toggleGoal(goal)}
                        />
                      ))}
                    </div>
                  </div>

                  <Field label="What would you like your site or system to do for you?">
                    <textarea
                      value={data.description}
                      onChange={update("description")}
                      placeholder="Tell me about your business, what you want to achieve, what's currently difficult, or anything else I should know."
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-7">
                  <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-black tracking-tight">
                    Budget
                  </h2>

                  <Field label="What's your approximate budget?">
                    <div className="flex items-stretch rounded-xl border border-black/15 bg-white overflow-hidden focus-within:border-black transition-colors duration-200">
                      <select
                        value={data.currency}
                        onChange={update("currency")}
                        className="bg-black/[0.03] pl-4 pr-2 font-inter font-semibold text-black border-r border-black/15 focus:outline-none"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} {c.symbol}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={data.amount ? Number(data.amount).toLocaleString("en-US") : ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, "");
                          setData((d) => ({ ...d, amount: raw }));
                        }}
                        placeholder="500,000"
                        className="flex-1 min-w-0 px-4 py-3.5 font-inter text-base text-black placeholder:text-black/30 focus:outline-none"
                      />
                    </div>
                    <p className="font-inter text-sm text-muted mt-2.5">
                      Optional, but it helps me plan.
                    </p>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-8">
                  <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-black tracking-tight">
                    Timeline
                  </h2>

                  <div>
                    <span className="font-inter text-sm font-semibold text-black">
                      When would you like to begin?
                    </span>
                    <div className="flex flex-col gap-2.5 mt-4">
                      {TIMELINES.map((option) => (
                        <RadioRow
                          key={option}
                          label={option}
                          selected={data.timeline === option}
                          onClick={() => setData((d) => ({ ...d, timeline: option }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 mt-10 pt-2">
              {step > 0 ? <BackButton onClick={goBack} /> : <span />}

              <button
                type="button"
                onClick={goNext}
                className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white font-inter font-semibold hover:bg-white hover:text-black border-2 border-black transition-all duration-200"
              >
                {step < STEPS.length - 1 ? "Next" : "Review"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M3 7H11M11 7L7 3M11 7L7 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
