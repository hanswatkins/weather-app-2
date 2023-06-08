import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	const [cityName, setCityName] = useState('');
	let setSearchParam = () => {};
	let navigate = useNavigate();

	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

	async function fetchData(event) {
		event.preventDefault();
		try {
			const response = await axios.get(weatherUrl);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className='h-[100dvh] bg-red-300 bg- flex justify-center items-center flex-col font-display select-none'>
			<h1 className='text-2xl'>What&apos;s The Weather?</h1>
			<form onSubmit={fetchData} className='flex gap-2 mt-5'>
				<input
					className='p-2 shadow-inner outline rounded-lg bg-red-50 focus:outline-amber-700 focus:outline-2 active:'
					value={cityName}
					onChange={(ev) => setCityName(ev.target.value)}
				/>
				<button className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:bg-red-800'>
					Search
				</button>
			</form>
		</div>
	);
};

export default Home;
