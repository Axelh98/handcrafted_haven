// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { Category } from '@/app/lib/definitions';
import { fetchCategories } from '@/app/lib/data';

export async function GET() {
  try {
    const categories: Category[] = await fetchCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories.' }, { status: 500 });
  }
}
