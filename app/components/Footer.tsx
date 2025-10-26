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
	return (
		<footer className='w-full border-t border-gray-200 py-4 mt-8 text-center text-gray-500 text-sm'>
			{message}
		</footer>
	);
};

export default Footer;
