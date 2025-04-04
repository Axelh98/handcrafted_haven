// IMPORT DATA QUERIES FETCHING ALL PROFILES
import { fetchProfiles } from '@/app/lib/data';

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // CHECK IF CONTENT-TYPE IS APPLICATION/JSON
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  // FETCH ALL PROFILES
  const data = await fetchProfiles();

  return NextResponse.json(data);
}