import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex flex-col items-center mx-auto max-w-lg py-8'>
			<h1 className='text-4xl font-bold mb-3'>Welcome to Mini Moods</h1>
			<p className='text-lg text-gray-600 mb-4 text-center'>
				Track and reflect on your daily moods with ease.
			</p>
			<Link
				href='/new'
				className='mb-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150'
			>
				Record your current mood
			</Link>
			<Link
				href='/history'
				className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150'
			>
				View your mood history
			</Link>
		</div>
	);
}
