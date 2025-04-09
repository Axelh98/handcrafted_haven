import { NextResponse } from 'next/server';
import { Product } from '@/app/lib/definitions';
import { createProduct, fetchProducts } from '@/app/lib/data';

// Función para obtener todos los productos
export async function GET() {
  try {
    const products: Product[] = await fetchProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
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

