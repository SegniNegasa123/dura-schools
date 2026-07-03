"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  ShieldAlert,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Loader2,
} from "lucide-react";

const SANS =
  'system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';
const SERIF = 'Georgia, "Times New Roman", "Book Antiqua", serif';

interface WizardProps {
  schoolId: string;
  schoolSlug: string;
}

export default function ApplicationWizardForm({
  schoolId,
  schoolSlug,
}: WizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State Values
  const [formData, setFormData] = useState({
    studentName: "",
    gradeApplying: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    transcriptFileName: "",
    ministryFileName: "",
    nationalIdFileName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulate asset tracking parameters
  const handleFileSimulate = (field: string, filename: string) => {
    setFormData({
      ...formData,
      [field]: filename.split("\\").pop() || "Uploaded_Document.pdf",
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmitFinal = async () => {
    setIsSubmitting(true);

    // Simulate server ingestion pipelines processing payload values
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Application successfully transmitted to the institutional database master registry ledger.",
      );
      router.push(`/schools/${schoolSlug}`);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator Matrix */}
      <div
        className="grid grid-cols-4 gap-2 border-b border-[#EBE6DF] pb-6"
        style={{ fontFamily: SANS }}
      >
        {[
          { step: 1, label: "Student" },
          { step: 2, label: "Guardian" },
          { step: 3, label: "Academic Assets" },
          { step: 4, label: "Review" },
        ].map((item) => (
          <div key={item.step} className="space-y-2">
            <div
              className={`h-[3px] transition-colors duration-300 ${step >= item.step ? "bg-[#A51C30]" : "bg-[#EBE6DF]"}`}
            />
            <span
              className={`text-[11px] font-bold tracking-wider uppercase block ${step === item.step ? "text-[#A51C30]" : "text-[#716860]/60"}`}
            >
              {item.step}. {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: STUDENT PROFILE DATA */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-6">
          <div className="space-y-4">
            <h3
              style={{ fontFamily: SERIF }}
              className="text-[20px] font-bold text-[#1A1A1A]"
            >
              Student Particulars
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label
                  className="text-[12px] font-semibold text-[#3A3530]"
                  style={{ fontFamily: SANS }}
                >
                  Full Legal Name *
                </label>
                <input
                  required
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="e.g., Segni Seyoum Negasa"
                  className="w-full bg-white border border-[#E2DDD7] rounded-[2px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
              <div className="space-y-1">
                <label
                  className="text-[12px] font-semibold text-[#3A3530]"
                  style={{ fontFamily: SANS }}
                >
                  Grade Seeking Entry *
                </label>
                <select
                  required
                  name="gradeApplying"
                  value={formData.gradeApplying}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#E2DDD7] rounded-[2px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A] h-12"
                >
                  <option value="">Select entry level...</option>
                  <option value="Grade 9">Grade 9 (Secondary Phase I)</option>
                  <option value="Grade 10">
                    Grade 10 (Secondary Phase II)
                  </option>
                  <option value="Grade 11">
                    Grade 11 (Preparatory Phase I)
                  </option>
                  <option value="Grade 12">
                    Grade 12 (Preparatory Phase II)
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3.5 text-[12px] uppercase font-bold tracking-wider rounded-[2px] cursor-pointer hover:bg-[#A51C30] transition-colors"
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: GUARDIAN PARTICULAR DATA */}
      {step === 2 && (
        <form onSubmit={handleNext} className="space-y-6">
          <div className="space-y-4">
            <h3
              style={{ fontFamily: SERIF }}
              className="text-[20px] font-bold text-[#1A1A1A]"
            >
              Primary Guardian Credentials
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label
                  className="text-[12px] font-semibold text-[#3A3530]"
                  style={{ fontFamily: SANS }}
                >
                  Guardian Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Father, Mother, or Legal Representative Name"
                  className="w-full bg-white border border-[#E2DDD7] rounded-[2px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    className="text-[12px] font-semibold text-[#3A3530]"
                    style={{ fontFamily: SANS }}
                  >
                    Primary Telephone *
                  </label>
                  <input
                    required
                    type="tel"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    placeholder="e.g., +251 900 000 000"
                    className="w-full bg-white border border-[#E2DDD7] rounded-[2px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-[12px] font-semibold text-[#3A3530]"
                    style={{ fontFamily: SANS }}
                  >
                    Email Address{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="guardian@domain.com"
                    className="w-full bg-white border border-[#E2DDD7] rounded-[2px] px-4 py-3 text-[14px] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 border border-[#E2DDD7] text-[#716860] px-6 py-3.5 text-[12px] uppercase font-bold tracking-wider rounded-[2px] hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3.5 text-[12px] uppercase font-bold tracking-wider rounded-[2px] hover:bg-[#A51C30] transition-colors"
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: ACADEMIC CREDENTIAL ASSETS */}
      {step === 3 && (
        <form onSubmit={handleNext} className="space-y-6">
          <div className="space-y-4">
            <h3
              style={{ fontFamily: SERIF }}
              className="text-[20px] font-bold text-[#1A1A1A]"
            >
              Official Academic Documentation
            </h3>
            <p
              className="text-[13px] text-[#716860]"
              style={{ fontFamily: SANS }}
            >
              Please append verified digital copies (PDF or Image formats) of
              all legacy performance documents.
            </p>

            <div className="space-y-4 pt-2">
              {/* Transcript File Box */}
              <div className="border border-[#E2DDD7] p-5 bg-white rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4
                    className="text-[14px] font-bold"
                    style={{ fontFamily: SERIF }}
                  >
                    Previous Academic Transcript *
                  </h4>
                  <p
                    className="text-[11px] text-[#716860]"
                    style={{ fontFamily: SANS }}
                  >
                    Complete secondary report file copies showing active term
                    grades.
                  </p>
                  {formData.transcriptFileName && (
                    <span className="text-[12px] text-[#A51C30] font-medium mt-1 block">
                      Selected: {formData.transcriptFileName}
                    </span>
                  )}
                </div>
                <label className="bg-[#F0ECE6] hover:bg-[#E2DDD7] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-[2px] inline-flex items-center gap-2 shrink-0 cursor-pointer transition-colors">
                  <Upload className="h-3.5 w-3.5" /> Attach File
                  <input
                    required
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileSimulate("transcriptFileName", e.target.value)
                    }
                  />
                </label>
              </div>

              {/* Ministry Result File Box */}
              <div className="border border-[#E2DDD7] p-5 bg-white rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4
                    className="text-[14px] font-bold"
                    style={{ fontFamily: SERIF }}
                  >
                    Ministry Result / Elementary Leaving Certificate *
                  </h4>
                  <p
                    className="text-[11px] text-[#716860]"
                    style={{ fontFamily: SANS }}
                  >
                    Official regional administrative leaving exam outcome
                    clearance parameters.
                  </p>
                  {formData.ministryFileName && (
                    <span className="text-[12px] text-[#A51C30] font-medium mt-1 block">
                      Selected: {formData.ministryFileName}
                    </span>
                  )}
                </div>
                <label className="bg-[#F0ECE6] hover:bg-[#E2DDD7] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-[2px] inline-flex items-center gap-2 shrink-0 cursor-pointer transition-colors">
                  <Upload className="h-3.5 w-3.5" /> Attach File
                  <input
                    required
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileSimulate("ministryFileName", e.target.value)
                    }
                  />
                </label>
              </div>

              {/* National Identity Box */}
              <div className="border border-[#E2DDD7] p-5 bg-white rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4
                    className="text-[14px] font-bold"
                    style={{ fontFamily: SERIF }}
                  >
                    Student National Identification Card / Kebele ID *
                  </h4>
                  <p
                    className="text-[11px] text-[#716860]"
                    style={{ fontFamily: SANS }}
                  >
                    Valid identification tracking data issued by regional
                    governance authorities.
                  </p>
                  {formData.nationalIdFileName && (
                    <span className="text-[12px] text-[#A51C30] font-medium mt-1 block">
                      Selected: {formData.nationalIdFileName}
                    </span>
                  )}
                </div>
                <label className="bg-[#F0ECE6] hover:bg-[#E2DDD7] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-[2px] inline-flex items-center gap-2 shrink-0 cursor-pointer transition-colors">
                  <Upload className="h-3.5 w-3.5" /> Attach File
                  <input
                    required
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileSimulate("nationalIdFileName", e.target.value)
                    }
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 border border-[#E2DDD7] text-[#716860] px-6 py-3.5 text-[12px] uppercase font-bold tracking-wider rounded-[2px] hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3.5 text-[12px] uppercase font-bold tracking-wider rounded-[2px] hover:bg-[#A51C30] transition-colors"
            >
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: AUDIT REVIEW & TRANSMIT */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3
              style={{ fontFamily: SERIF }}
              className="text-[20px] font-bold text-[#1A1A1A]"
            >
              Final Ingestion Audit Review
            </h3>
            <p
              className="text-[13px] text-[#716860]"
              style={{ fontFamily: SANS }}
            >
              Verify all structural entry layers before executing secure
              transmission pipelines.
            </p>

            <div
              className="bg-white border border-[#EBE6DF] rounded-[2px] divide-y divide-[#EBE6DF]"
              style={{ fontFamily: SANS }}
            >
              <div className="p-4 grid grid-cols-3 text-[13px]">
                <span className="font-bold text-[#716860]">Student Target</span>
                <span className="col-span-2 text-[#1A1A1A]">
                  {formData.studentName} ({formData.gradeApplying})
                </span>
              </div>
              <div className="p-4 grid grid-cols-3 text-[13px]">
                <span className="font-bold text-[#716860]">Guardian</span>
                <span className="col-span-2 text-[#1A1A1A]">
                  {formData.parentName} ({formData.parentPhone})
                </span>
              </div>
              <div className="p-4 grid grid-cols-3 text-[13px]">
                <span className="font-bold text-[#716860]">Academic Files</span>
                <span className="col-span-2 text-[12px] text-[#A51C30] space-y-1 block font-medium">
                  <span>• {formData.transcriptFileName}</span>
                  <br />
                  <span>• {formData.ministryFileName}</span>
                  <br />
                  <span>• {formData.nationalIdFileName}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 border border-[#E2DDD7] text-[#716860] px-6 py-3.5 text-[12px] uppercase font-bold tracking-wider rounded-[2px] hover:bg-gray-100 disabled:opacity-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={handleSubmitFinal}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-[#A51C30] text-white px-8 py-3.5 text-[12px] uppercase font-bold tracking-widest rounded-[2px] hover:bg-[#1A1A1A] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Transmit Application"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
