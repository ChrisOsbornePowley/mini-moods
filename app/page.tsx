import styles from './Home.module.css';
import Button from './components/Button';

export default function Home() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Welcome to Mini Moods</h1>
			<p className={styles.subheading}>
				Track and reflect on your daily moods with ease.
			</p>
			<Button href='/new'>Record your current mood</Button>
			<Button href='/history'>View your mood history</Button>
		</div>
	);
}
