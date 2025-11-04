import MoodPicker from '@/app/components/add/MoodPicker';
import type { MoodRecord } from '@/app/types';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

//this is a server component, so we can just fetch the data directly
const fetchMood = async (id: string): Promise<MoodRecord | null> => {
	try {
		const { userId } = await auth();

		if (!userId) {
			throw new Error('User not authenticated');
		}
		//and then get the paginated moods for the current user on the current page
		const mood = await prisma.mood.findFirst({
			where: { id, userId },
		});

		if (!mood) {
			return null;
		}

		return mood;
	} catch (error) {
		console.error('Error fetching moods:', error);
		return null;
	}
};
const HistoryItemPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const resolvedParams = await params;
	const mood = await fetchMood(resolvedParams.id);

	if (!mood) {
		notFound();
	}

	return <MoodPicker initialMood={mood} mode='edit' />;
};

export default HistoryItemPage;
