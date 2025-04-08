import { NextResponse } from 'next/server';
import { Product } from '@/app/lib/definitions';
import { fetchProductById, updateProduct, deleteProduct } from '@/app/lib/data';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtener el ID de la URL
    if (!id) {
      return NextResponse.json({ error: 'No product ID provided.' }, { status: 400 });
    }
    const product = await fetchProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product.' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updatedProduct: Product = await req.json();
    await updateProduct(updatedProduct); // Actualizar el producto en la base de datos
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtener el ID de la URL
    if (!id) {
      return NextResponse.json({ error: 'No product ID provided.' }, { status: 400 });
    }
    await deleteProduct(id);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}
