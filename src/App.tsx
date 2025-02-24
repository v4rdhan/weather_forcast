import { useState } from 'react'

import './App.css'

const WeatherForcastApp = () => {
  const [city, setCity] = useState('')

  interface WeatherData {
    name: string;
    weather: { main: string; description: string }[];
    main: { temp: number };
  }

  const [weather, setWeather] = useState<WeatherData | null>(null)

  const [error, setError] = useState<Error | null>(null);


  const API_KEY =
    'efbc7156e949a99de418363ddfd8876a'

    // const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setCity(event.target.value);

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
        const data = await response.json()
        setWeather(data)
      } catch (error) {
        setError(error as Error)
      }
    }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Weather Forecast App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border border-gray-300 p-2 mb-4 rounded"
      />
      <button
        onClick={fetchWeather}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      {error && <div className="text-red-500 mt-4">{error.message}</div>}
      {weather && weather.main && (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].main}</p>
          <p className="text-sm text-gray-600">{weather.weather[0].description}</p>
          <p className="text-lg">{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  )
}

export default WeatherForcastApp
