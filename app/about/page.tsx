import ExampleImages from '@/app/components/common/ExampleImages';
import styles from './page.module.css';

const page = () => {
	return (
		<div className={styles.container}>
			<h1>About Mini Moods</h1>
			<section>
				<p>
					<strong>Mini Moods</strong> is a simple app to record your mood using
					an emoji and an optional comment. You can easily view your mood
					history and reflect on your entries.
				</p>
				<ul>
					<li>Quickly log how you feel with an emoji</li>
					<li>Add a comment if you want</li>
					<li>Browse your mood history</li>
				</ul>
			</section>
			<section>
				<h2>Privacy & Authentication</h2>
				<p>
					Authentication is managed by <strong>Clerk</strong>, so your login
					information is never stored by us.
				</p>
			</section>
			<section>
				<h2>Example Images</h2>
				<p>
					Below are some screenshots and explanations of different features you
					can use in Mini Moods.
				</p>
				<ExampleImages />
			</section>
			<section>
				<h2>Tech & Purpose</h2>
				<p>
					Mini Moods was built quickly as a proof of concept to experiment with
					different tech stacks.
				</p>
			</section>
		</div>
	);
};

export default page;
