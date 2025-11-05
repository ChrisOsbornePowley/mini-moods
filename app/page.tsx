import { SignedIn, SignedOut } from '@clerk/nextjs';
import styles from './page.module.css';
import Button from '@/app/components/common/Button';

export default function Home() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Welcome to Mini Moods</h1>
			<p className={styles.subheading}>
				Track and reflect on your daily moods with ease.
			</p>
			<SignedIn>
				<Button href='/add'>Record your current mood</Button>
				<Button href='/history'>View your mood history</Button>
			</SignedIn>
			<SignedOut>
				<div className={styles.authButtons}>
					<Button href='/sign-in'>Sign In</Button>
					or
					<Button href='/sign-up'>Register</Button>
				</div>
			</SignedOut>
		</div>
	);
}
