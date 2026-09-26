import React from 'react';

interface NuTransferSuccessIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Exact Nubank Transfer Success Graphic matching user reference image (image (7).png):
 * - Smooth dark emerald green ribbon/track rising diagonally from bottom-left to top-right
 * - Disc 1 (Bottom-left): Lavender purple circular coin facing forward
 * - Disc 2 (Middle): 3D tilted lavender coin in isometric perspective with deep purple edge
 * - Disc 3 (Top-right): Vivid green circular coin with crisp white checkmark (✓)
 */
export const NuTransferSuccessIllustration: React.FC<NuTransferSuccessIllustrationProps> = ({
  className = 'w-40 h-40',
  width,
  height,
}) => {
  return (
    <svg
      viewBox="0 0 128 128"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none pointer-events-none`}
      aria-label="Transferência concluída"
    >
      <defs>
        {/* Soft blur for glowing edges of green ribbon track */}
        <filter id="nuTrackGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
        </filter>

        {/* Gradient for the curved green ribbon track */}
        <linearGradient id="nuGreenTrack" x1="15%" y1="90%" x2="85%" y2="15%">
          <stop offset="0%" stopColor="#01240c" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#034517" stopOpacity="0.95" />
          <stop offset="85%" stopColor="#007f23" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#00a62c" stopOpacity="1" />
        </linearGradient>

        {/* Disc 1: Lavender purple coin gradient */}
        <radialGradient id="nuDisc1Grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c89eff" />
          <stop offset="60%" stopColor="#af7dfa" />
          <stop offset="100%" stopColor="#965cf4" />
        </radialGradient>

        {/* Disc 2 (Middle): 3D Top face lavender sheen */}
        <radialGradient id="nuDisc2Top" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d3adff" />
          <stop offset="50%" stopColor="#bb8bf8" />
          <stop offset="100%" stopColor="#a36bf1" />
        </radialGradient>

        {/* Disc 2 (Middle): 3D Extrusion dark purple bevel */}
        <linearGradient id="nuDisc2Side" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a1acd" />
          <stop offset="100%" stopColor="#590c9b" />
        </linearGradient>

        {/* Disc 3 (Top-right): Vibrant emerald green */}
        <radialGradient id="nuDisc3Grad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#00c335" />
          <stop offset="65%" stopColor="#00a62c" />
          <stop offset="100%" stopColor="#008b24" />
        </radialGradient>
      </defs>

      {/* 1. CURVED GREEN RIBBON TRACK (Rising S-curve from bottom-left to top-right) */}
      {/* Soft blurred underlayer for realistic ambient glow */}
      <path
        d="M 12,108 C 22,86 42,66 60,52 C 78,38 92,26 104,14 C 118,24 116,46 104,58 C 88,74 68,90 40,106 C 28,114 18,114 12,108 Z"
        fill="#023b14"
        opacity="0.6"
        filter="url(#nuTrackGlow)"
      />

      {/* Crisp primary curved ribbon path */}
      <path
        d="M 14,106 C 24,84 44,65 62,50 C 78,38 92,26 102,15 C 117,25 115,45 102,57 C 86,72 66,88 38,104 C 26,112 18,112 14,106 Z"
        fill="url(#nuGreenTrack)"
      />

      {/* 2. DISC 1 (Bottom-Left: Lavender purple flat coin) */}
      <g transform="translate(26, 95)">
        {/* Outer subtle rim */}
        <circle cx="0" cy="0" r="17.5" fill="#c39afc" opacity="0.9" />
        {/* Inner face */}
        <circle cx="0" cy="0" r="15.5" fill="url(#nuDisc1Grad)" />
        {/* Soft inner concentric ring */}
        <circle cx="0" cy="0" r="13" fill="none" stroke="#ba8cfc" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* 3. DISC 2 (Middle: 3D tilted coin floating on green track) */}
      <g transform="translate(65, 64) rotate(-34)">
        {/* 3D Extrusion / Thickness facing downwards */}
        <path
          d="M -18,0 C -18,7.5 18,7.5 18,0 L 18,5.5 C 18,13 -18,13 -18,5.5 Z"
          fill="url(#nuDisc2Side)"
        />
        {/* Bottom rim edge highlight */}
        <ellipse cx="0" cy="5.5" rx="18" ry="7" fill="#6912b3" opacity="0.8" />
        
        {/* Top elliptical coin face */}
        <ellipse cx="0" cy="0" rx="18" ry="7" fill="url(#nuDisc2Top)" />
        {/* Inner subtle rim */}
        <ellipse cx="0" cy="0" rx="15" ry="5.8" fill="none" stroke="#e0c2ff" strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* 4. DISC 3 (Top-Right: Vibrant green coin with white checkmark) */}
      <g transform="translate(97, 28)">
        {/* Green circular coin */}
        <circle cx="0" cy="0" r="20.5" fill="url(#nuDisc3Grad)" />

        {/* Crisp white checkmark (✓) */}
        <path
          d="M -7.5,0.5 L -2,6.5 L 9.5,-5.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
