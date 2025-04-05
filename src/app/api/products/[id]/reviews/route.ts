import { fetchReviewsByProduct } from '@/app/lib/data';

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	if (req.headers.get('content-type') !== 'application/json') {
		return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
	}

	const { id } = await params;

	if (typeof id !== 'string') {
		return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
	}

	const data = await fetchReviewsByProduct(id);

	return NextResponse.json(data);
}
