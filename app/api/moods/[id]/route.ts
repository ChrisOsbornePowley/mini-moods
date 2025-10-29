import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { userId } = await auth();

		console.log('user id in specific route', userId);

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;

		if (!id || typeof id !== 'string') {
			return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
		}

		const mood = await prisma.mood.findFirst({
			where: {
				id: id,
				userId
			}
		});

		if (!mood) return NextResponse.json({ error: 'Mood not found' }, { status: 404 });
		return NextResponse.json(mood);
	} catch (error) {
		console.error('GET /api/moods/[id] error:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;

		// No need to convert to number anymore since id is now a string (CUID)
		if (!id || typeof id !== 'string') {
			return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
		}

		const { emoji, comment } = await request.json();
		if (!emoji || typeof emoji !== 'string') {
			return NextResponse.json({ error: 'Emoji is required.' }, { status: 400 });
		}

		// First check if the mood exists and belongs to the user
		const existingMood = await prisma.mood.findFirst({
			where: {
				id: id,
				userId
			}
		});

		if (!existingMood) {
			return NextResponse.json({ error: 'Mood not found' }, { status: 404 });
		}

		const mood = await prisma.mood.update({
			where: { id: id },
			data: { emoji, comment },
		});

		return NextResponse.json(mood);
	} catch (error) {
		console.error('PUT /api/moods/[id] error:', error);
		return NextResponse.json({ error: 'Failed to update mood' }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;

		// No need to convert to number anymore since id is now a string (CUID)
		if (!id || typeof id !== 'string') {
			return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
		}

		// First check if the mood exists and belongs to the user
		const existingMood = await prisma.mood.findFirst({
			where: {
				id: id,
				userId
			}
		});

		if (!existingMood) {
			return NextResponse.json({ error: 'Mood not found' }, { status: 404 });
		}

		await prisma.mood.delete({ where: { id: id } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('DELETE /api/moods/[id] error:', error);
		return NextResponse.json({ error: 'Failed to delete mood' }, { status: 500 });
	}
}
