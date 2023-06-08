import { Link } from 'react-router-dom';

const NoSearch = () => {
	return (
		<div className='bg-red-300 h-[100dvh] flex justify-center items-center flex-col'>
			<p className='font-display text-lg text-center'>
				Type in a city name to check the weather.
			</p>
			<Link
				to='/'
				className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:bg-red-800 m-3'
			>
				Go back
			</Link>
		</div>
	);
};

export default NoSearch;
