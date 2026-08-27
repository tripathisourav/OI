import React from 'react'
import BulldogLogo from './BulldogLogo'
import FloatingParticles from './FloatingParticles'

/**
 * The signature "watchtower" panel used on auth screens.
 * A dark, grid-lined surface with a sweeping scanline behind the mark —
 * the visual promise that Oi is always watching, even while you sign in.
 */
const ScanPanel = ({ eyebrow, title, highlight, subtitle, tags = [] }) => {
    const hasHighlight = highlight && title.includes(highlight)
    const [before, after] = hasHighlight ? title.split(highlight) : [title, '']

    return (
        <div className="relative hidden h-full flex-col justify-between overflow-hidden border-r border-white/5 bg-[#08090B] lg:flex">
            {/* grid backdrop */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)',
                    backgroundSize: '42px 42px',
                }}
            />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
            <FloatingParticles className="absolute inset-0" count={16} />

            {/* scanline sweep */}
            <div className="absolute inset-x-0 top-0 h-32 animate-scan-sweep bg-linear-to-b from-transparent via-cyan-400/10 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 px-10 pt-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900 shadow-lg shadow-cyan-500/10">
                    <BulldogLogo className="h-7 w-7" />
                </div>
                <div>
                    <p className="text-lg font-bold tracking-tight text-white">Oi</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Watch Terminal</p>
                </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 text-center">
                <div className="relative mb-8">
                    <div className="absolute -inset-6 animate-pulse rounded-full bg-linear-to-r from-cyan-500/20 to-blue-500/20 blur-2xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl shadow-cyan-500/20">
                        <BulldogLogo className="h-16 w-16" animated />
                    </div>
                </div>

                {eyebrow && (
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/80">{eyebrow}</p>
                )}
                <h2 className="max-w-sm text-3xl font-bold leading-tight tracking-tight text-white">
                    {before}
                    {hasHighlight && <span className="text-cyan-400">{highlight}</span>}
                    {after}
                </h2>
                {subtitle && (
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">{subtitle}</p>
                )}
            </div>

            {tags.length > 0 && (
                <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 px-10 py-6">
                    {tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">{tag}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ScanPanel
