import Link from 'next/link';
import styles from './MoodItem.module.css';
import type { MoodRecord } from '@/app/types';

export default function MoodItem({ mood }: { mood: MoodRecord }) {
	return (
		<li className={styles.item}>
			<Link href={`/history/${mood.id}`} className={styles.emoji}>
				{mood.emoji}
			</Link>
			<div className={styles.details}>
				<span>{mood.comment}</span>
				<div className={styles.meta}>
					Created: {new Date(mood.createdAt).toLocaleString()}
					{mood.updatedAt && mood.updatedAt !== mood.createdAt && (
						<span className={styles.updated}>
							| Updated: {new Date(mood.updatedAt).toLocaleString()}
						</span>
					)}
				</div>
			</div>
		</li>
	);
}
