import { NextRequest, NextResponse } from 'next/server';
import { fetchReviewsByProductPaginated } from '@/app/lib/data';

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string; iteration: number }> }
) {
	if (req.headers.get('content-type') !== 'application/json') {
		return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
	}

	const { id, iteration } = await params;

	const data = await fetchReviewsByProductPaginated(id, iteration);

	return NextResponse.json(data);
}
