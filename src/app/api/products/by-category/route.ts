import { NextRequest, NextResponse } from 'next/server';
import { fetchProductByCategory } from '@/app/lib/data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');

  if (!categoryId) {
    return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
  }

  try {
    const data = await fetchProductByCategory(categoryId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to fetch products by category' }, { status: 500 });
  }
}
