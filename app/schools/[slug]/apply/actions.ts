'use server';

import { createClient } from '@/utils/supabase/server';

export interface ApplicationFormState {
  success: boolean;
  error?: string;
}

export async function submitApplication(
  schoolSlug: string,
  prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  const supabase = await createClient();

  // Look up the school by slug to get its ID
  const { data: school, error: schoolError } = await supabase
    .from('schools')
    .select('id')
    .eq('slug', schoolSlug)
    .single();

  if (schoolError || !school) {
    return { success: false, error: 'We could not find this school. Please try again.' };
  }

  const applicant_name = formData.get('applicant_name') as string;
  const applicant_dob = formData.get('applicant_dob') as string;
  const applicant_gender = formData.get('applicant_gender') as string;
  const grade_applying_for = formData.get('grade_applying_for') as string;
  const parent_name = formData.get('parent_name') as string;
  const parent_phone = formData.get('parent_phone') as string;
  const parent_email = formData.get('parent_email') as string;
  const previous_school = formData.get('previous_school') as string;
  const address = formData.get('address') as string;
  const notes = formData.get('notes') as string;

  if (!applicant_name || !grade_applying_for || !parent_name || !parent_phone) {
    return { success: false, error: 'Please complete all required fields before submitting.' };
  }

  const { error: insertError } = await supabase.from('applications').insert({
    school_id: school.id,
    applicant_name,
    applicant_dob: applicant_dob || null,
    applicant_gender: applicant_gender || null,
    grade_applying_for,
    parent_name,
    parent_phone,
    parent_email: parent_email || null,
    previous_school: previous_school || null,
    address: address || null,
    notes: notes || null,
    status: 'pending',
  });

  if (insertError) {
    return { success: false, error: 'Something went wrong submitting your application. Please try again.' };
  }

  return { success: true };
}