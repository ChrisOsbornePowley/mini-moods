import type { PaginatedMoodsResponse } from '@/app/types';
import { validEmojis } from '@/app/types';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export const fetchEmojiStats = async (sinceNumberOfDays?: number) => {
	const { userId } = await auth();
	if (!userId) {
		//we don't expect this to ever be hit due to the middleware protection, but just to be safe
		throw new Error('User not authenticated');
	}

	const emojiCounts = await prisma.mood.groupBy({
		by: ['emoji'],
		where: {
			userId,
			createdAt: sinceNumberOfDays
				? {
					gte: new Date(Date.now() - sinceNumberOfDays * 24 * 60 * 60 * 1000),
				}
				: undefined,
		},
		_count: { emoji: true },
	});

	const stats: Record<string, number> = {};
	validEmojis.forEach((emoji) => {
		const found = emojiCounts.find((e) => e.emoji === emoji);
		//esure all emojis are present, even if count is 0
		stats[emoji] = found ? found._count.emoji : 0;
	});

	return stats;
};

export const fetchMoods = async (
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