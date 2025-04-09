import { NextRequest, NextResponse } from 'next/server';
import { fetchBestRatedProducts } from '@/app/lib/data';
import { ProductForCard } from '@/app/lib/definitions';

export async function GET(req: NextRequest) {
	if (req.headers.get('content-type') !== 'application/json') {
		return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
	}

	const { searchParams } = new URL(req.url);

	const qty = parseInt(searchParams.get('qty')!);
	const profile = searchParams.get('profile') || '';

	const data: ProductForCard[] = await fetchBestRatedProducts(qty || 0, profile);

	return NextResponse.json(data);
}
