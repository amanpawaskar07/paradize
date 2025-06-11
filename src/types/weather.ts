export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    description: string;
    icon: string;
    timestamp: number;
  };
  forecast: WeatherForecast[];
  hourly: HourlyWeather[];
}

export interface WeatherForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface HistoricalData {
  date: string;
  temp: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: number;
  end: number;
}