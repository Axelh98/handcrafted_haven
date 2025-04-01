import { NextRequest, NextResponse } from 'next/server';
import { signup } from '@/app/actions/auth';

export async function POST(req: NextRequest) {
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  const body = await req.json();
  const formData = new FormData();
  Object.keys(body).forEach(key => formData.append(key, body[key]));

  // Llama a la función de registro y pasa los datos del formulario
  const result = await signup({}, formData);

  if (result.errors) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  if (result.message) {
    return NextResponse.json({ message: result.message }, { status: 500 });
  }

  return NextResponse.json({
    message: 'Account created successfully!',
    user: result.user,
  }, { status: 200 });
}
