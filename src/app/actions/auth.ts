import { SignupFormSchema, FormState } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import { supabase } from '@/app/lib/supabaseClient';

export async function signup(state: FormState, formData: FormData) {
  try {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Prepare data for insertion into database
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }]);

    if (error) {
      console.error('Supabase error:', error);
      return {
        message: 'An error occurred while creating your account.',
      };
    }

    // Ensure TypeScript knows data is an array
    if (!data || (data as any[]).length === 0) {
      console.error('No data returned from Supabase.');
      return {
        message: 'An error occurred while creating your account.',
      };
    }

    const user = data[0];

    return {
      message: 'Account created successfully!',
      user,
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

