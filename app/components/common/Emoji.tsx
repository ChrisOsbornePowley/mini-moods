import styles from './Emoji.module.css';

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
	return (
		<button
			type='button'
			className={`${styles.emoji} ${selected ? styles.selected : ''}`}
			onClick={onClick}
			aria-label={ariaLabel || `Select mood ${emoji}`}
			tabIndex={0}
		>
			{emoji}
		</button>
	);
}
