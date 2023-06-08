import './App.css';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<Routes>
			<Route path='/' element={<Home setSearchParams={setSearchParams} />} />
			<Route
				path='/results'
				element={<Results searchParams={searchParams} />}
			/>
		</Routes>
	);
}

export default App;
