import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoricalData } from '../types/weather';
import { getHistoricalWeather } from '../utils/weatherApi';
import { Loader2 } from 'lucide-react';

interface HistoricalChartProps {
  lat: number;
  lon: number;
}

export function HistoricalChart({ lat, lon }: HistoricalChartProps) {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'temp' | 'humidity' | 'pressure'>('temp');

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      try {
        const historicalData = await getHistoricalWeather(lat, lon, 30);
        setData(historicalData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [lat, lon]);

  const getMetricConfig = () => {
    switch (selectedMetric) {
      case 'temp':
        return {
          dataKey: 'temp',
          name: 'Temperature (°C)',
          color: '#F59E0B',
          unit: '°C',
        };
      case 'humidity':
        return {
          dataKey: 'humidity', 
          name: 'Humidity (%)',
          color: '#3B82F6',
          unit: '%',
        };
      case 'pressure':
        return {
          dataKey: 'pressure',
          name: 'Pressure (hPa)',
          color: '#8B5CF6',
          unit: 'hPa',
        };
    }
  };

  const metricConfig = getMetricConfig();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <p className="text-white text-sm font-medium">{label}</p>
          <p className="text-white text-sm">
            {`${metricConfig.name}: ${payload[0].value.toFixed(1)}${metricConfig.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Historical Weather Data</h3>
        <div className="flex space-x-2">
          {[
            { key: 'temp', label: 'Temperature' },
            { key: 'humidity', label: 'Humidity' },
            { key: 'pressure', label: 'Pressure' },
          ].map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key as any)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                selectedMetric === metric.key
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)" 
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={metricConfig.dataKey}
                stroke={metricConfig.color}
                strokeWidth={2}
                dot={{ fill: metricConfig.color, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: metricConfig.color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}