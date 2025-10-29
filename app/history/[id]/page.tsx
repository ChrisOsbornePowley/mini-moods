import MoodPicker from '@/app/components/MoodPicker';
import type { MoodRecord } from '@/app/types';
import { headers } from 'next/headers';

const fetchMood = async (id: string): Promise<MoodRecord | null> => {
	const headersList = await headers();
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const res = await fetch(`${baseUrl}/api/moods/${id}`, {
		headers: {
			// Forward the authentication cookies and headers so the API can know the user
			cookie: headersList.get('cookie') || '',
			authorization: headersList.get('authorization') || '',
			'user-agent': headersList.get('user-agent') || '',
			'x-forwarded-for': headersList.get('x-forwarded-for') || '',
			'x-forwarded-proto': headersList.get('x-forwarded-proto') || '',
		},
	});
	if (!res.ok) return null;
	return res.json();
};

const HistoryItemPage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const resolvedParams = await params;
	const mood = await fetchMood(resolvedParams.id);
	if (!mood) return <div>Mood not found</div>;
	return <MoodPicker initialMood={mood} mode='edit' />;
};

export default HistoryItemPage;
