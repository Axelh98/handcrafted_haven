import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/authOptions'; // ajusta el path si es necesario

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
