import MoodPicker from '@/app/components/MoodPicker';
import type { MoodRecord } from '@/app/types';

const fetchMood = async (id: string): Promise<MoodRecord | null> => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const res = await fetch(`${baseUrl}/api/moods/${id}`);
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
