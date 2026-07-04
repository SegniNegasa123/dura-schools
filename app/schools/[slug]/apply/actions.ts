"use server";

import { db } from "@/lib/db/drizzle";
import { applications } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export async function submitApplicationAction(
  formData: FormData,
  schoolId: string,
  schoolSlug: string,
) {
  const studentName = formData.get("studentName") as string;
  const gradeApplying = formData.get("gradeApplying") as string;
  const parentName = formData.get("parentName") as string;
  const parentPhone = formData.get("parentPhone") as string;
  const parentEmail = formData.get("parentEmail") as string;

  // Structural boundary validations
  if (!studentName || !gradeApplying || !parentName || !parentPhone) {
    throw new Error("Missing mandatory application parameters.");
  }

  try {
    // Ingest payload parameters straight into the schema database structure
    await db.insert(applications).values({
      schoolId: schoolId,
      studentName,
      gradeApplying,
      parentName,
      parentPhone,
      parentEmail: parentEmail || null,
      status: "pending",
    });
  } catch (error) {
    console.error("Application insertion pipeline failed:", error);
    throw new Error("Database transaction rejected.");
  }

  // Route to structural success confirmation state layout
  redirect(`/schools/${schoolSlug}`);
}
