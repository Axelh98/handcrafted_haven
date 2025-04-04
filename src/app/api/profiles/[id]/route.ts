// IMPORT DATA QUERIES FETCHING A SINGLE PROFILE
import { fetchProfile } from '@/app/lib/data';

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // CHECK IF CONTENT-TYPE IS APPLICATION/JSON
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  // GET ID PARAMETER FROM URL
  const { id } = req.query;

  // CHECK IF ID PARAMETER IS VALID
  if (typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid ID parameter' }, { status: 400 });
  }

  // FETCH A SINGLE PROFILE
  const data = await fetchProfile(id);

  return NextResponse.json(data);
}