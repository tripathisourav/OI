import React from 'react'

// The "Oi" watchdog mark — always scanning, never blinking on the job.
const BulldogLogo = ({ className = 'w-12 h-12', animated = false }) => {
    return (
        <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bulldogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4B5563" />
                    <stop offset="100%" stopColor="#1F2937" />
                </linearGradient>
                <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="100%" stopColor="#111827" />
                </linearGradient>
            </defs>

            {/* Spiked Collar */}
            <path d="M20 85 L25 75 L30 85 L35 75 L40 85 L45 75 L50 85 L55 75 L60 85 L65 75 L70 85 L75 75 L80 85 L85 75 L90 85 L95 75 L100 85"
                fill="url(#collarGrad)" stroke="#6B7280" strokeWidth="2" />

            {/* Main Head Shape */}
            <path d="M25 80 C25 50 30 20 60 20 C90 20 95 50 95 80 C95 95 85 105 60 105 C35 105 25 95 25 80Z"
                fill="url(#bulldogGrad)" stroke="#6B7280" strokeWidth="2" />

            {/* Left Ear */}
            <path d="M28 35 C20 25 15 30 22 42 Z" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />

            {/* Right Ear */}
            <path d="M92 35 C100 25 105 30 98 42 Z" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />

            {/* Left Eye (Open - scanning when animated) */}
            <g className={animated ? 'animate-eye-scan' : ''}>
                <circle cx="42" cy="55" r="10" fill="#111827" stroke="#4B5563" strokeWidth="2" />
                <circle cx="42" cy="55" r="5" fill="#06B6D4" className={animated ? 'animate-pulse' : ''} />
                <circle cx="44" cy="53" r="2" fill="white" opacity="0.8" />
            </g>

            {/* Right Eye (Squinted - mischievous) */}
            <path d="M68 50 Q78 55 88 50" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
            <path d="M72 52 Q78 58 84 52" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" className={animated ? 'animate-pulse' : ''} />

            {/* Nose */}
            <ellipse cx="60" cy="72" rx="12" ry="8" fill="#111827" stroke="#4B5563" strokeWidth="2" />
            <ellipse cx="60" cy="70" rx="6" ry="3" fill="#374151" opacity="0.5" />

            {/* Mouth / Smirk */}
            <path d="M45 85 Q60 92 75 85" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <path d="M70 83 Q75 85 78 82" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />

            {/* Wrinkle lines */}
            <path d="M50 35 Q60 38 70 35" fill="none" stroke="#4B5563" strokeWidth="1" opacity="0.6" />
            <path d="M52 40 Q60 42 68 40" fill="none" stroke="#4B5563" strokeWidth="1" opacity="0.4" />

            {/* Cyan accent when animated */}
            {animated && (
                <>
                    <circle cx="60" cy="60" r="55" fill="none" stroke="#06B6D4" strokeWidth="1" opacity="0.3" className="animate-ping-slow" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.2" className="animate-ping-slow-delayed" />
                </>
            )}
        </svg>
    )
}

export default BulldogLogo
