import Link from 'next/link';

const Header = () => {
	return (
		<header className='w-full border-b border-gray-200 py-4 mb-8 text-center'>
			<Link
				href='/'
				className='text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-150'
			>
				Mini Moods
			</Link>
		</header>
	);
};

export default Header;
