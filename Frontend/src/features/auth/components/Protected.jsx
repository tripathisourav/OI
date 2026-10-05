import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '-2s' }} />
                
                <div className="relative flex flex-col items-center gap-5">
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl animate-pulse" />
                        <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-2xl">
                            <svg viewBox="0 0 120 120" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4B5563" />
                                        <stop offset="100%" stopColor="#1F2937" />
                                    </linearGradient>
                                </defs>
                                <path d="M20 85 L25 75 L30 85 L35 75 L40 85 L45 75 L50 85 L55 75 L60 85 L65 75 L70 85 L75 75 L80 85 L85 75 L90 85 L95 75 L100 85" fill="#374151" stroke="#6B7280" strokeWidth="2" />
                                <path d="M25 80 C25 50 30 20 60 20 C90 20 95 50 95 80 C95 95 85 105 60 105 C35 105 25 95 25 80Z" fill="url(#pg)" stroke="#6B7280" strokeWidth="2" />
                                <circle cx="42" cy="55" r="10" fill="#111827" stroke="#4B5563" strokeWidth="2" />
                                <circle cx="42" cy="55" r="5" fill="#06B6D4" className="animate-pulse" />
                                <circle cx="44" cy="53" r="2" fill="white" opacity="0.8" />
                                <path d="M68 50 Q78 55 88 50" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                                <ellipse cx="60" cy="72" rx="12" ry="8" fill="#111827" stroke="#4B5563" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-thinking" />
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-thinking" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-thinking" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <p className="text-xs text-gray-600 font-medium tracking-wide uppercase">Authenticating</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return children;
}

export default Protected
