/* eslint-disable react/prop-types */
import NoSearch from './NoSearch';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Results = ({ searchParams }) => {
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	const requestedSearch = searchParams.get('query');
	const [results, setResults] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${requestedSearch}&units=imperial&appid=${apiKey}`;

		axios
			.get(weatherUrl)
			.then(function (results) {
				setResults(results);
				console.log(results);
			})
			.catch(function (error) {
				setError(error);
			});
	}, []);

	if (!requestedSearch) {
		return <NoSearch />;
	}

	if (error) {
		return (
			<div className='bg-red-300 h-[100dvh] flex justify-center items-center flex-col'>
				<p className='font-display text-lg text-center'>
					No results found for &apos;{requestedSearch}&apos;
				</p>
				<Link
					to='/'
					className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:bg-red-800 m-3 hover:outline-yellow-500 hover:bg-red-800 hover:text-white hover:shadow-xl transition-all duration-500'
				>
					Try again?
				</Link>
			</div>
		);
	}

	if (!results) {
		return null;
	}

	const res = results.data;

	const capitalizeWords = (str) => {
		return str
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
    };
    
    const visibility = res.visibility

    

	return (
		<div className='h-[100dvh] bg-red-300 flex flex-col items-center justify-center font-display'>
			<div className='flex-col bg-red-50 p-10 rounded-xl outline h-96'>
				<h1 className='text-2xl'>{res.name} Weather</h1>
				<span className='flex justify-left items-center rounded-lg mt-3'>
					<img
						src={`https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`}
						alt='weather icon'
					/>
					<div>
						<p className='text-3xl'>{Math.trunc(res.main.temp)}&deg;F</p>
						<p>{capitalizeWords(res.weather[0].description)}</p>
						<p className='flex text-sm justify-center'>
							Feels like {Math.trunc(res.main.feels_like)}&deg;F
						</p>
					</div>
				</span>

				<div className='flex-col'>
					<span className='flex justify-between mt-6'>
						<p>High: {Math.trunc(res.main.temp_max)}&deg;F</p>
						<p>Low: {Math.trunc(res.main.temp_min)}&deg;F</p>
					</span>
					<p>Humidity: {Math.trunc(res.main.humidity)}%</p>
                    <p>Visibility: {res.visibility}</p>
				</div>
				add UV and Wind
			</div>
			<Link
				to='/'
				className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:bg-red-800 m-5'
			>
				Go back
			</Link>
		</div>
	);
};

export default Results;
