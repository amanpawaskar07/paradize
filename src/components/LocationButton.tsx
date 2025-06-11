import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationButtonProps {
  onClick: () => void;
  loading: boolean;
  className?: string;
}

export function LocationButton({ onClick, loading, className = '' }: LocationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title="Use current location"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <MapPin className="w-5 h-5" />
      )}
    </button>
  );
}