import MoodHistory from '@/app/components/history/MoodHistory';
import type { PaginatedMoodsResponse } from '@/app/types';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

type HistoryPageProps = {
	searchParams: Promise<{ page?: string; limit?: string }>;
};

//this is a server component, so we can just fetch the data directly rather than using an API route
const fetchMoods = async (
	page: number = 1,
	limit: number = 5
): Promise<PaginatedMoodsResponse> => {
	try {
		const { userId } = await auth();

		if (!userId) {
			//we don't expect this to ever be hit due to the middleware protection, but just to be safe
			throw new Error('User not authenticated');
		}

		//ensure pagination parameters are valid
		if (page < 1) page = 1;
		if (limit < 1 || limit > 100) limit = 5;

		const skip = (page - 1) * limit;

		//get total count for pagination metadata so we know how many pages there are
		const totalCount = await prisma.mood.count({
			where: { userId },
		});
		const totalPages = Math.ceil(totalCount / limit);

		//and then get the paginated moods for the current user on the current page
		const moods = await prisma.mood.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
			skip,
			take: limit,
		});

		return {
			data: moods,
			pagination: {
				currentPage: page,
				totalPages,
				totalCount,
				limit,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		};
	} catch (error) {
		console.error('Error fetching moods:', error);
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
};

const HistoryPage = async ({ searchParams }: HistoryPageProps) => {
	const { page: pageParam, limit: limitParam } = await searchParams;
	const page = parseInt(pageParam || '1', 10);
	const limit = parseInt(limitParam || '5', 10);

	const { data: moods, pagination } = await fetchMoods(page, limit);

	return <MoodHistory moods={moods} pagination={pagination} />;
};

export default HistoryPage;
