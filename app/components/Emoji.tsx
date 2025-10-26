import React from 'react';

interface EmojiProps {
	emoji: string;
	selected?: boolean;
	onClick?: () => void;
	ariaLabel?: string;
}

export default function Emoji({
	emoji,
	selected,
	onClick,
	ariaLabel,
}: EmojiProps) {
	const base =
		'text-3xl p-3 border-2 rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer bg-gray-50 border-gray-300';
	const selectedClass = 'bg-blue-100 border-blue-500 shadow-sm';

	return (
		<button
			type='button'
			className={
				selected
					? `${base} ${selectedClass}`
					: `${base} hover:scale-110 hover:border-blue-400`
			}
			onClick={onClick}
			aria-label={ariaLabel || `Select mood ${emoji}`}
			tabIndex={0}
		>
			{emoji}
		</button>
	);
}
