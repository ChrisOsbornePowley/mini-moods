import MoodItem from './MoodItem';
import styles from './MoodHistory.module.css';
import type { MoodRecord } from '@/app/types';

type MoodHistoryProps = {
	moods: MoodRecord[];
};

const MoodHistory = ({ moods }: MoodHistoryProps) => {
	return (
		<section className={styles.container}>
			<ul className={styles.list}>
				{moods.map((mood) => (
					<MoodItem key={mood.id} mood={mood} />
				))}
			</ul>
			{moods.length === 0 && <div>No moods yet.</div>}
		</section>
	);
};

export default MoodHistory;
