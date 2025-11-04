import styles from './Footer.module.css';

const positiveMessages = [
	"Keep going, you're doing great!",
	'Every day is a fresh start.',
	'Small steps lead to big changes.',
	'You matter.',
	'Be kind to yourself.',
	'Progress, not perfection.',
	'Your feelings are valid.',
	'Celebrate your wins!',
	'You are stronger than you think.',
];

const message =
	positiveMessages[Math.floor(Math.random() * positiveMessages.length)];

const Footer = () => {
	return <footer className={styles.footer}>{message}</footer>;
};

export default Footer;
