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
					className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:shadow-none hover:outline-black hover:bg-yellow-400  hover:shadow-sm transition-all duration-500 mt-4'
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
	const visibility = res.visibility;

	const capitalizeWords = (str) => {
		return str
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const extractFirstTwoDigits = (num) => {
		const numStr = num.toString();
		return numStr.length === 5
			? parseInt(numStr.substring(0, 2)) + ' km'
			: num + ' m';
	};

	const convertWindAngleToLetter = (degrees) =>
		['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][
			((((degrees % 360) + 360) % 360) / 45) | 0
		];

	const windAngle = res.wind.deg;

	return (
		<div className='h-[100dvh] bg-red-300 flex flex-col items-center justify-center font-display'>
			<h1 className='text-4xl uppercase font-black text-black break-words text-center mb-8'>
				{res.name}
			</h1>
			<div className='flex-col bg-red-50 p-10 rounded-xl outline'>
				<span className='flex justify-left items-center rounded-lg mt-5 gap-3'>
					<img
						className='bg-gray-300 rounded-full h-16'
						src={`https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`}
						alt='weather icon'
					/>
					<div>
						<p className='text-3xl font-medium'>
							{Math.trunc(res.main.temp)}&deg;F
						</p>
						<p className='flex text-sm justify-left'>
							Feels like {Math.trunc(res.main.feels_like)}&deg;F
						</p>
						<p className='text-sm'>
							{capitalizeWords(res.weather[0].description)}
						</p>
					</div>
				</span>
				<div className='flex-col mt-5'>
					<span className='flex justify-between gap-12'>
						<p className='text-lg'>
							High: {Math.trunc(res.main.temp_max)}&deg;F
						</p>
						<p className='text-lg'>
							Low: {Math.trunc(res.main.temp_min)}&deg;F
						</p>
					</span>
					<span className='flex flex-col items-center mt-3'>
						<p>Humidity: {Math.trunc(res.main.humidity)}%</p>
						<p>Visibility: {extractFirstTwoDigits(visibility)}</p>
						<p>
							Wind: {Math.trunc(res.wind.speed)} mph{' '}
							{convertWindAngleToLetter(windAngle)}
						</p>
					</span>
				</div>
			</div>
			<Link
				to='/'
				className='p-2 bg-red-50 outline rounded-lg focus:outline-amber-700 focus:outline-2  focus:text-white active:shadow-none hover:outline-black hover:bg-red-300  hover:shadow-lg transition-all duration-500 mt-5'
			>
				Go back
			</Link>
		</div>
	);
};

export default Results;
