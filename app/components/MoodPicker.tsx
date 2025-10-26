'use client';

import { useState } from 'react';
import Emoji from '@/app/components/Emoji';
import Button from './Button';
import styles from './MoodPicker.module.css';

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
		<form onSubmit={handleSubmit} className={styles.form}>
			<div>
				<label>
					Choose a mood emoji: <span className={styles.required}>* </span>
				</label>
				<div className={styles.emojiRow}>
					{moods.map((mood) => (
						<Emoji
							key={mood}
							emoji={mood}
							selected={emoji === mood}
							onClick={() => setEmoji(mood)}
						/>
					))}
				</div>
			</div>

			<div>
				<label>And add a comment for today:</label>
				<input
					type='text'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className={styles.input}
					placeholder='Optional comment'
				/>
			</div>

			<Button type='submit' disabled={loading}>
				{loading ? 'Adding...' : 'Add Mood'}
			</Button>

			{error && <div>{error}</div>}
		</form>
	);
};

export default MoodPicker;
