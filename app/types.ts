export const validEmojis = ['😁', '🙂', '🫤', '😞', '😩'] as const;
export type ValidEmoji = typeof validEmojis[number];

export type MoodRecord = {
	id: string;
	emoji: string;
	comment?: string | null;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};

export type PaginationInfo = {
	currentPage: number;
	totalPages: number;
	totalCount: number;
	limit: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export type PaginatedMoodsResponse = {
	data: MoodRecord[];
	pagination: PaginationInfo;
};
