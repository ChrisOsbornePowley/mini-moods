'use client';

import { useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';
import MoodItem from './MoodItem';
import styles from './MoodHistory.module.css';

type Mood = {
	id: number;
	emoji: string;
	comment?: string | null;
	createdAt: string;
	updatedAt: string;
};

const MoodHistory = () => {
	const [moods, setMoods] = useState<Mood[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMoods() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch('/api/moods');
				if (!res.ok) throw new Error('Failed to fetch moods');
				const data = await res.json();
				setMoods(data);
			} catch (e: unknown) {
				if (e instanceof Error) {
					setError(e.message);
				} else {
					setError('Error fetching moods');
				}
			}
			setLoading(false);
		}
		fetchMoods();
	}, []);

	if (loading) {
		return <Loader text='Loading moods...' />;
	}

	return (
		<section className={styles.container}>
			{error && <div className={styles.error}>{error}</div>}
			<ul className={styles.list}>
				{moods.map((mood) => (
					<MoodItem key={mood.id} mood={mood} />
				))}
			</ul>
			{!loading && moods.length === 0 && !error && <div>No moods yet.</div>}
		</section>
	);
};

export default MoodHistory;
