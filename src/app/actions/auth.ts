import { SignupFormSchema, FormState, LoginFormSchema, LoginFormState } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import { supabase } from '@/app/lib/supabaseClient';
import { redirect } from 'next/dist/server/api-utils';

import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
})







export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
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
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  if (!data || data.length === 0) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  const user = data[0];

  // Create a session for the user
  await createSession(user.id);

  // REDIRECT TO HOME PAGE
  redirect('/pages');

}

