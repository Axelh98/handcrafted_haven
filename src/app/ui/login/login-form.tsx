'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (res?.ok) {
        router.push('/');
      } else {
        setMessage('Invalid email or password.');
        console.error('Login failed:', res);
      }
    } catch (err) {
      setLoading(false);
      setMessage('An unexpected error occurred.');
      console.error('Unexpected error during login:', err);
    }
  };

  return (
    <div className="login__container">
      <form onSubmit={handleSubmit} className="login">
        <h1 className="login__title">Welcome</h1>
        <h2 className="login__subtitle">Sign in to continue</h2>

        <div className="login__field">
          <label htmlFor="email">Email</label>
          <input
            className="login__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login__field">
          <label htmlFor="password">Password</label>
          <input
            className="login__input"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="login__toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button className="login__button" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {message && <p className="login__message">{message}</p>}

        <p className="login__link">
          Don't have an account?{' '}
          <span onClick={() => router.push('/sign-up')}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
