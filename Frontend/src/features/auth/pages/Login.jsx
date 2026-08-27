import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import ScanPanel from '../../../components/brand/ScanPanel'
import BulldogLogo from '../../../components/brand/BulldogLogo'
import { IconMail, IconLock, IconEye, IconEyeOff, IconAlert, IconArrowRight } from '../../../components/icons'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)


    const { handleLogin } = useAuth()

    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()

        const payload = {
            email,
            password,
        }

        const result = await handleLogin(payload)

        if (result?.success) {
            navigate("/")
        }

    }

    if (!loading && user) {
        return <Navigate to="/" replace />
        // agar maine login kr liya toh peeche ka page login ho jayega toh back jaane pe login khul jayega kyoki woh history mein save rahega lekin agar replace hoga toh history delete ho jayega 
    }

    return (
        <section className="min-h-screen w-full bg-[#08090B] text-zinc-100 lg:grid lg:grid-cols-2">
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                    75% { transform: translateY(-30px) translateX(5px); }
                }
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 0.3; }
                    50% { opacity: 0.1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes ping-slow-delayed {
                    0% { transform: scale(1); opacity: 0.2; }
                    50% { opacity: 0.05; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
                @keyframes eye-scan {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-3px); }
                    75% { transform: translateX(3px); }
                }
                @keyframes scan-sweep {
                    0% { transform: translateY(-100%); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(700%); opacity: 0; }
                }
                .animate-float { animation: float linear infinite; }
                .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
                .animate-ping-slow-delayed { animation: ping-slow-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s; }
                .animate-eye-scan { animation: eye-scan 2s ease-in-out infinite; }
                .animate-scan-sweep { animation: scan-sweep 6s linear infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .animate-float, .animate-ping-slow, .animate-ping-slow-delayed,
                    .animate-eye-scan, .animate-scan-sweep, .animate-pulse { animation: none !important; }
                }
            `}</style>

            <ScanPanel
                eyebrow="Secure channel"
                title="Welcome back to the watch."
                highlight="watch."
                subtitle="Oi keeps digging while you're away. Sign in to pick up the thread — every lead, every file, right where you left it."
                tags={['Live monitoring', 'Zero spin', 'Receipts kept']}
            />

            <div className="relative flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
                <div className="pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

                <div className="relative mx-auto w-full max-w-sm">
                    <div className="mb-10 flex items-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 bg-linear-to-br from-gray-800 to-gray-900">
                            <BulldogLogo className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-lg font-bold tracking-tight text-white">Oi</p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Watch Terminal</p>
                        </div>
                    </div>

                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/80">Sign in</p>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Good to see you.
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Enter your details to get back on the case.
                    </p>

                    {error && (
                        <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={submitForm} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                                Email
                            </label>
                            <div className="relative">
                                <IconMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-[#111827]/70 py-3 pl-10 pr-4 text-zinc-100 outline-none backdrop-blur transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                                Password
                            </label>
                            <div className="relative">
                                <IconLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-[#111827]/70 py-3 pl-10 pr-11 text-zinc-100 outline-none backdrop-blur transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <IconEyeOff className="h-4 w-4" /> : <IconEye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-cyan-500 hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Signing in…' : 'Sign in'}
                            {!loading && <IconArrowRight className="h-4 w-4" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-400">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="font-semibold text-cyan-400 transition hover:text-cyan-300">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Login