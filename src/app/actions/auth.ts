import { SignupFormSchema, FormState, LoginFormSchema } from '@/app/lib/definitions';
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


export async function login(formData: FormData) {
  try {
    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validatedFields.data;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        message: 'An error occurred while logging in.',
      };
    }

    if (!data) {
      return {
        success: false,
        message: 'User not found.',
      };
    }

    const user = data;
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password.',
      };
    }

    return {
      success: true,
      message: 'Login successful!',
      user,
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
