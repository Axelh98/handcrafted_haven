import LoginForm from '@/app/ui/login/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login'
};

export default function Page() {
	return <LoginForm />;
}
