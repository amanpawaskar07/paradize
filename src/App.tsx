import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import { getCurrentWeather } from './utils/weatherApi';
import { useGeolocation } from './hooks/useGeolocation';
import { SearchBar } from './components/SearchBar';
import { LocationButton } from './components/LocationButton';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { HourlyForecast } from './components/HourlyForecast';
import { WeatherMap } from './components/WeatherMap';
import { HistoricalChart } from './components/HistoricalChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number; name: string } | null>(null);
  
  const { coords, loading: geoLoading, error: geoError, getCurrentPosition } = useGeolocation();

  // Load weather data
  const loadWeatherData = async (lat: number, lon: number, locationName?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await getCurrentWeather(lat, lon);
      setWeather(weatherData);
      setCurrentLocation({ 
        lat, 
        lon, 
        name: locationName || `${weatherData.location.name}, ${weatherData.location.country}` 
      });
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      console.error('Weather data error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle location selection from search
  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    loadWeatherData(lat, lon, name);
  };

  // Handle geolocation
  useEffect(() => {
    if (coords) {
      loadWeatherData(coords.latitude, coords.longitude);
    }
  }, [coords]);

  // Load default location on first visit
  useEffect(() => {
    if (!weather && !coords && !geoLoading) {
      // Load default location (New York)
      loadWeatherData(40.7128, -74.0060, 'New York, US');
    }
  }, [weather, coords, geoLoading]);

  const getBackgroundGradient = () => {
    if (!weather) return 'from-blue-900 via-blue-800 to-indigo-900';
    
    const condition = weather.current.condition;
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (isNight) {
      return 'from-indigo-900 via-purple-900 to-blue-900';
    }
    
    switch (condition) {
      case 'sunny':
        return 'from-yellow-400 via-orange-500 to-red-500';
      case 'partly-cloudy':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'cloudy':
        return 'from-gray-600 via-gray-700 to-gray-800';
      case 'rainy':
        return 'from-gray-700 via-blue-800 to-blue-900';
      case 'snowy':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'stormy':
        return 'from-gray-800 via-gray-900 to-black';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">WeatherNow</h1>
            <p className="text-white/70">Beautiful weather forecasts at your fingertips</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar onLocationSelect={handleLocationSelect} className="w-full md:w-80" />
            <LocationButton 
              onClick={getCurrentPosition} 
              loading={geoLoading}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Error Messages */}        
        {geoError && (
          <ErrorMessage 
            message={geoError} 
            className="mb-6"
          />
        )}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={() => currentLocation && loadWeatherData(currentLocation.lat, currentLocation.lon)}
            className="mb-6"
          />
        )}

        {/* Loading State */}
        {loading && (
          <LoadingSpinner message="Loading weather data..." className="py-16" />
        )}

        {/* Weather Content */}
        {weather && !loading && (
          <div className="space-y-8">
            {/* Current Weather & Hourly Forecast */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WeatherCard weather={weather} />
              </div>
              <div>
                <HourlyForecast hourlyData={weather.hourly} />
              </div>
            </div>

            {/* 7-Day Forecast & Weather Map */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ForecastCard forecasts={weather.forecast} />
              <WeatherMap lat={weather.location.lat} lon={weather.location.lon} />
            </div>

            {/* Historical Chart */}
            <HistoricalChart lat={weather.location.lat} lon={weather.location.lon} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-white/50 text-sm">
          <p>© 2025 WeatherNow. Weather data powered by OpenWeatherMap.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;