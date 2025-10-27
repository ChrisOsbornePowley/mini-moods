import MoodHistory from '@/app/components/MoodHistory';
import type { MoodRecord } from '@/app/types';

const fetchMoods = async (): Promise<MoodRecord[]> => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const res = await fetch(`${baseUrl}/api/moods`);
	if (!res.ok) return [];
	return res.json();
};

const HistoryPage = async () => {
	const moods = await fetchMoods();
	return <MoodHistory moods={moods} />;
};

export default HistoryPage;
