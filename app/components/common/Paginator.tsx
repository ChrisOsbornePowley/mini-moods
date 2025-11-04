'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from './Button';
import styles from './Paginator.module.css';
import type { PaginationInfo } from '@/app/types';

type PaginatorProps = {
	pagination: PaginationInfo;
};

const Paginator = ({ pagination }: PaginatorProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { currentPage, totalPages, hasNextPage, hasPreviousPage, totalCount } =
		pagination;

	const createPageUrl = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		return `?${params.toString()}`;
	};

	const handlePageChange = (page: number) => {
		router.push(createPageUrl(page));
	};

	if (totalPages <= 1) return null;

	return (
		<div className={styles.container}>
			<div>
				Showing page {currentPage} of {totalPages} ({totalCount} total moods)
			</div>

			<div className={styles.controls}>
				<Button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!hasPreviousPage}
				>
					← Previous
				</Button>

				<div className={styles.pageNumbers}>
					{Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
						const page =
							Math.max(1, Math.min(totalPages - 2, currentPage - 1)) + i;
						if (page > totalPages) return null;

						const isCurrentPage = page === currentPage;

						return (
							<Button
								key={page}
								onClick={() => handlePageChange(page)}
								className={isCurrentPage ? styles.activePage : ''}
							>
								{page}
							</Button>
						);
					})}
				</div>

				<Button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!hasNextPage}
				>
					Next →
				</Button>
			</div>
		</div>
	);
};

export default Paginator;
