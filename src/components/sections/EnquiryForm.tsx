"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry, type EnquiryPayload } from "@/lib/enquiry";

const projectTypes = [
  "Freelance Project",
  "Architectural Consultation",
  "Business Support",
  "Business Development",
  "Full-Stack Development",
  "Collaboration",
  "Other",
];

type Status = "idle" | "submitting" | "success";

const initialValues: EnquiryPayload = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

function validate(values: EnquiryPayload) {
  const errors: Partial<EnquiryPayload> = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.projectType) errors.projectType = "Please select a project type.";
  if (!values.message.trim()) {
    errors.message = "Please tell me a little about your project.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

const inputClass =
  "w-full bg-white/[0.04] border border-glass-border rounded-xl px-4 py-3.5 text-[16px] sm:text-sm text-white placeholder:text-secondary-text/60 focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(0,217,255,0.25)] transition-all duration-300 min-h-[48px]";

const labelClass =
  "block text-[10px] tracking-[0.25em] text-secondary-text uppercase mb-2";

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryPayload>(initialValues);
  const [errors, setErrors] = useState<Partial<EnquiryPayload>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    field: keyof EnquiryPayload,
    value: string
  ) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    const result = await submitEnquiry(values);
    if (result.ok) {
      setStatus("success");
      setValues(initialValues);
    } else {
      setStatus("idle");
    }
  };

  const fieldError = (key: keyof EnquiryPayload) =>
    errors[key] ? (
      <span className="mt-1.5 block text-xs text-red-400" role="alert">
        {errors[key]}
      </span>
    ) : null;

  return (
    <section
      id="enquiry-form"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-purple/5 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            GET IN TOUCH
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="gradient-text">START A CONVERSATION.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-strong rounded-3xl p-5 sm:p-8 lg:p-10"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
                  MESSAGE TRANSMITTED
                  <br />
                  <span className="text-neon-green">SUCCESSFULLY.</span>
                </h3>
                <p className="text-secondary-text max-w-md mx-auto">
                  Thank you for reaching out. I will get back to you as soon as
                  possible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="enq-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="enq-name"
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                      autoComplete="name"
                    />
                    {fieldError("name")}
                  </div>
                  <div>
                    <label htmlFor="enq-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="enq-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                    {fieldError("email")}
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-company" className={labelClass}>
                    Company / Organization
                  </label>
                  <input
                    id="enq-company"
                    type="text"
                    value={values.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Optional"
                    className={inputClass}
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="enq-type" className={labelClass}>
                    Project Type
                  </label>
                  <select
                    id="enq-type"
                    value={values.projectType}
                    onChange={(e) => handleChange("projectType", e.target.value)}
                    className={`${inputClass} appearance-none ${
                      values.projectType ? "text-white" : "text-secondary-text/60"
                    }`}
                  >
                    <option value="" disabled className="bg-[#0B0B0F]">
                      Select a project type
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-[#0B0B0F]">
                        {t}
                      </option>
                    ))}
                  </select>
                  {fieldError("projectType")}
                </div>

                <div>
                  <label htmlFor="enq-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="enq-message"
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                  {fieldError("message")}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-bold tracking-widest hover:bg-electric-blue hover:text-black transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,217,255,0.3)] disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      SEND ENQUIRY
                      <Send
                        size={15}
                        className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                      />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
