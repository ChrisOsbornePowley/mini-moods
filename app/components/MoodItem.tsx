import Link from 'next/link';
import styles from './MoodItem.module.css';
import type { MoodRecord } from '@/app/types';

const formatDate = (date: Date) => {
	return date.toLocaleDateString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	});
};

export default function MoodItem({ mood }: { mood: MoodRecord }) {
	return (
		<li className={styles.item}>
			<Link href={`/history/${mood.id}`} className={styles.emoji}>
				{mood.emoji}
			</Link>
			<div className={styles.details}>
				<span>{mood.comment}</span>
				<div className={styles.meta}>
					Created: {formatDate(mood.createdAt)}
					{mood.updatedAt &&
						mood.updatedAt.getTime() !== mood.createdAt.getTime() && (
							<span className={styles.updated}>
								| Updated: {formatDate(mood.updatedAt)}
							</span>
						)}
				</div>
			</div>
		</li>
	);
}
