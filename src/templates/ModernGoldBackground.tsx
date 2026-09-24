import React from 'react';

export const ModernGoldBackground: React.FC = () => {
  return (
    <g id="modern-gold-background">
      <defs>
        <linearGradient id="mg-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>

        <linearGradient id="mg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f3e5ab" />
          <stop offset="100%" stopColor="#aa771c" />
        </linearGradient>

        <linearGradient id="mg-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Base */}
      <rect width="1414" height="1000" fill="url(#mg-bg)" />

      {/* Modern Dual Border Geometry */}
      <rect x="40" y="40" width="1334" height="920" fill="none" stroke="url(#mg-navy)" strokeWidth="4" />
      <rect x="52" y="52" width="1310" height="896" fill="none" stroke="url(#mg-gold)" strokeWidth="1.5" />

      {/* Geometric Corner Accents */}
      <path d="M40,40 L90,40 L40,90 Z" fill="url(#mg-gold)" />
      <path d="M1374,40 L1324,40 L1374,90 Z" fill="url(#mg-gold)" />
      <path d="M40,960 L90,960 L40,910 Z" fill="url(#mg-gold)" />
      <path d="M1374,960 L1324,960 L1374,910 Z" fill="url(#mg-gold)" />

      {/* Header Crest */}
      <g transform="translate(707, 130)">
        <polygon points="0,-22 18,0 0,22 -18,0" fill="none" stroke="url(#mg-gold)" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="url(#mg-gold)" />
        <text
          x="0"
          y="50"
          textAnchor="middle"
          fill="#0f172a"
          fontFamily="'Montserrat', sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="0.3em"
        >
          GLOBAL LEADERSHIP & EXECUTIVE INSTITUTE
        </text>
        <line x1="-120" y1="65" x2="120" y2="65" stroke="url(#mg-gold)" strokeWidth="1" />
      </g>

      {/* Certificate Title */}
      <g transform="translate(707, 280)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="#0f172a"
          fontFamily="'Cinzel', serif"
          fontSize="46"
          fontWeight="700"
          letterSpacing="0.2em"
        >
          CERTIFICATE OF ACHIEVEMENT
        </text>
        <text
          x="0"
          y="35"
          textAnchor="middle"
          fill="#64748b"
          fontFamily="'Montserrat', sans-serif"
          fontSize="13"
          letterSpacing="0.25em"
          fontWeight="500"
        >
          PROUDLY CONFERRED UPON
        </text>
      </g>

      {/* Underline for recipient */}
      <g transform="translate(707, 560)">
        <line x1="-320" y1="0" x2="320" y2="0" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="-10" y="-3" width="20" height="6" fill="url(#mg-gold)" />
      </g>

      {/* Body Text */}
      <g transform="translate(707, 615)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="#475569"
          fontFamily="'Montserrat', sans-serif"
          fontSize="14"
          fontWeight="400"
          letterSpacing="0.1em"
        >
          FOR SUCCESSFUL COMPLETION AND DEMONSTRATED EXCELLENCE IN THE PROGRAM
        </text>

        <text
          x="0"
          y="90"
          textAnchor="middle"
          fill="#64748b"
          fontFamily="'Libre Baskerville', Georgia, serif"
          fontStyle="italic"
          fontSize="16"
        >
          Having fulfilled all requirements and demonstrated visionary leadership and strategic execution.
        </text>
      </g>

      {/* Footer Elements */}
      <g transform="translate(330, 835)">
        <line x1="-90" y1="0" x2="90" y2="0" stroke="#94a3b8" strokeWidth="1" />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fill="#475569"
          fontFamily="'Montserrat', sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          DATE OF CONFERRAL
        </text>
      </g>

      {/* Modern Center Monogram Seal */}
      <g transform="translate(707, 830)">
        <circle cx="0" cy="0" r="38" fill="url(#mg-navy)" />
        <circle cx="0" cy="0" r="34" fill="none" stroke="url(#mg-gold)" strokeWidth="1.5" />
        <path d="M-12,-10 L0,-20 L12,-10 L0,0 Z" fill="url(#mg-gold)" />
        <text
          x="0"
          y="16"
          textAnchor="middle"
          fill="#f8fafc"
          fontFamily="'Montserrat', sans-serif"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.2em"
        >
          ACCREDITED
        </text>
      </g>

      <g transform="translate(1084, 835)">
        <path
          d="M-70,-15 C-50,-35 -30,-5 -45,-5 C-60,-5 -50,-20 -35,-20 C-15,-20 0,-5 10,-12 C20,-20 40,-5 55,-15"
          stroke="#0f172a"
          strokeWidth="2"
          fill="none"
        />
        <line x1="-90" y1="0" x2="90" y2="0" stroke="#94a3b8" strokeWidth="1" />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fill="#475569"
          fontFamily="'Montserrat', sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          EXECUTIVE DIRECTOR
        </text>
      </g>
    </g>
  );
};
