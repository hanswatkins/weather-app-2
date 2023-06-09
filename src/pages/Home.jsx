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
		<div className='h-[100dvh] bg-red-300 flex justify-center items-center flex-col font-display select-none'>
			<h1 className='text-2xl'>What&apos;s the weather in...</h1>
			<form onSubmit={handleSubmit} className='flex gap-2 mt-5'>
				<input
					className='p-2 w-52 shadow-inner outline rounded-lg bg-red-50 focus:outline-none active:shadow-none focus:bg-red-300 focus:shadow-none transition-all duration-500 text-2xl text-center'
					value={cityName}
					onChange={(ev) => setCityName(ev.target.value)}
				/>
				<button className='w-12 h-auto p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:shadow-none hover:outline-black hover:bg-red-300  hover:shadow-lg transition-all duration-500 text-2xl '>
					?
				</button>
			</form>
		</div>
	);
};

export default Home;
