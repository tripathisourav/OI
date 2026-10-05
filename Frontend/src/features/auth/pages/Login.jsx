import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'

const IconBulldog = ({ className }) => (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>
        </defs>
        <path d="M20 85 L25 75 L30 85 L35 75 L40 85 L45 75 L50 85 L55 75 L60 85 L65 75 L70 85 L75 75 L80 85 L85 75 L90 85 L95 75 L100 85" fill="#374151" stroke="#6B7280" strokeWidth="2" />
        <path d="M25 80 C25 50 30 20 60 20 C90 20 95 50 95 80 C95 95 85 105 60 105 C35 105 25 95 25 80Z" fill="url(#lg)" stroke="#6B7280" strokeWidth="2" />
        <circle cx="42" cy="55" r="10" fill="#111827" stroke="#4B5563" strokeWidth="2" />
        <circle cx="42" cy="55" r="5" fill="#06B6D4" />
        <circle cx="44" cy="53" r="2" fill="white" opacity="0.8" />
        <path d="M68 50 Q78 55 88 50" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="60" cy="72" rx="12" ry="8" fill="#111827" stroke="#4B5563" strokeWidth="2" />
        <path d="M45 85 Q60 92 75 85" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.1 + 0.03,
    }));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div key={p.id} className="absolute rounded-full bg-cyan-400 animate-float"
                    style={{
                        width: p.size, height: p.size,
                        left: `${p.left}%`, top: `${p.top}%`,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        filter: 'blur(1px)',
                    }} />
            ))}
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        const result = await handleLogin({ email, password })
        if (result?.success) navigate("/")
    }

    if (!loading && user) return <Navigate to="/" replace />

    return (
        <section className="min-h-screen bg-void relative overflow-hidden flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-aurora" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '-7s' }} />
            <div className="absolute inset-0 noise-bg" />
            <FloatingParticles />

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-surface/60 backdrop-blur-2xl rounded-3xl border border-white/[0.06] shadow-2xl shadow-black/50 p-8 sm:p-10">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-lg" />
                            <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-xl">
                                <IconBulldog className="w-10 h-10" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Welcome back</span>
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">Sign in to continue to Oi</p>
                    </div>

                    <form onSubmit={submitForm} className="space-y-5">
                        {error && (
                            <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {error}
                            </p>
                        )}
                        <div className="group">
                            <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-black/40"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:bg-black/40"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-3.5 text-sm font-bold text-black shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">{loading ? 'Signing in...' : 'Sign In'}</span>
                        </button>
                    </form>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors relative group">
                            Create one
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login