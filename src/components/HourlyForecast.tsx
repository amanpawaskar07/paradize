import React from 'react';
import { HourlyWeather } from '../types/weather';
import { weatherIcons } from '../utils/weatherIcons';

interface HourlyForecastProps {
  hourlyData: HourlyWeather[];
}

export function HourlyForecast({ hourlyData }: HourlyForecastProps) {
  // Show next 12 hours
  const next12Hours = hourlyData.slice(0, 12);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6">Hourly Forecast</h3>
      
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {next12Hours.map((hour, index) => {
          const WeatherIcon = weatherIcons[hour.icon] || weatherIcons.sunny;
          const isCurrentHour = index === 0;
          
          return (
            <div
              key={index}
              className={`flex-shrink-0 text-center p-4 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                isCurrentHour ? 'bg-white/15 border border-white/30' : 'bg-white/5'
              }`}
              style={{ minWidth: '80px' }}
            >
              <div className={`text-sm mb-2 ${isCurrentHour ? 'text-white font-semibold' : 'text-white/70'}`}>
                {isCurrentHour ? 'Now' : hour.time}
              </div>
              <WeatherIcon className="w-8 h-8 text-white/80 mx-auto mb-2" />
              <div className="text-white font-semibold mb-1">
                {Math.round(hour.temp)}°
              </div>
              <div className="text-xs text-white/60">
                {Math.round(hour.precipitation)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}