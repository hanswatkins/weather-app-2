import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [cityName, setCityName] = useState('');
	let setSearchParams = () => {};
	let navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		setSearchParams(cityName);
		navigate(`/results?query=${cityName}`);
	}

	return (
		<div className='h-[100dvh] bg-red-300 bg- flex justify-center items-center flex-col font-display select-none md:scale-110 lg:scale-125 xl:scale-150'>
			<h1 className='text-2xl'>What&apos;s The Weather?</h1>
			<form onSubmit={handleSubmit} className='flex gap-2 mt-5'>
				<input
					className='p-2 shadow-inner outline rounded-lg bg-red-50 focus:outline-black focus:outline-2 active:shadow-none transition-all duration-500'
					value={cityName}
					onChange={(ev) => setCityName(ev.target.value)}
				/>
				<button className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:shadow-none hover:outline-black hover:bg-yellow-400  hover:shadow-sm transition-all duration-500'>
					Search
				</button>
			</form>
		</div>
	);
};

export default Home;
