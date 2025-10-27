import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//GET - list all moods with pagination
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get('page') || '1', 10);
		const limit = parseInt(searchParams.get('limit') || '10', 10);

		// Validate pagination parameters
		if (page < 1) {
			return NextResponse.json({ error: 'Page must be greater than 0' }, { status: 400 });
		}
		if (limit < 1 || limit > 100) {
			return NextResponse.json({ error: 'Limit must be between 1 and 100' }, { status: 400 });
		}

		const skip = (page - 1) * limit;

		// Get total count for pagination metadata
		const totalCount = await prisma.mood.count();
		const totalPages = Math.ceil(totalCount / limit);

		// Get paginated moods
		const moods = await prisma.mood.findMany({
			orderBy: { createdAt: "desc" },
			skip,
			take: limit,
		});

		return NextResponse.json({
			data: moods,
			pagination: {
				currentPage: page,
				totalPages,
				totalCount,
				limit,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		});
	} catch (error) {
		console.error('GET /api/moods error:', error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}

//POST - create a new mood
export async function POST(request: Request) {
	try {
		const { emoji, comment } = await request.json();

		if (!emoji || typeof emoji !== 'string') {
			return NextResponse.json({ error: 'Emoji is required.' }, { status: 400 });
		}

		const mood = await prisma.mood.create({
			data: {
				emoji,
				comment,
			},
		});

		return NextResponse.json(mood, { status: 201 });
	} catch (e) {
		console.error('POST /api/moods error:', e);
		return NextResponse.json({ error: 'Failed to create mood' }, { status: 500 });
	}
}