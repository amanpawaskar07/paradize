import { WeatherData, HistoricalData } from '../types/weather';

const API_KEY = 'demo_key'; // In production, use environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for demonstration since we don't have a real API key
const mockWeatherData: WeatherData = {
  location: {
    name: 'New York',
    country: 'US',
    lat: 40.7128,
    lon: -74.0060,
  },
  current: {
    temp: 22,
    feelsLike: 25,
    humidity: 65,
    pressure: 1013,
    windSpeed: 12,
    windDirection: 180,
    visibility: 10,
    uvIndex: 6,
    condition: 'partly-cloudy',
    description: 'Partly cloudy',
    icon: '02d',
    timestamp: Date.now(),
  },
  forecast: [
    {
      date: '2025-01-21',
      day: 'Today',
      high: 24,
      low: 18,
      condition: 'partly-cloudy',
      description: 'Partly cloudy',
      icon: '02d',
      humidity: 65,
      windSpeed: 12,
      precipitation: 10,
    },
    {
      date: '2025-01-22',
      day: 'Tomorrow',
      high: 26,
      low: 19,
      condition: 'sunny',
      description: 'Sunny',
      icon: '01d',
      humidity: 58,
      windSpeed: 8,
      precipitation: 0,
    },
    {
      date: '2025-01-23',
      day: 'Wednesday',
      high: 21,
      low: 15,
      condition: 'rainy',
      description: 'Light rain',
      icon: '10d',
      humidity: 80,
      windSpeed: 15,
      precipitation: 75,
    },
    {
      date: '2025-01-24',
      day: 'Thursday',
      high: 19,
      low: 13,
      condition: 'cloudy',
      description: 'Overcast',
      icon: '04d',
      humidity: 72,
      windSpeed: 10,
      precipitation: 20,
    },
    {
      date: '2025-01-25',
      day: 'Friday',
      high: 23,
      low: 17,
      condition: 'partly-cloudy',
      description: 'Partly cloudy',
      icon: '03d',
      humidity: 62,
      windSpeed: 9,
      precipitation: 5,
    },
    {
      date: '2025-01-26',
      day: 'Saturday',
      high: 25,
      low: 20,
      condition: 'sunny',
      description: 'Sunny',
      icon: '01d',
      humidity: 55,
      windSpeed: 7,
      precipitation: 0,
    },
    {
      date: '2025-01-27',
      day: 'Sunday',
      high: 27,
      low: 21,
      condition: 'sunny',
      description: 'Sunny',
      icon: '01d',
      humidity: 52,
      windSpeed: 6,
      precipitation: 0,
    },
  ],
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    temp: 20 + Math.sin(i / 24 * Math.PI * 2) * 8 + Math.random() * 4,
    condition: i < 6 || i > 18 ? 'clear-night' : 'sunny',
    icon: i < 6 || i > 18 ? '01n' : '01d',
    precipitation: Math.random() * 20,
    windSpeed: 5 + Math.random() * 10,
  })),
};

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, make actual API call
  // const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  // const data = await response.json();
  
  return {
    ...mockWeatherData,
    location: {
      ...mockWeatherData.location,
      lat,
      lon,
    },
  };
}

export async function searchLocation(query: string): Promise<Array<{name: string, country: string, lat: number, lon: number}>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock search results
  const locations = [
    { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  ];
  
  return locations.filter(location => 
    location.name.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getHistoricalWeather(lat: number, lon: number, days: number = 30): Promise<HistoricalData[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate mock historical data
  const data: HistoricalData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      temp: 15 + Math.sin(i / 30 * Math.PI * 2) * 10 + Math.random() * 8,
      humidity: 50 + Math.random() * 40,
      pressure: 1000 + Math.random() * 40,
      windSpeed: Math.random() * 20,
    });
  }
  
  return data;
}