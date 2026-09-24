import React from 'react';

export const RisingYogaBackground: React.FC = () => {
  return (
    <g id="rising-yoga-background">
      <defs>
        {/* Background gradient */}
        <linearGradient id="ry-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffdf9" />
          <stop offset="50%" stopColor="#fdfaf3" />
          <stop offset="100%" stopColor="#f7f2e7" />
        </linearGradient>

        {/* Rich Gold Gradient for borders & titles */}
        <linearGradient id="ry-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf953f" />
          <stop offset="25%" stopColor="#fcf6ba" />
          <stop offset="50%" stopColor="#b38728" />
          <stop offset="75%" stopColor="#fbf5b7" />
          <stop offset="100%" stopColor="#aa771c" />
        </linearGradient>

        {/* Deep Gold for text accents */}
        <linearGradient id="ry-gold-deep" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9a6e1a" />
          <stop offset="100%" stopColor="#68470a" />
        </linearGradient>

        {/* Gold Drop Shadow */}
        <filter id="gold-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#aa771c" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Parchment Base */}
      <rect width="1414" height="1000" fill="url(#ry-bg)" />

      {/* Decorative Gold Outer Border */}
      <rect
        x="36"
        y="36"
        width="1342"
        height="928"
        fill="none"
        stroke="url(#ry-gold)"
        strokeWidth="6"
      />

      {/* Thin Gold Inset Border */}
      <rect
        x="50"
        y="50"
        width="1314"
        height="900"
        fill="none"
        stroke="url(#ry-gold)"
        strokeWidth="1.5"
        strokeDasharray="8 4"
      />

      {/* Inner Solid Border */}
      <rect
        x="60"
        y="60"
        width="1294"
        height="880"
        fill="none"
        stroke="#d5b46b"
        strokeWidth="0.8"
      />

      {/* Four Corner Ornaments */}
      {/* Top Left */}
      <g transform="translate(60, 60)">
        <path
          d="M0,0 L60,0 C40,10 20,20 0,60 Z"
          fill="url(#ry-gold)"
          opacity="0.85"
        />
        <circle cx="16" cy="16" r="4" fill="#aa771c" />
        <path d="M0,0 L35,35 M0,15 L25,35 M15,0 L35,25" stroke="url(#ry-gold)" strokeWidth="1" />
      </g>

      {/* Top Right */}
      <g transform="translate(1354, 60) scale(-1, 1)">
        <path
          d="M0,0 L60,0 C40,10 20,20 0,60 Z"
          fill="url(#ry-gold)"
          opacity="0.85"
        />
        <circle cx="16" cy="16" r="4" fill="#aa771c" />
        <path d="M0,0 L35,35 M0,15 L25,35 M15,0 L35,25" stroke="url(#ry-gold)" strokeWidth="1" />
      </g>

      {/* Bottom Left */}
      <g transform="translate(60, 940) scale(1, -1)">
        <path
          d="M0,0 L60,0 C40,10 20,20 0,60 Z"
          fill="url(#ry-gold)"
          opacity="0.85"
        />
        <circle cx="16" cy="16" r="4" fill="#aa771c" />
        <path d="M0,0 L35,35 M0,15 L25,35 M15,0 L35,25" stroke="url(#ry-gold)" strokeWidth="1" />
      </g>

      {/* Bottom Right */}
      <g transform="translate(1354, 940) scale(-1, -1)">
        <path
          d="M0,0 L60,0 C40,10 20,20 0,60 Z"
          fill="url(#ry-gold)"
          opacity="0.85"
        />
        <circle cx="16" cy="16" r="4" fill="#aa771c" />
        <path d="M0,0 L35,35 M0,15 L25,35 M15,0 L35,25" stroke="url(#ry-gold)" strokeWidth="1" />
      </g>

      {/* HEADER: Rising Yoga Lotus Emblem */}
      <g transform="translate(707, 138)">
        {/* Sunburst rays */}
        <circle cx="0" cy="0" r="32" fill="none" stroke="url(#ry-gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        
        {/* Lotus Icon */}
        <g transform="translate(0, 4) scale(0.9)">
          {/* Central Petal */}
          <path
            d="M0,-28 C-8,-14 -12,-2 0,16 C12,-2 8,-14 0,-28 Z"
            fill="url(#ry-gold)"
          />
          {/* Left Petal */}
          <path
            d="M-2,-2 C-18,-8 -26,6 -10,16 C-4,16 -2,10 -2,-2 Z"
            fill="url(#ry-gold)"
            opacity="0.85"
          />
          {/* Right Petal */}
          <path
            d="M2,-2 C18,-8 26,6 10,16 C4,16 2,10 2,-2 Z"
            fill="url(#ry-gold)"
            opacity="0.85"
          />
          {/* Outer Left Petal */}
          <path
            d="M-8,6 C-26,2 -30,18 -16,20 C-10,20 -7,14 -8,6 Z"
            fill="url(#ry-gold)"
            opacity="0.7"
          />
          {/* Outer Right Petal */}
          <path
            d="M8,6 C26,2 30,18 16,20 C10,20 7,14 8,6 Z"
            fill="url(#ry-gold)"
            opacity="0.7"
          />
          {/* Lotus Base Pond Arc */}
          <path
            d="M-22,23 Q0,28 22,23"
            stroke="url(#ry-gold)"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Rising Yoga Brand Typography */}
        <text
          x="0"
          y="56"
          textAnchor="middle"
          fill="#3b2b10"
          fontFamily="'Cinzel', serif"
          fontSize="24"
          fontWeight="700"
          letterSpacing="0.32em"
        >
          RISING YOGA
        </text>

        <text
          x="0"
          y="74"
          textAnchor="middle"
          fill="#8e7344"
          fontFamily="'Montserrat', sans-serif"
          fontSize="10"
          fontWeight="500"
          letterSpacing="0.28em"
        >
          ACADEMY OF HOLISTIC WELLNESS & MINDFUL LIVING
        </text>

        {/* Subtle separator flourish */}
        <path
          d="M-120,90 L-15,90 M15,90 L120,90"
          stroke="url(#ry-gold)"
          strokeWidth="1"
        />
        <circle cx="0" cy="90" r="3" fill="#aa771c" />
      </g>

      {/* CERTIFICATE TITLE */}
      <g transform="translate(707, 305)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="#2d2211"
          fontFamily="'Cinzel', serif"
          fontSize="48"
          fontWeight="700"
          letterSpacing="0.22em"
          filter="url(#gold-glow)"
        >
          CERTIFICATE OF COMPLETION
        </text>

        {/* Subtitle */}
        <text
          x="0"
          y="38"
          textAnchor="middle"
          fill="#8e7344"
          fontFamily="'Playfair Display', Georgia, serif"
          fontStyle="italic"
          fontSize="18"
          letterSpacing="0.1em"
        >
          This is proudly presented to
        </text>
      </g>

      {/* RECIPIENT NAME ACCENT LINE (Under dynamic name area) */}
      <g transform="translate(707, 570)">
        <path
          d="M-360,0 L360,0"
          stroke="url(#ry-gold)"
          strokeWidth="1.2"
        />
        <polygon points="0,-4 5,0 0,4 -5,0" fill="#aa771c" />
        <circle cx="-160" cy="0" r="2" fill="#aa771c" />
        <circle cx="160" cy="0" r="2" fill="#aa771c" />
      </g>

      {/* BODY TEXT DESCRIBING FACE YOGA COURSE */}
      <g transform="translate(707, 625)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fill="#5c5243"
          fontFamily="'Montserrat', sans-serif"
          fontSize="14"
          fontWeight="400"
          letterSpacing="0.16em"
        >
          FOR SUCCESSFULLY COMPLETING THE COMPREHENSIVE TEACHER TRAINING COURSE IN
        </text>

        {/* "FACE YOGA" course label highlight */}
        <rect
          x="-150"
          y="18"
          width="300"
          height="42"
          fill="#fbf5e8"
          stroke="url(#ry-gold)"
          strokeWidth="1"
          rx="4"
        />
        <text
          x="0"
          y="46"
          textAnchor="middle"
          fill="#78500c"
          fontFamily="'Cinzel', serif"
          fontSize="24"
          fontWeight="700"
          letterSpacing="0.26em"
        >
          FACE YOGA
        </text>

        <text
          x="0"
          y="92"
          textAnchor="middle"
          fill="#6d6355"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontStyle="italic"
          fontSize="18"
        >
          Demonstrating mastery in facial anatomy, muscle toning routines, lymphatic drainage & holistic rejuvenation.
        </text>
      </g>

      {/* FOOTER SECTION: DATE, SEAL & SIGNATURE */}
      {/* Date Column */}
      <g transform="translate(320, 840)">
        <line x1="-100" y1="0" x2="100" y2="0" stroke="#bda26f" strokeWidth="1" />
        <text
          x="0"
          y="24"
          textAnchor="middle"
          fill="#8e7344"
          fontFamily="'Montserrat', sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          DATE OF ISSUE
        </text>
      </g>

      {/* Center Official Gold Seal */}
      <g transform="translate(707, 835)">
        {/* Outer serrated seal circle */}
        <circle cx="0" cy="0" r="42" fill="url(#ry-gold)" filter="url(#gold-glow)" />
        <circle cx="0" cy="0" r="38" fill="#fdfaf3" stroke="url(#ry-gold)" strokeWidth="1" />
        <circle cx="0" cy="0" r="35" fill="none" stroke="#d5b46b" strokeWidth="0.8" strokeDasharray="3 2" />
        
        {/* Seal Icon / Lotus */}
        <path
          d="M0,-14 C-4,-6 -6,0 0,10 C6,0 4,-6 0,-14 Z"
          fill="url(#ry-gold)"
        />
        <path
          d="M-1,0 C-10,-4 -14,4 -5,8 C-2,8 -1,5 -1,0 Z"
          fill="url(#ry-gold)"
          opacity="0.8"
        />
        <path
          d="M1,0 C10,-4 14,4 5,8 C2,8 1,5 1,0 Z"
          fill="url(#ry-gold)"
          opacity="0.8"
        />

        <text
          x="0"
          y="18"
          textAnchor="middle"
          fill="#5c4314"
          fontFamily="'Cinzel', serif"
          fontSize="7"
          fontWeight="700"
          letterSpacing="0.2em"
        >
          SEAL OF EXCELLENCE
        </text>
      </g>

      {/* Signature Column */}
      <g transform="translate(1094, 840)">
        {/* Realistic Calligraphy Signature */}
        <path
          d="M-80,-22 C-60,-40 -50,-10 -65,-8 C-75,-6 -85,-18 -70,-28 C-50,-40 -30,-5 -35,-15 C-40,-25 -20,-10 -5,-16 C10,-22 25,-12 35,-24 C45,-32 60,-10 75,-20"
          stroke="#261d0f"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <line x1="-100" y1="0" x2="100" y2="0" stroke="#bda26f" strokeWidth="1" />
        <text
          x="0"
          y="24"
          textAnchor="middle"
          fill="#8e7344"
          fontFamily="'Montserrat', sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          AUTHORIZED SIGNATURE
        </text>
      </g>
    </g>
  );
};
