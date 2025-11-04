import styles from './EmojiStats.module.css';

type EmojiStatsProps = {
	timeRange: string;
	stats: Record<string, number>;
};

const EmojiStats = ({ stats, timeRange }: EmojiStatsProps) => (
	<div className={styles.container}>
		<h3 className={styles.heading}>Moods Recorded ({timeRange})</h3>
		<ul className={styles.list}>
			{Object.entries(stats).map(([emoji, count]) => (
				<li key={emoji} className={styles.item}>
					<span className={styles.emoji}>{emoji}</span>
					<span className={styles.count}>{count}</span>
				</li>
			))}
		</ul>
	</div>
);

export default EmojiStats;
