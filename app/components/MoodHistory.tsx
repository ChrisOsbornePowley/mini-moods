'use client';

import { useEffect, useState } from 'react';
import Loader from '@/app/components/Loader';

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
	const [animate, setAnimate] = useState(false);

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
		setAnimate(true);
	}, []);

	if (loading) {
		return <Loader text='Loading moods...' />;
	}

	return (
		<section className='max-w-md mx-auto mt-6 opacity-0 animate-fadeIn'>
			<h2 className='text-xl font-bold mb-4 text-gray-800'>Mood History</h2>
			{error && <div className='text-red-500 font-medium mb-2'>{error}</div>}
			<ul className='flex flex-col gap-4'>
				{moods.map((mood) => (
					<li
						key={mood.id}
						className='flex items-center gap-3 bg-white rounded-xl shadow p-4 border border-gray-100'
					>
						<span className='text-3xl'>{mood.emoji}</span>
						<div className='flex-1'>
							<div className='text-gray-700 font-medium'>
								{mood.comment ? (
									mood.comment
								) : (
									<span className='italic text-gray-400'>No comment</span>
								)}
							</div>
							<div className='text-xs text-gray-400 mt-1'>
								Created: {new Date(mood.createdAt).toLocaleString()}
								{mood.updatedAt && mood.updatedAt !== mood.createdAt && (
									<span className='ml-2'>
										| Updated: {new Date(mood.updatedAt).toLocaleString()}
									</span>
								)}
							</div>
						</div>
					</li>
				))}
			</ul>
			{!loading && moods.length === 0 && !error && (
				<div className='text-gray-400 text-center mt-4'>No moods yet.</div>
			)}
		</section>
	);
};

export default MoodHistory;
