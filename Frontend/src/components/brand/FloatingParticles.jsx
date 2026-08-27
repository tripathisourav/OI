import React from 'react'

const FloatingParticles = ({ count = 20, className = 'fixed inset-0 z-0' }) => {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.15 + 0.05,
    }))

    return (
        <div className={`pointer-events-none overflow-hidden ${className}`}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute animate-float rounded-full bg-cyan-400"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        filter: 'blur(1px)',
                    }}
                />
            ))}
        </div>
    )
}

export default FloatingParticles
