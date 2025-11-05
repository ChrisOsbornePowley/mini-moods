import Link from 'next/link';
import styles from './Header.module.css';
import buttonStyles from './Button.module.css';
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.leftSection}>
				<Link href='/about' className={styles.link}>
					About
				</Link>
			</div>
			<Link href='/' className={styles.link}>
				<h1 className={styles.title}>Mini Moods</h1>
			</Link>
			<SignedIn>
				<div className={styles.rightSection}>
					<div className={styles.signOutWrapper}>
						<SignOutButton>
							<button className={buttonStyles.button}>Sign Out</button>
						</SignOutButton>
					</div>
					<UserButton
						appearance={{
							elements: {
								avatarBox: styles.userButton,
								userButtonPopoverCard: styles.userPopover,
								userButtonPopoverActionButton: styles.userPopoverButton,
							},
						}}
					/>
				</div>
			</SignedIn>
		</header>
	);
};

export default Header;
