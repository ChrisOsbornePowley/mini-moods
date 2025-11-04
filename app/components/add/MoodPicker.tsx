'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Emoji from '@/app/components/common/Emoji';
import Button from '../common/Button';
import styles from './MoodPicker.module.css';
import type { MoodRecord } from '@/app/types';

const moods = ['😁', '🙂', '🫤', '😞', '😩'];

interface MoodPickerProps {
	onSuccessRoute?: string;
	initialMood?: MoodRecord;
	mode?: 'edit' | 'add';
}

const MoodPicker = ({
	onSuccessRoute = '/history',
	initialMood,
	mode = 'add',
}: MoodPickerProps) => {
	const router = useRouter();
	const [emoji, setEmoji] = useState(initialMood?.emoji || '');
	const [comment, setComment] = useState(initialMood?.comment || '');
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

		let res;
		if (mode === 'edit' && initialMood) {
			res = await fetch(`/api/moods/${initialMood.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ emoji, comment }),
			});
		} else {
			res = await fetch('/api/moods', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ emoji, comment }),
			});
		}

		if (res.ok) {
			router.push(onSuccessRoute);
		} else {
			const data = await res.json();
			setError(
				data.error ||
					(mode === 'edit' ? 'Failed to update mood.' : 'Failed to add mood.')
			);
		}
		setLoading(false);
	}

	async function handleDelete() {
		if (!initialMood || loading) return;

		setLoading(true);
		setError(null);

		const res = await fetch(`/api/moods/${initialMood.id}`, {
			method: 'DELETE',
		});

		if (res.ok) {
			router.push(onSuccessRoute);
		} else {
			const data = await res.json();
			setError(data.error || 'Failed to delete mood.');
		}
		setLoading(false);
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2>
				{mode === 'edit'
					? `Edit mood record created on ${
							initialMood?.createdAt
								? new Date(initialMood.createdAt).toLocaleDateString()
								: 'unknown date'
					  }`
					: 'Add mood record'}
			</h2>
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
				<label>And add a comment:</label>
				<input
					type='text'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className={styles.input}
					placeholder='Optional comment'
				/>
			</div>

			<Button type='submit' disabled={loading}>
				{mode === 'edit' ? 'Save Changes' : 'Add Mood'}
			</Button>

			{mode === 'edit' && (
				<Button type='button' onClick={handleDelete} disabled={loading}>
					Delete Mood
				</Button>
			)}

			{error && <div>{error}</div>}
		</form>
	);
};

export default MoodPicker;
