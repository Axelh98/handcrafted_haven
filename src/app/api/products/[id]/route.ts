import { NextRequest, NextResponse } from 'next/server';
import { fetchProduct } from '@/app/lib/data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
  }

  try {
    const data = await fetchProduct(id); 
    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}
