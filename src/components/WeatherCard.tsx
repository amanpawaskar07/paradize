import React from 'react';
import { WeatherData } from '../types/weather';
import { weatherIcons, metricIcons } from '../utils/weatherIcons';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const { current, location } = weather;
  const WeatherIcon = weatherIcons[current.icon] || weatherIcons.sunny;
  
  const metrics = [
    {
      label: 'Feels like',
      value: `${Math.round(current.feelsLike)}°`,
      icon: metricIcons.temperature,
    },
    {
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: metricIcons.humidity,
    },
    {
      label: 'Wind',
      value: `${current.windSpeed} km/h`,
      icon: metricIcons.wind,
    },
    {
      label: 'Pressure',
      value: `${current.pressure} hPa`,
      icon: metricIcons.pressure,
    },
    {
      label: 'Visibility',
      value: `${current.visibility} km`,
      icon: metricIcons.visibility,
    },
    {
      label: 'UV Index',
      value: current.uvIndex.toString(),
      icon: metricIcons.temperature,
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {location.name}, {location.country}
          </h2>
          <p className="text-white/70 capitalize">{current.description}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-light text-white mb-1">
            {Math.round(current.temp)}°
          </div>
          <WeatherIcon className="w-12 h-12 text-white/80 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center space-x-2 mb-1">
                <IconComponent className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/70">{metric.label}</span>
              </div>
              <div className="text-lg font-semibold text-white">{metric.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}