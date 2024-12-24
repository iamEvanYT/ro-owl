import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

type VerifiedBadgeProps = {
  width?: number;
  height?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>;

function RawRobloxVerifiedBadge({
  width = 28,
  height = 28,
  color = '#0066FF',
  ...props
}: VerifiedBadgeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_8_46)">
        <rect
          x="5.88818"
          width="22.89"
          height="22.89"
          transform="rotate(15 5.88818 0)"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.543 8.7508L20.549 8.7568C21.15 9.3578 21.15 10.3318 20.549 10.9328L11.817 19.6648L7.45 15.2968C6.85 14.6958 6.85 13.7218 7.45 13.1218L7.457 13.1148C8.058 12.5138 9.031 12.5138 9.633 13.1148L11.817 15.2998L18.367 8.7508C18.968 8.1498 19.942 8.1498 20.543 8.7508Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_8_46">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function RobloxVerifiedBadge({
  width = 28,
  height = 28,
  color = '#0066FF',
  ...props
}: VerifiedBadgeProps) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <RawRobloxVerifiedBadge width={width} height={height} color={color} {...props} />
        </TooltipTrigger>
        <TooltipContent>
          This is a Roblox verified badge.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}

function RawRoOwlVerifiedBadge({
  width = 28,
  height = 28,
  color = '#4A5568',
  ...props
}: VerifiedBadgeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="5 5 55 55"
      fill="none"
      {...props}
    >
      <defs>
        <defs>
          <style>
            {`
              .cls-1 { opacity: 0; }
              .cls-2 { fill: #fff; }
              .cls-3 { fill: ${color}; }
            `}
          </style>
        </defs>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_3" data-name="Layer 3">
          <g className="cls-1">
            <rect className="cls-2" width="64" height="64" />
          </g>
          <path className="cls-3" d="M59.45,32.29a10.08,10.08,0,0,0-5.08-8.13.61.61,0,0,1-.32-.85,10.44,10.44,0,0,0-1.21-8.9,9.41,9.41,0,0,0-8.63-4.63,27.51,27.51,0,0,0-3.24.47c-1.83-3.53-4.75-5.73-8.91-5.75S24.94,6.68,23,10.37l-.45-.14a9.45,9.45,0,0,0-8.37,1.11,10.65,10.65,0,0,0-4.2,12,.59.59,0,0,1-.33.84,10.55,10.55,0,0,0-5,10.72A10.43,10.43,0,0,0,9.3,42.26a.69.69,0,0,1,.26.55A10.38,10.38,0,0,0,10,47a9.88,9.88,0,0,0,12.39,6.76c.55-.17.71,0,.95.41A9.72,9.72,0,0,0,39.7,55.71c.51-.64.9-1.36,1.38-2.08l.42.13a9.29,9.29,0,0,0,4.9.3,10.31,10.31,0,0,0,8.05-11.21.57.57,0,0,1,.28-.62A10.29,10.29,0,0,0,59.45,32.29Z" />
          <polygon className="cls-2" points="40.95 20.27 28.58 34.07 23.05 27.12 17.79 32.38 28.58 43.17 46.21 25.54 40.95 20.27" />
        </g>
      </g>
    </svg>
  );
}

export function RoOwlVerifiedBadge({
  width = 28,
  height = 28,
  color = '#4A5568',
  ...props
}: VerifiedBadgeProps) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <RawRoOwlVerifiedBadge width={width} height={height} color={color} {...props} />
        </TooltipTrigger>
        <TooltipContent>
          This is a RoOwl verified badge.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}