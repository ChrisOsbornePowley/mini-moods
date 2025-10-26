import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//GET - list all moods
export async function GET() {
	try {
		const moods = await prisma.mood.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(moods);
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