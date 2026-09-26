import React from 'react';

/**
 * Official Nubank Logo SVG from simple-icons (CC0 / official brand geometry)
 * viewBox: 0 0 24 24
 */
export const NuLogo: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = 'w-24 h-12',
  color = '#FFFFFF',
  size,
}) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Nubank Logo"
    >
      <path d="M7.2795 5.4336c-1.1815 0-2.1846.4628-2.9432 1.252h-.002c-.0541-.0022-.1074-.002-.162-.002-1.5436 0-2.9925.8835-3.699 2.2559-.3088.5996-.4234 1.2442-.459 1.9003-.0321.589 0 1.1863 0 1.7696v5.6523H3.184s.0022-2.784 0-5.1777c-.0014-1.6112-.0118-3.0471 0-3.3418.056-1.3937.4372-2.3053 1.1484-3.0508 2.3585.0018 3.8852 1.6091 3.9705 4.168.0196.5874.0254 3.7304.0254 3.7304v3.672h3.1678v-4.965c0-1.5007.0127-2.8006-.0918-3.6952-.292-2.5-1.821-4.168-4.1248-4.168zm8.3903.3008l-3.166.0039v4.9648c0 1.5009-.0127 2.8007.0919 3.6953.2921 2.5001 1.821 4.168 4.1248 4.168 1.1815 0 2.1846-.4628 2.9432-1.252.0003-.0003.0016.0004.002 0 .0542.0023.1093.002.164.002 1.5435 0 2.9905-.8835 3.6971-2.2558.3088-.5997.4233-1.2442.459-1.9004.032-.5889 0-1.1862 0-1.7695V5.7383H20.816s-.0022 2.784 0 5.1777c.0015 1.6113.0119 3.047 0 3.3418-.056 1.3935-.4372 2.3053-1.1483 3.0508-2.3586-.0018-3.8853-1.6091-3.9706-4.168-.0196-.5874-.0273-2.0437-.0273-3.7324Z" />
    </svg>
  );
};

/**
 * Official Pix Icon (Banco Central do Brasil / simple-icons geometry)
 */
export const PixIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pix Logo"
    >
      <path d="M5.283 18.36a3.505 3.505 0 0 0 2.493-1.032l3.6-3.6a.684.684 0 0 1 .946 0l3.613 3.613a3.504 3.504 0 0 0 2.493 1.032h.71l-4.56 4.56a3.647 3.647 0 0 1-5.156 0L4.85 18.36ZM18.428 5.627a3.505 3.505 0 0 0-2.493 1.032l-3.613 3.614a.67.67 0 0 1-.946 0l-3.6-3.6A3.505 3.505 0 0 0 5.283 5.64h-.434l4.573-4.572a3.646 3.646 0 0 1 5.156 0l4.559 4.559ZM1.068 9.422 3.79 6.699h1.492a2.483 2.483 0 0 1 1.744.722l3.6 3.6a1.73 1.73 0 0 0 2.443 0l3.614-3.613a2.482 2.482 0 0 1 1.744-.723h1.767l2.737 2.737a3.646 3.646 0 0 1 0 5.156l-2.736 2.736h-1.768a2.482 2.482 0 0 1-1.744-.722l-3.613-3.613a1.77 1.77 0 0 0-2.444 0l-3.6 3.6a2.483 2.483 0 0 1-1.744.722H3.791l-2.723-2.723a3.646 3.646 0 0 1 0-5.156"/>
    </svg>
  );
};

/**
 * Exact Pagar Icon matching Image 1:
 * 5 vertical rounded pill bars
 */
export const BarcodeIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FFFFFF',
}) => {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <rect x="4" y="6" width="2" height="12" rx="1" />
      <rect x="7.5" y="6" width="2" height="12" rx="1" />
      <rect x="11" y="6" width="2" height="12" rx="1" />
      <rect x="14.5" y="6" width="2" height="12" rx="1" />
      <rect x="18" y="6" width="2" height="12" rx="1" />
    </svg>
  );
};

/**
 * Exact Pagar com Pix QR Code matching Image 1:
 * 4 rounded squares in 2x2 grid with bottom-right filled
 */
export const QrCodeNuIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="14" y="14" width="4.5" height="4.5" rx="1" fill={color} stroke="none" />
    </svg>
  );
};

/**
 * Exact Recarga de Celular Icon matching Image 1:
 * Smartphone with rounded outline and small circle dot at bottom
 */
export const PhoneNuIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="6.5" y="3" width="11" height="18" rx="3.5" />
      <circle cx="12" cy="16.8" r="0.9" fill={color} stroke="none" />
    </svg>
  );
};

/**
 * Exact Nubank Header Eye Icon matching Image 7:
 * Almond shaped eye outline with a clean circle pupil in center
 */
export const NuEyeIcon: React.FC<{
  isOpen: boolean;
  className?: string;
  color?: string;
}> = ({ isOpen, className = 'w-6 h-6', color = '#FFFFFF' }) => {
  if (!isOpen) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Closed eyelid arch matching video frame 00:01 */}
        <path d="M2.5 10.5C5.2 15.2 8.4 16.8 12 16.8s6.8-1.6 9.5-6.3" />
        {/* Eyelashes radiating downward */}
        <path d="M4 11.5l-1.8 2.8" />
        <path d="M7.8 14.5l-1.2 3.2" />
        <path d="M12 16.8v3.5" />
        <path d="M16.2 14.5l1.2 3.2" />
        <path d="M20 11.5l1.8 2.8" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Open eye almond outline matching video frame 00:02 */}
      <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7z" />
      {/* Pupil */}
      <circle cx="12" cy="12" r="3.2" strokeWidth="2.2" />
    </svg>
  );
};

/**
 * Exact Question mark in circle matching Image 7
 */
export const NuHelpIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};

/**
 * Exact Shield with checkmark matching Image 7
 */
export const NuShieldIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#FFFFFF',
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
