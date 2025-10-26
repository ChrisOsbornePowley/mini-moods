import styles from './Loader.module.css';

type LoaderProps = {
	text?: string;
};

const Loader = ({ text = 'Loading...' }: LoaderProps) => (
	<div className={styles.loaderContainer}>
		<div className={styles.spinner} />
		<span>{text}</span>
	</div>
);

export default Loader;
