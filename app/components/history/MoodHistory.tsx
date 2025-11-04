import MoodItem from './MoodItem';
import Paginator from '@/app/components/common/Paginator';
import styles from './MoodHistory.module.css';
import type { MoodRecord, PaginationInfo } from '@/app/types';

type MoodHistoryProps = {
	moods: MoodRecord[];
	pagination?: PaginationInfo;
};

const MoodHistory = ({ moods, pagination }: MoodHistoryProps) => {
	return (
		<section className={styles.container}>
			<ul className={styles.list}>
				{moods.map((mood) => (
					<MoodItem key={mood.id} mood={mood} />
				))}
			</ul>
			{moods.length === 0 && <div>No moods yet.</div>}
			{pagination && <Paginator pagination={pagination} />}
		</section>
	);
};

export default MoodHistory;
