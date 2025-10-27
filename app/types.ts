export type MoodRecord = {
	id: number;
	emoji: string;
	comment?: string | null;
	createdAt: string;
	updatedAt: string;
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
