'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => {
          const value = i + 1;
          const displayRating = interactive && hovered > 0 ? hovered : rating;
          const filled = value <= displayRating;
          const halfFilled = value - 0.5 <= displayRating && value > displayRating;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(value)}
              onMouseEnter={() => interactive && setHovered(value)}
              onMouseLeave={() => interactive && setHovered(0)}
              disabled={!interactive}
              className={`${sizeClasses[size]} ${
                interactive
                  ? 'cursor-pointer hover:scale-125 transition-transform duration-200'
                  : 'cursor-default'
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill={filled ? '#F59E0B' : halfFilled ? 'url(#half-star)' : '#E2E8F0'}
                className="w-full h-full drop-shadow-sm"
                style={filled ? { filter: 'drop-shadow(0 1px 2px rgba(245, 158, 11, 0.3))' } : undefined}
              >
                <defs>
                  <linearGradient id="half-star">
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#E2E8F0" />
                  </linearGradient>
                </defs>
                <path
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-slate-700 font-semibold ml-1 text-sm tabular-nums">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
