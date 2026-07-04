"use client";

import { useState, useActionState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { submitApplication, type ApplicationFormState } from "./actions";

const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';
const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

const inputClass =
  "w-full bg-white border border-[#E2DDD7] focus:border-[#A51C30] outline-none text-[#1A1A1A] placeholder:text-[#B5AAA1] text-[14px] px-4 py-3 transition-colors";
const inputStyle = { fontFamily: SANS, borderRadius: "2px" };
const labelClass = "block text-[#1A1A1A] text-[13px] font-semibold mb-2";

const GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export default function ApplicationForm({
  schoolSlug,
  schoolName,
}: {
  schoolSlug: string;
  schoolName: string;
}) {
  const [step, setStep] = useState(1);
  const initialState: ApplicationFormState = { success: false };
  const submitWithSlug = submitApplication.bind(null, schoolSlug);
  const [state, formAction, isPending] = useActionState(
    submitWithSlug,
    initialState,
  );

  // Local field state so we can validate before advancing steps
  const [data, setData] = useState({
    applicant_name: "",
    applicant_dob: "",
    applicant_gender: "",
    grade_applying_for: "",
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    previous_school: "",
    address: "",
    notes: "",
  });

  const update = (key: string, val: string) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const step1Valid =
    data.applicant_name.trim() !== "" && data.grade_applying_for !== "";
  const step2Valid =
    data.parent_name.trim() !== "" && data.parent_phone.trim() !== "";

  if (state.success) {
    return (
      <div
        className="bg-white border border-[#E2DDD7] p-12 text-center"
        style={{ borderRadius: "2px" }}
      >
        <CheckCircle2
          className="h-10 w-10 text-[#A51C30] mx-auto mb-6"
          strokeWidth={1.5}
        />
        <h2
          className="text-[#1A1A1A] font-bold text-[22px] mb-3"
          style={{ fontFamily: SERIF }}
        >
          Application received
        </h2>
        <p
          className="text-[#716860] text-[14px] leading-relaxed max-w-sm mx-auto"
          style={{ fontFamily: SANS }}
        >
          Thank you for applying to {schoolName}. The admissions team will
          review the application and contact{" "}
          {data.parent_name || "the parent or guardian"} at {data.parent_phone}{" "}
          within a few business days.
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-white border border-[#E2DDD7]"
      style={{ borderRadius: "2px" }}
    >
      {/* Progress indicator */}
      <div className="flex border-b border-[#E2DDD7]">
        {["Student", "Parent / Guardian", "Review"].map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div
              key={label}
              className={`flex-1 px-6 py-4 ${i > 0 ? "border-l border-[#E2DDD7]" : ""}`}
            >
              <p
                className={`text-[11px] font-semibold tracking-wide uppercase mb-1 ${active ? "text-[#A51C30]" : done ? "text-[#1A1A1A]" : "text-[#B5AAA1]"}`}
                style={{ fontFamily: SANS }}
              >
                Step {n}
              </p>
              <p
                className={`text-[13px] ${active || done ? "text-[#1A1A1A] font-medium" : "text-[#B5AAA1]"}`}
                style={{ fontFamily: SANS }}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>

      <form action={formAction} className="p-8">
        {/* Hidden fields carry all data through to the final server action call */}
        {Object.entries(data).map(([key, val]) => (
          <input key={key} type="hidden" name={key} value={val} />
        ))}

        {state.error && (
          <div
            className="bg-[#FBEAEA] border border-[#F0C4C4] text-[#A51C30] text-[13px] px-4 py-3 mb-6"
            style={{ fontFamily: SANS, borderRadius: "2px" }}
          >
            {state.error}
          </div>
        )}

        {/* ── Step 1: Student ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass} style={{ fontFamily: SANS }}>
                Student's full name *
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                value={data.applicant_name}
                onChange={(e) => update("applicant_name", e.target.value)}
                placeholder="e.g. Betelhem Tesfaye"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} style={{ fontFamily: SANS }}>
                  Date of birth
                </label>
                <input
                  type="date"
                  className={inputClass}
                  style={inputStyle}
                  value={data.applicant_dob}
                  onChange={(e) => update("applicant_dob", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: SANS }}>
                  Gender
                </label>
                <select
                  className={inputClass}
                  style={inputStyle}
                  value={data.applicant_gender}
                  onChange={(e) => update("applicant_gender", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: SANS }}>
                Grade applying for *
              </label>
              <select
                className={inputClass}
                style={inputStyle}
                value={data.grade_applying_for}
                onChange={(e) => update("grade_applying_for", e.target.value)}
              >
                <option value="">Select a grade</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: SANS }}>
                Previous school (if any)
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                value={data.previous_school}
                onChange={(e) => update("previous_school", e.target.value)}
                placeholder="e.g. Bole Elementary School"
              />
            </div>
          </div>
        )}

        {/* ── Step 2: Parent ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass} style={{ fontFamily: SANS }}>
                Parent or guardian's full name *
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                value={data.parent_name}
                onChange={(e) => update("parent_name", e.target.value)}
                placeholder="e.g. Abebe Kebede"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} style={{ fontFamily: SANS }}>
                  Phone number *
                </label>
                <input
                  type="tel"
                  className={inputClass}
                  style={inputStyle}
                  value={data.parent_phone}
                  onChange={(e) => update("parent_phone", e.target.value)}
                  placeholder="e.g. 0911 234 567"
                />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: SANS }}>
                  Email (optional)
                </label>
                <input
                  type="email"
                  className={inputClass}
                  style={inputStyle}
                  value={data.parent_email}
                  onChange={(e) => update("parent_email", e.target.value)}
                  placeholder="e.g. name@email.com"
                />
              </div>
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: SANS }}>
                Home address
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                value={data.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="e.g. Bole Sub-city, Addis Ababa"
              />
            </div>
            <div>
              <label className={labelClass} style={{ fontFamily: SANS }}>
                Anything else the school should know?
              </label>
              <textarea
                className={inputClass}
                style={inputStyle}
                rows={3}
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && (
          <div>
            <p
              className="text-[#716860] text-[13px] mb-6"
              style={{ fontFamily: SANS }}
            >
              Please confirm the details below before submitting.
            </p>
            <div
              className="divide-y divide-[#E2DDD7] border border-[#E2DDD7]"
              style={{ borderRadius: "2px" }}
            >
              {[
                ["Student", data.applicant_name],
                ["Date of birth", data.applicant_dob || "—"],
                ["Gender", data.applicant_gender || "—"],
                ["Grade applying for", data.grade_applying_for],
                ["Previous school", data.previous_school || "—"],
                ["Parent / guardian", data.parent_name],
                ["Phone", data.parent_phone],
                ["Email", data.parent_email || "—"],
                ["Address", data.address || "—"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between px-5 py-3">
                  <span
                    className="text-[#9A8F87] text-[13px]"
                    style={{ fontFamily: SANS }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[#1A1A1A] text-[13px] font-medium text-right"
                    style={{ fontFamily: SANS }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E2DDD7]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 text-[#716860] hover:text-[#1A1A1A] text-[13px] font-semibold transition-colors"
              style={{ fontFamily: SANS }}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 && (
            <button
              type="button"
              disabled={step === 1 ? !step1Valid : !step2Valid}
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 bg-[#A51C30] hover:bg-[#8B1627] disabled:opacity-35 disabled:cursor-not-allowed text-white text-[13px] font-semibold px-6 py-3 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {step === 3 && (
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-[#A51C30] hover:bg-[#8B1627] disabled:opacity-60 text-white text-[13px] font-semibold px-6 py-3 transition-colors"
              style={{ fontFamily: SANS, borderRadius: "2px" }}
            >
              {isPending ? "Submitting…" : "Submit application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
