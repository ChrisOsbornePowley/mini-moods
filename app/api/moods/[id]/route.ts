import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const numericId = Number(id);
		if (isNaN(numericId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
		const mood = await prisma.mood.findUnique({ where: { id: numericId } });
		if (!mood) return NextResponse.json({ error: 'Mood not found' }, { status: 404 });
		return NextResponse.json(mood);
	} catch (error) {
		console.error('GET /api/moods/[id] error:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const numericId = Number(id);
		if (isNaN(numericId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
		const { emoji, comment } = await request.json();
		if (!emoji || typeof emoji !== 'string') {
			return NextResponse.json({ error: 'Emoji is required.' }, { status: 400 });
		}
		const mood = await prisma.mood.update({
			where: { id: numericId },
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
		const { id } = await params;
		const numericId = Number(id);
		if (isNaN(numericId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
		await prisma.mood.delete({ where: { id: numericId } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('DELETE /api/moods/[id] error:', error);
		return NextResponse.json({ error: 'Failed to delete mood' }, { status: 500 });
	}
}
