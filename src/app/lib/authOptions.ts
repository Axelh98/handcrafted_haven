import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/app/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Missing email or password');
				}

				const { email, password } = credentials;

				const { data: user, error } = await supabase
					.from('users')
					.select('*')
					.eq('email', email)
					.single();

				if (error || !user) {
					console.error('Error fetching user from Supabase:', error);
					throw new Error('User not found');
				}

				const isPasswordValid = await bcrypt.compare(password, user.password);

				if (!isPasswordValid) {
					throw new Error('Invalid email or password');
				}

				return {
					id: user.id,
					name: user.name,
					email: user.email
				};
			}
		})
	],
	pages: {
		signIn: '/login',
		newUser: '/'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			if (url.startsWith(baseUrl)) {
				return url;
			}

			return baseUrl;
		}
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
};
