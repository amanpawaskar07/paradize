import React, { useEffect, useRef } from 'react';

interface WeatherMapProps {
  lat: number;
  lon: number;
  className?: string;
}

export function WeatherMap({ lat, lon, className = '' }: WeatherMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // In a real implementation, you would use react-leaflet here
    // For now, we'll create a placeholder with weather radar simulation
    const map = mapRef.current;
    map.innerHTML = '';

    // Create a simple weather radar visualization
    const canvas = document.createElement('canvas');
    canvas.width = map.clientWidth;
    canvas.height = map.clientHeight;
    canvas.className = 'w-full h-full rounded-lg';
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create gradient for weather pattern
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(74, 144, 226, 0.8)');
      gradient.addColorStop(0.5, 'rgba(103, 169, 207, 0.6)');
      gradient.addColorStop(0.8, 'rgba(132, 200, 176, 0.4)');
      gradient.addColorStop(1, 'rgba(160, 230, 145, 0.2)');

      // Background
      ctx.fillStyle = 'rgba(0, 30, 60, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Weather pattern
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 3, 0, Math.PI * 2);
      ctx.fill();

      // Add animated rain effect
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        ctx.fillStyle = 'rgba(0, 30, 60, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated clouds
        const time = Date.now() * 0.001;
        for (let i = 0; i < 5; i++) {
          const x = (canvas.width / 5) * i + Math.sin(time + i) * 20;
          const y = canvas.height / 3 + Math.cos(time + i * 0.5) * 15;
          const radius = 30 + Math.sin(time + i * 0.3) * 10;
          
          const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
          
          ctx.fillStyle = cloudGradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Rain drops
        ctx.strokeStyle = 'rgba(74, 144, 226, 0.6)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 50; i++) {
          const x = (Math.sin(time * 0.5 + i * 0.1) * canvas.width / 2) + canvas.width / 2;
          const y = ((time * 100 + i * 20) % canvas.height);
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 2, y + 10);
          ctx.stroke();
        }

        requestAnimationFrame(animate);
      };
      
      animate();
    }

    map.appendChild(canvas);
  }, [lat, lon]);

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-white mb-6">Weather Radar</h3>
      <div
        ref={mapRef}
        className="w-full h-64 bg-slate-800 rounded-lg overflow-hidden relative"
      >
        <div className="absolute inset-0 flex items-center justify-center text-white/60">
          Loading weather radar...
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-white/70">
        <span>Live weather conditions</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span>Light rain</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Heavy rain</span>
          </div>
        </div>
      </div>
    </div>
  );
}