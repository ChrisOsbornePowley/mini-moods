import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<Link href='/' className={styles.link}>
				<h1 className={styles.title}>Mini Moods</h1>
			</Link>
		</header>
	);
};

export default Header;
