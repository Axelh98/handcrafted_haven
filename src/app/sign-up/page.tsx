import SignupForm from '@/app/ui/singup/SingUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign Up'
};

export default function Page() {
	return <SignupForm />;
}
