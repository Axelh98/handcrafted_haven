import { NextResponse } from 'next/server';
import { Product } from '@/app/lib/definitions';
import { createProduct, fetchProducts, fetchProductsByUserId } from '@/app/lib/data';


// GET /api/products or /api/products?userId=123
export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  try {
    if (userId) {
      const products = await fetchProductsByUserId(userId);
      return NextResponse.json(products, { status: 200 });
    } else {
      const products = await fetchProducts();
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newProduct: Product = await req.json();
    await createProduct(newProduct); // Insertar el producto en la base de datos
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product.' }, { status: 500 });
  }
}

