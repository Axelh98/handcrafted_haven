import { NextRequest, NextResponse } from 'next/server';
import { fetchReviewsByProductPages } from '@/app/lib/data';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	if (req.headers.get('content-type') !== 'application/json') {
		return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 400 });
	}

	const { id } = await params;

	const data = await fetchReviewsByProductPages(id);

	return NextResponse.json(data);
}
