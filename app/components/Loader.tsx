type LoaderProps = {
	text?: string;
};

const Loader = ({ text = 'Loading...' }: LoaderProps) => (
	<div className='flex flex-col items-center justify-center py-6'>
		<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2' />
		<span className='text-gray-500 font-medium'>{text}</span>
	</div>
);

export default Loader;
