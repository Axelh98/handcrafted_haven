import { NextRequest, NextResponse } from 'next/server';

import { fetchProducts, createProduct } from '@/app/lib/data';



// FUNCTION FOR FETCHING ALL PRODUCTS
// FUNCTION FOR FETCHING ALL PRODUCTS
export async function GET(req: NextRequest) {
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  const data = await fetchProducts();

  return NextResponse.json(data);
}

export const config = {
  api: {
    bodyParser: true
  }
};

export async function POST(req: NextRequest) {
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  const productData = await req.json();

  // Asignar un valor por defecto a image_url si no se proporciona
  productData.image_url = productData.image_url || '';

  try {
    const newProduct = await createProduct(productData);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to create product.', error: error.message }, { status: 500 });
  }
}

