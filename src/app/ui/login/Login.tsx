'use client';

import { signIn } from 'next-auth/react';
import './Login.css';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className='login__container'>
      <form className='login' onSubmit={handleSubmit}>
        <h1>Sign in to your account</h1>
        <h2>Don't have an account? <span><a href="/pages/signUp">Sign up</a></span></h2>

        {error && <p className='error'>{error}</p>}

        <div className='login__field'>
          <label htmlFor="email">Email</label>
          <input className='login__input' id="email" name="email" placeholder="Email" required />
        </div>

        <div className='login__field'>
          <label htmlFor="password">Password</label>
          <input className='login__input' id="password" name="password" type="password" required />
        </div>

        <button type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}