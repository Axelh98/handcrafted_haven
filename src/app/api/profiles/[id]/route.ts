// /app/api/seller-profile/route.ts
import { fetchSellerProfile } from '@/app/lib/data';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Verifica que el content-type sea application/json
  if (req.headers.get('content-type') !== 'application/json') {
    return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
  }

  // Obtener el parámetro ID de la URL
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  // Verificar si el ID es válido
  if (!id) {
    return NextResponse.json({ message: 'Invalid ID parameter' }, { status: 400 });
  }

  try {
    // Intentar obtener el perfil del vendedor
    const data = await fetchSellerProfile(id);
    if (!data) {
      return NextResponse.json({ message: 'Seller profile not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching seller profile:", error);
    return NextResponse.json({ message: 'Failed to fetch seller profile' }, { status: 500 });
  }
}
