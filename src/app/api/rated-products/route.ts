import { NextRequest, NextResponse } from 'next/server';
import { fetchBestRatedProducts } from '@/app/lib/data';

export async function GET(req: NextRequest) {
	if (req.headers.get('content-type') !== 'application/json') {
		return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
	}

	const data = await fetchBestRatedProducts();

	return NextResponse.json(data);
}
