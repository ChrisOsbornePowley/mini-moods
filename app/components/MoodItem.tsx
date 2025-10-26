import styles from './MoodItem.module.css';

type MoodItem = {
	id: number;
	emoji: string;
	comment?: string | null;
	createdAt: string;
	updatedAt: string;
};

export default function MoodItem({ mood }: { mood: MoodItem }) {
	return (
		<li className={styles.item}>
			<span className={styles.emoji}>{mood.emoji}</span>
			<div className={styles.details}>
				<span>{mood.comment || 'No comment'}</span>
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
