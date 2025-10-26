'use client';

import { useState } from 'react';
import Emoji from '@/app/components/Emoji';

const moods = ['😁', '🙂', '🫤', '😞', '😩'];

const MoodPicker = ({ onSuccess }: { onSuccess?: () => void }) => {
	const [emoji, setEmoji] = useState('');
	const [comment, setComment] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (loading) return;

		if (!emoji) {
			setError('Please select an emoji');
			return;
		}

		setLoading(true);
		setError(null);

		const res = await fetch('/api/moods', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ emoji, comment }),
		});

		console.log(res);

		if (res.ok) {
			setEmoji('');
			setComment('');
			if (onSuccess) onSuccess(); //likely notify parent or redirect out
		} else {
			const data = await res.json();
			setError(data.error || 'Failed to add mood.');
		}
		setLoading(false);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-4 mb-6 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto border border-gray-100'
		>
			<label className='font-medium text-gray-700'>
				Choose a mood emoji: <span className='text-red-500'>* </span>
				<div className='flex gap-3 mt-2'>
					{moods.map((mood) => (
						<Emoji
							key={mood}
							emoji={mood}
							selected={emoji === mood}
							onClick={() => setEmoji(mood)}
						/>
					))}
				</div>
			</label>

			<label className='font-medium text-gray-700'>
				And add a comment for today:
				<input
					type='text'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className='border border-gray-300 rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150'
					placeholder='Optional comment'
				/>
			</label>

			<button
				type='submit'
				disabled={loading}
				className={`bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition-all duration-150 ${
					loading ? 'opacity-60 cursor-not-allowed' : ''
				}`}
			>
				{loading ? 'Adding...' : 'Add Mood'}
			</button>

			{error && <div className='text-red-500 font-medium mt-2'> {error} </div>}
		</form>
	);
};

export default MoodPicker;
