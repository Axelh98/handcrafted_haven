import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/app/lib/data';


// FUNCTION FOR FETCHING ALL PRODUCTS
// FUNCTION FOR FETCHING ALL PRODUCTS
export async function GET(req: NextRequest) {
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  const data = await fetchProducts();

  return NextResponse.json(data);
}

// FUNCTION FOR CREATING A PRODUCT
// FUNCTION FOR CREATING A PRODUCT