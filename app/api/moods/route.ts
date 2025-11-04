import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { validEmojis } from '@/app/types';

//POST - create a new mood
export async function POST(request: Request) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { emoji, comment } = await request.json();

		if (!emoji || !validEmojis.includes(emoji)) {
			return NextResponse.json({ error: 'Emoji is required.' }, { status: 400 });
		}

		const mood = await prisma.mood.create({
			data: {
				emoji,
				comment,
				userId,
			},
		});

		return NextResponse.json(mood, { status: 201 });
	} catch (e) {
		console.error('POST /api/moods error:', e);
		return NextResponse.json({ error: 'Failed to create mood' }, { status: 500 });
	}
}