'use client';

import { signup } from '@/app/actions/auth';
import { useFormState } from 'react-dom';

import './SignUp.css';

export default function SignupForm() {
  const [state, action, pending] = useFormState(signup, undefined);

  return (
    <div className='signup__container'>
      <form className='signup' action={action}>
        <h1>Create an account</h1>
        <h2>Already have an account? <span><a href="pages/auth">Sign in</a></span></h2>

        <div className='signup__field'>
          <label htmlFor="name">Name</label>
          <input className='signup__input' type='text' id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div className='signup__field'>
          <label htmlFor="email">Email</label>
          <input className='signup__input' id="email" name="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div className='signup__field'>
          <label htmlFor="password">Password</label>
          <input className='signup__input' id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button disabled={pending} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}