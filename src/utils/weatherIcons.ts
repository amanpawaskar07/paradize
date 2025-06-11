import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Moon, CloudFog, Wind, Eye, Thermometer, Droplets, Gauge, Navigation, DivideIcon as LucideIcon } from 'lucide-react';

export const weatherIcons: Record<string, LucideIcon> = {
  '01d': Sun,           // clear sky day
  '01n': Moon,          // clear sky night
  '02d': Cloud,         // few clouds day
  '02n': Cloud,         // few clouds night
  '03d': Cloud,         // scattered clouds
  '03n': Cloud,         // scattered clouds
  '04d': Cloud,         // broken clouds
  '04n': Cloud,         // broken clouds
  '09d': CloudDrizzle,  // shower rain
  '09n': CloudDrizzle,  // shower rain
  '10d': CloudRain,     // rain day
  '10n': CloudRain,     // rain night
  '11d': CloudLightning, // thunderstorm
  '11n': CloudLightning, // thunderstorm
  '13d': CloudSnow,     // snow
  '13n': CloudSnow,     // snow
  '50d': CloudFog,      // mist
  '50n': CloudFog,      // mist
  'sunny': Sun,
  'clear-night': Moon,
  'partly-cloudy': Cloud,
  'cloudy': Cloud,
  'rainy': CloudRain,
  'snowy': CloudSnow,
  'stormy': CloudLightning,
  'foggy': CloudFog,
};

export const metricIcons = {
  temperature: Thermometer,
  humidity: Droplets,
  pressure: Gauge,
  wind: Wind,
  visibility: Eye,
  direction: Navigation,
};