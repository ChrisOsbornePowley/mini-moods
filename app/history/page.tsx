import MoodHistory from '@/app/components/MoodHistory';
import type { PaginatedMoodsResponse } from '@/app/types';

type HistoryPageProps = {
	searchParams: Promise<{ page?: string; limit?: string }>;
};

const fetchMoods = async (
	page: number = 1,
	limit: number = 10
): Promise<PaginatedMoodsResponse> => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
	const res = await fetch(`${baseUrl}/api/moods?page=${page}&limit=${limit}`, {
		cache: 'no-store', // Ensure we get fresh data on each page load
	});

	if (!res.ok) {
		return {
			data: [],
			pagination: {
				currentPage: 1,
				totalPages: 1,
				totalCount: 0,
				limit: 10,
				hasNextPage: false,
				hasPreviousPage: false,
			},
		};
	}

	return res.json();
};

const HistoryPage = async ({ searchParams }: HistoryPageProps) => {
	const { page: pageParam, limit: limitParam } = await searchParams;
	const page = parseInt(pageParam || '1', 10);
	const limit = parseInt(limitParam || '10', 10);

	const { data: moods, pagination } = await fetchMoods(page, limit);

	return <MoodHistory moods={moods} pagination={pagination} />;
};

export default HistoryPage;
