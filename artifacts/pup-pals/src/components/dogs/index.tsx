import React from 'react';

export const DogBase = ({ children, color, className, tailColor, earColor, ...props }: any) => (
  <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-md ${className}`} {...props}>
    {children}
  </svg>
);

export const ShibaInu = (props: any) => (
  <DogBase className={props.className}>
    {/* Tail */}
    <path d="M140 120 C 160 100, 180 120, 160 140 C 140 160, 130 140, 140 120" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" />
    <path d="M145 125 C 155 110, 170 125, 155 135" fill="#FFF9F2" />
    {/* Body */}
    <ellipse cx="100" cy="140" rx="45" ry="35" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" />
    <ellipse cx="100" cy="150" rx="35" ry="25" fill="#FFF9F2" />
    {/* Legs */}
    <rect x="70" y="160" width="12" height="30" rx="6" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <rect x="118" y="160" width="12" height="30" rx="6" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Head */}
    <circle cx="80" cy="100" r="35" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" />
    {/* Ears */}
    <path d="M 55 80 L 45 40 L 75 65 Z" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 90 65 L 115 40 L 105 80 Z" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    {/* Face fluff / markings */}
    <path d="M 50 100 Q 80 120 110 100 Q 90 140 50 100" fill="#FFF9F2" />
    <circle cx="80" cy="115" r="18" fill="#FFF9F2" />
    {/* Eyes */}
    <circle cx="65" cy="95" r="4" fill="#4A3B32" />
    <circle cx="95" cy="95" r="4" fill="#4A3B32" />
    {/* Cute eyebrows */}
    <circle cx="65" cy="85" r="3" fill="#FFF9F2" />
    <circle cx="95" cy="85" r="3" fill="#FFF9F2" />
    {/* Nose & Mouth */}
    <ellipse cx="80" cy="110" rx="6" ry="4" fill="#4A3B32" />
    <path d="M 75 118 Q 80 123 85 118" fill="none" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" />
  </DogBase>
);

export const GoldenRetriever = (props: any) => (
  <DogBase className={props.className}>
    {/* Tail */}
    <path d="M140 130 C 170 120, 190 140, 170 160 C 150 170, 140 140, 140 130" fill="#F4C753" stroke="#4A3B32" strokeWidth="4" />
    {/* Body */}
    <ellipse cx="100" cy="140" rx="55" ry="40" fill="#F4C753" stroke="#4A3B32" strokeWidth="4" />
    {/* Belly */}
    <ellipse cx="100" cy="155" rx="45" ry="20" fill="#FDF0CC" />
    {/* Legs */}
    <rect x="65" y="165" width="16" height="25" rx="8" fill="#F4C753" stroke="#4A3B32" strokeWidth="4" />
    <rect x="119" y="165" width="16" height="25" rx="8" fill="#F4C753" stroke="#4A3B32" strokeWidth="4" />
    {/* Head */}
    <ellipse cx="80" cy="95" rx="40" ry="35" fill="#F4C753" stroke="#4A3B32" strokeWidth="4" />
    {/* Floppy Ears */}
    <path d="M 45 90 C 30 110, 40 140, 55 125 C 60 120, 55 90, 45 90" fill="#E0AD2E" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 115 90 C 130 110, 120 140, 105 125 C 100 120, 105 90, 115 90" fill="#E0AD2E" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    {/* Muzzle */}
    <ellipse cx="80" cy="115" rx="22" ry="16" fill="#FDF0CC" stroke="#4A3B32" strokeWidth="3" />
    {/* Eyes */}
    <circle cx="65" cy="90" r="5" fill="#4A3B32" />
    <circle cx="95" cy="90" r="5" fill="#4A3B32" />
    {/* Sparkle */}
    <circle cx="63" cy="88" r="1.5" fill="#FFF" />
    <circle cx="93" cy="88" r="1.5" fill="#FFF" />
    {/* Nose */}
    <ellipse cx="80" cy="108" rx="8" ry="6" fill="#4A3B32" />
    {/* Tongue */}
    <path d="M 75 122 Q 80 135 85 122" fill="#FF7E67" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" />
  </DogBase>
);

export const Dalmatian = (props: any) => (
  <DogBase className={props.className}>
    {/* Tail */}
    <path d="M 130 130 Q 160 90 180 110" fill="none" stroke="#FFF9F2" strokeWidth="12" strokeLinecap="round" />
    <path d="M 130 130 Q 160 90 180 110" fill="none" stroke="#4A3B32" strokeWidth="16" strokeLinecap="round" strokeDasharray="0 4 100" />
    {/* Body */}
    <ellipse cx="100" cy="135" rx="45" ry="40" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Spots Body */}
    <circle cx="110" cy="120" r="6" fill="#4A3B32" />
    <circle cx="85" cy="140" r="5" fill="#4A3B32" />
    <circle cx="125" cy="150" r="8" fill="#4A3B32" />
    <circle cx="130" cy="115" r="4" fill="#4A3B32" />
    {/* Legs */}
    <rect x="70" y="165" width="14" height="30" rx="7" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <rect x="116" y="165" width="14" height="30" rx="7" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <circle cx="75" cy="180" r="3" fill="#4A3B32" />
    <circle cx="123" cy="175" r="4" fill="#4A3B32" />
    {/* Head */}
    <circle cx="80" cy="90" r="35" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Floppy Ears with spots */}
    <path d="M 45 80 Q 30 110 50 115 Z" fill="#4A3B32" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 115 80 Q 130 110 110 115 Z" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="115" cy="100" r="4" fill="#4A3B32" />
    {/* Face Spots */}
    <circle cx="95" cy="75" r="5" fill="#4A3B32" />
    <circle cx="60" cy="85" r="8" fill="#4A3B32" />
    {/* Eyes */}
    <circle cx="65" cy="85" r="4" fill="#FFF" />
    <circle cx="65" cy="85" r="2" fill="#4A3B32" />
    <circle cx="95" cy="85" r="4" fill="#4A3B32" />
    {/* Nose */}
    <circle cx="80" cy="100" r="6" fill="#4A3B32" />
    {/* Mouth */}
    <path d="M 72 110 Q 80 115 88 110" fill="none" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" />
  </DogBase>
);

export const Poodle = (props: any) => (
  <DogBase className={props.className}>
    {/* Poodle fluff uses many intersecting circles */}
    {/* Tail Puff */}
    <circle cx="160" cy="110" r="18" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    <path d="M 140 130 Q 150 120 160 110" fill="none" stroke="#FFF9F2" strokeWidth="6" />
    {/* Body */}
    <ellipse cx="100" cy="140" rx="40" ry="30" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Legs with puffs */}
    <rect x="75" y="160" width="10" height="25" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <rect x="115" y="160" width="10" height="25" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <circle cx="80" cy="180" r="12" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    <circle cx="120" cy="180" r="12" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    {/* Chest Fluff */}
    <circle cx="80" cy="130" r="25" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    <circle cx="110" cy="135" r="20" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    {/* Head */}
    <circle cx="80" cy="100" r="25" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Head Puff (Crown) */}
    <circle cx="80" cy="70" r="22" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    <circle cx="65" cy="75" r="15" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    <circle cx="95" cy="75" r="15" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    {/* Floppy Ear Puffs */}
    <ellipse cx="45" cy="105" rx="15" ry="25" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    <ellipse cx="115" cy="105" rx="15" ry="25" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    {/* Muzzle */}
    <ellipse cx="80" cy="110" rx="15" ry="10" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="3" />
    {/* Eyes */}
    <circle cx="70" cy="95" r="4" fill="#4A3B32" />
    <circle cx="90" cy="95" r="4" fill="#4A3B32" />
    {/* Nose */}
    <circle cx="80" cy="108" r="5" fill="#4A3B32" />
  </DogBase>
);

export const Corgi = (props: any) => (
  <DogBase className={props.className}>
    {/* No tail / nub */}
    <circle cx="145" cy="120" r="10" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" />
    {/* Long Body */}
    <rect x="70" y="115" width="70" height="40" rx="20" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" />
    {/* White Belly */}
    <path d="M 75 145 Q 105 160 135 145 Z" fill="#FFF9F2" />
    {/* Short Legs */}
    <rect x="75" y="150" width="14" height="20" rx="7" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <rect x="120" y="150" width="14" height="20" rx="7" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Big Head */}
    <circle cx="70" cy="95" r="32" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" />
    {/* Huge Ears */}
    <path d="M 45 75 L 20 30 L 60 65 Z" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 40 70 L 25 35 L 50 60 Z" fill="#FDF0CC" />
    <path d="M 95 75 L 120 30 L 80 65 Z" fill="#E88A35" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 100 70 L 115 35 L 90 60 Z" fill="#FDF0CC" />
    {/* Face Markings */}
    <path d="M 70 80 Q 90 100 70 120 Q 50 100 70 80" fill="#FFF9F2" />
    <circle cx="70" cy="110" r="16" fill="#FFF9F2" />
    {/* Eyes */}
    <circle cx="55" cy="90" r="5" fill="#4A3B32" />
    <circle cx="85" cy="90" r="5" fill="#4A3B32" />
    <circle cx="53" cy="88" r="2" fill="#FFF" />
    <circle cx="83" cy="88" r="2" fill="#FFF" />
    {/* Nose & Smile */}
    <ellipse cx="70" cy="105" rx="7" ry="5" fill="#4A3B32" />
    <path d="M 60 115 Q 70 125 80 115" fill="none" stroke="#4A3B32" strokeWidth="3" strokeLinecap="round" />
  </DogBase>
);

export const Husky = (props: any) => (
  <DogBase className={props.className}>
    {/* Fluffy Tail */}
    <path d="M 130 110 C 170 80, 180 140, 150 145 C 130 150, 140 120, 130 110" fill="#7C8B99" stroke="#4A3B32" strokeWidth="4" />
    <path d="M 145 142 C 165 140, 170 100, 155 105" fill="#FFF9F2" />
    {/* Body */}
    <ellipse cx="100" cy="135" rx="45" ry="35" fill="#7C8B99" stroke="#4A3B32" strokeWidth="4" />
    <ellipse cx="100" cy="148" rx="35" ry="20" fill="#FFF9F2" />
    {/* Legs */}
    <rect x="70" y="160" width="14" height="28" rx="7" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    <rect x="116" y="160" width="14" height="28" rx="7" fill="#FFF9F2" stroke="#4A3B32" strokeWidth="4" />
    {/* Head */}
    <circle cx="80" cy="95" r="35" fill="#7C8B99" stroke="#4A3B32" strokeWidth="4" />
    {/* Pointy Ears */}
    <path d="M 55 75 L 45 35 L 75 65 Z" fill="#7C8B99" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 53 70 L 48 45 L 68 62 Z" fill="#FFF9F2" />
    <path d="M 105 75 L 115 35 L 85 65 Z" fill="#7C8B99" stroke="#4A3B32" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 107 70 L 112 45 L 92 62 Z" fill="#FFF9F2" />
    {/* Husky Mask / Face markings */}
    <path d="M 45 95 Q 80 80 115 95 Q 110 125 80 125 Q 50 125 45 95 Z" fill="#FFF9F2" />
    <path d="M 72 70 L 80 90 L 88 70 Z" fill="#7C8B99" />
    {/* Angry/Intense Eyes (Husky glare) */}
    <path d="M 55 90 Q 60 85 68 90 L 65 95 Z" fill="#7BC4C4" stroke="#4A3B32" strokeWidth="2" />
    <path d="M 105 90 Q 100 85 92 90 L 95 95 Z" fill="#7BC4C4" stroke="#4A3B32" strokeWidth="2" />
    <circle cx="63" cy="92" r="2" fill="#4A3B32" />
    <circle cx="97" cy="92" r="2" fill="#4A3B32" />
    {/* Nose */}
    <ellipse cx="80" cy="110" rx="7" ry="5" fill="#4A3B32" />
    {/* Mouth */}
    <path d="M 70 118 Q 80 123 90 118" fill="none" stroke="#4A3B32" strokeWidth="2" strokeLinecap="round" />
  </DogBase>
);

export const DogIllustration = ({ breed, className }: { breed: string, className?: string }) => {
  switch (breed) {
    case 'Shiba Inu': return <ShibaInu className={className} />;
    case 'Golden Retriever': return <GoldenRetriever className={className} />;
    case 'Dalmatian': return <Dalmatian className={className} />;
    case 'Poodle': return <Poodle className={className} />;
    case 'Corgi': return <Corgi className={className} />;
    case 'Husky': return <Husky className={className} />;
    default: return <GoldenRetriever className={className} />;
  }
};
