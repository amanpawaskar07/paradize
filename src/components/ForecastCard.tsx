import React from 'react';
import { WeatherForecast } from '../types/weather';
import { weatherIcons } from '../utils/weatherIcons';
import { CloudRain, Wind } from 'lucide-react';

interface ForecastCardProps {
  forecasts: WeatherForecast[];
}

export function ForecastCard({ forecasts }: ForecastCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6">7-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecasts.map((forecast, index) => {
          const WeatherIcon = weatherIcons[forecast.icon] || weatherIcons.sunny;
          const isToday = index === 0;
          
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:bg-white/5 ${
                isToday ? 'bg-white/10 border border-white/20' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-4">
                <WeatherIcon className="w-10 h-10 text-white/80" />
                <div>
                  <div className={`font-semibold ${isToday ? 'text-white' : 'text-white/90'}`}>
                    {forecast.day}
                  </div>
                  <div className="text-sm text-white/70 capitalize">
                    {forecast.description}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <CloudRain className="w-4 h-4" />
                  <span>{forecast.precipitation}%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <Wind className="w-4 h-4" />
                  <span>{forecast.windSpeed} km/h</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {Math.round(forecast.high)}°
                  </div>
                  <div className="text-white/60 text-sm">
                    {Math.round(forecast.low)}°
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}