import Image from 'next/image';
import styles from './ExampleImages.module.css';

const images = [
	{
		src: '/add_example.png',
		alt: 'A screenshot of the mood recording page',
		description: 'Add and edit new mood entries with optional comments',
	},
	{
		src: '/history_example.png',
		alt: 'A screenshot of the mood history page',
		description: 'View your past moods in a paginated chronological list',
	},
	{
		src: '/stats_example.png',
		alt: 'A screenshot of the mood statistics page',
		description: 'Analyse your mood trends over time',
	},
];

const ExampleImages = () => {
	return (
		<div className={styles.container}>
			{images.map((image, index) => (
				<div className={styles.imageWrapper} key={index}>
					<Image
						alt={image.alt}
						src={image.src}
						width={250}
						height={250}
						style={{ objectFit: 'contain' }}
					/>
					<p className={styles.text}>{image.description}</p>
				</div>
			))}
		</div>
	);
};

export default ExampleImages;
