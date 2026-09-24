import React from 'react';

export const ClassicalAcademyBackground: React.FC = () => {
  return (
    <g id="classical-academy-background">
      <defs>
        <linearGradient id="ca-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faf8f2" />
          <stop offset="50%" stopColor="#f4eee1" />
          <stop offset="100%" stopColor="#ece2cf" />
        </linearGradient>

        <linearGradient id="ca-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#854d0e" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id="ca-ribbon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>

      {/* Parchment Paper */}
      <rect width="1414" height="1000" fill="url(#ca-bg)" />

      {/* Classical Filigree Triple Borders */}
      <rect x="44" y="44" width="1326" height="912" fill="none" stroke="#27272a" strokeWidth="5" />
      <rect x="52" y="52" width="1310" height="896" fill="none" stroke="#78350f" strokeWidth="1.5" />
      <rect x="62" y="62" width="1290" height="876" fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />

      {/* Classical Corner Flourishes */}
      {/* Top Left */}
      <g transform="translate(62, 62)">
        <path d="M0,0 Q30,10 60,0 Q50,40 60,60 Q20,50 0,60 Q10,30 0,0 Z" fill="#78350f" opacity="0.8" />
        <circle cx="20" cy="20" r="5" fill="#27272a" />
      </g>
      {/* Top Right */}
      <g transform="translate(1352, 62) scale(-1, 1)">
        <path d="M0,0 Q30,10 60,0 Q50,40 60,60 Q20,50 0,60 Q10,30 0,0 Z" fill="#78350f" opacity="0.8" />
        <circle cx="20" cy="20" r="5" fill="#27272a" />
      </g>
      {/* Bottom Left */}
      <g transform="translate(62, 938) scale(1, -1)">
        <path d="M0,0 Q30,10 60,0 Q50,40 60,60 Q20,50 0,60 Q10,30 0,0 Z" fill="#78350f" opacity="0.8" />
        <circle cx="20" cy="20" r="5" fill="#27272a" />
      </g>
      {/* Bottom Right */}
      <g transform="translate(1352, 938) scale(-1, -1)">
        <path d="M0,0 Q30,10 60,0 Q50,40 60,60 Q20,50 0,60 Q10,30 0,0 Z" fill="#78350f" opacity="0.8" />
        <circle cx="20" cy="20" r="5" fill="#27272a" />
      </g>

      {/* Academy Crest */}
      <g transform="translate(707, 135)">
        <path d="M-24,-20 L24,-20 L30,10 L0,32 L-30,10 Z" fill="none" stroke="#78350f" strokeWidth="2.5" />
        <path d="M-10,-5 L0,-18 L10,-5 L0,8 Z" fill="#78350f" />
        <text
          x="0"
          y="56"
          textAnchor="middle"
          fill="#18181b"
          fontFamily="'Cinzel', serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="0.25em"
        >
          ACADEMIA LITTERARUM ET ARTIUM
        </text>
        <text
          x="0"
          y="74"
          textAnchor="middle"
          fill="#52525b"
          fontFamily="'Cormorant Garamond', serif"
          fontStyle="italic"
          fontSize="14"
          letterSpacing="0.1em"
        >
          Founded on Academic Rigor & Enduring Merit
        </text>
        <line x1="-150" y1="88" x2="150" y2="88" stroke="#78350f" strokeWidth="1" />
      </g>

      {/* Diploma Title */}
      <g transform="translate(707, 290)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="#1c1917"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="48"
          fontWeight="700"
          letterSpacing="0.12em"
        >
          DIPLOMA OF EXCELLENCE
        </text>
        <text
          x="0"
          y="36"
          textAnchor="middle"
          fill="#78350f"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="20"
        >
          Be it known that upon the recommendation of the Faculty, has been conferred upon
        </text>
      </g>

      {/* Recipient Underline */}
      <g transform="translate(707, 565)">
        <line x1="-340" y1="0" x2="340" y2="0" stroke="#78350f" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill="#78350f" />
      </g>

      {/* Body Text */}
      <g transform="translate(707, 620)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="#44403c"
          fontFamily="'Cinzel', serif"
          fontSize="13"
          letterSpacing="0.2em"
        >
          IN RECOGNITION OF DISTINGUISHED SCHOLARSHIP AND MERITORIOUS COMPLETION OF
        </text>

        <text
          x="0"
          y="95"
          textAnchor="middle"
          fill="#57534e"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="17"
        >
          With all rights, honors, and privileges thereunto appertaining. In witness whereof, the seal of the Academy is hereunto affixed.
        </text>
      </g>

      {/* Footer Section */}
      <g transform="translate(340, 835)">
        <line x1="-90" y1="0" x2="90" y2="0" stroke="#78350f" strokeWidth="1" />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fill="#57534e"
          fontFamily="'Cinzel', serif"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          DATE OF ATTESTATION
        </text>
      </g>

      {/* Traditional Academic Wax Ribbon Seal */}
      <g transform="translate(707, 830)">
        {/* Ribbons */}
        <polygon points="-16,20 -30,65 -16,55 -2,65 -8,20" fill="url(#ca-ribbon)" />
        <polygon points="8,20 2,65 16,55 30,65 16,20" fill="url(#ca-ribbon)" />
        
        {/* Seal Body */}
        <circle cx="0" cy="0" r="40" fill="url(#ca-bronze)" />
        <circle cx="0" cy="0" r="35" fill="#f4eee1" stroke="#78350f" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="#78350f" strokeWidth="0.8" strokeDasharray="3 2" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fill="#78350f"
          fontFamily="'Cinzel', serif"
          fontSize="10"
          fontWeight="700"
        >
          SIGILLUM
        </text>
        <text
          x="0"
          y="16"
          textAnchor="middle"
          fill="#78350f"
          fontFamily="'Cinzel', serif"
          fontSize="7"
          letterSpacing="0.1em"
        >
          VERITAS
        </text>
      </g>

      <g transform="translate(1074, 835)">
        <path
          d="M-75,-15 C-50,-35 -35,-5 -50,-5 C-65,-5 -60,-22 -40,-22 C-20,-22 -5,-8 15,-18 C30,-28 50,-5 65,-15"
          stroke="#1c1917"
          strokeWidth="2.2"
          fill="none"
        />
        <line x1="-90" y1="0" x2="90" y2="0" stroke="#78350f" strokeWidth="1" />
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fill="#57534e"
          fontFamily="'Cinzel', serif"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.15em"
        >
          DEAN OF THE FACULTY
        </text>
      </g>
    </g>
  );
};
