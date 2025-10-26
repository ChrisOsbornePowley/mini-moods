import Link from 'next/link';
import styles from './Button.module.css';

type ButtonProps = {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
	className?: string;
	ariaLabel?: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
};

export default function Button({
	children,
	href,
	onClick,
	className = '',
	ariaLabel,
	type = 'button',
	disabled = false,
}: ButtonProps) {
	if (href) {
		//return Next.js Link for any navigation buttons
		return (
			<Link
				href={href}
				className={`${styles.button} ${className}`}
				aria-label={ariaLabel}
			>
				{children}
			</Link>
		);
	}

	//or return a regular button for everything else
	return (
		<button
			type={type}
			className={`${styles.button} ${className}`}
			onClick={onClick}
			aria-label={ariaLabel}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
