// import { SignupFormSchema, FormState } from '@/app/lib/definitions';
// import bcrypt from 'bcryptjs';
// import { supabase } from '@/app/lib/supabaseClient';

// export async function signup(state: FormState, formData: FormData) {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // Prepare data for insertion into database
//   const { name, email, password } = validatedFields.data;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Insert the user into the database
//   const { data, error } = await supabase
//     .from('users')
//     .insert([{ name, email, password: hashedPassword }]);

//   if (error) {
//     return {
//       message: 'An error occurred while creating your account.',
//     };
//   }

//   if (!data || data.length === 0) {
//     return {
//       message: 'An error occurred while creating your account.',
//     };
//   }

//   const user = data[0];

//   return {
//     message: 'Account created successfully!',
//     user,
//   };
// }


import { SignupFormSchema, FormState } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import { supabase } from '@/app/lib/supabaseClient';

interface User {
  name: string;
  email: string;
  password: string;
}

export async function signup(state: FormState, formData: FormData): Promise<{ message: string; user?: User }> {
  // Validate form fields
const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
if (!validatedFields.success) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // Prepare data for insertion into database
const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
const { data: users = [], error } = await supabase
    .from('users')
    .insert([{ name, email, password: hashedPassword }]);

  if (error) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // Check if `data` is undefined or an empty array
if (!users || users.length === 0) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  const user = users[0];

  return {
    message: 'Account created successfully!',
    user,
  };
}
