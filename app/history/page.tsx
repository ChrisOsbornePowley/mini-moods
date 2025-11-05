import MoodHistory from '@/app/components/history/MoodHistory';
import EmojiStats from '@/app/components/history/EmojiStats';
import { fetchMoods, fetchEmojiStats } from './functions';
import styles from './page.module.css';

type HistoryPageProps = {
	searchParams: Promise<{ page?: string; limit?: string }>;
};

const HistoryPage = async ({ searchParams }: HistoryPageProps) => {
	const { page: pageParam, limit: limitParam } = await searchParams;
	const page = parseInt(pageParam || '1', 10);
	const limit = parseInt(limitParam || '5', 10);

	const { data: moods, pagination } = await fetchMoods(page, limit);
	const allTimeStats = await fetchEmojiStats();
	const sevenDaysStats = await fetchEmojiStats(7);

	return (
		<>
			<MoodHistory moods={moods} pagination={pagination} />
			<div className={styles.stats}>
				<EmojiStats stats={allTimeStats} timeRange='All Time' />
				<EmojiStats stats={sevenDaysStats} timeRange='Last 7 Days' />
			</div>
		</>
	);
};

export default HistoryPage;
