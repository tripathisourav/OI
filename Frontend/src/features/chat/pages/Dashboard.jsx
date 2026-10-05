import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'

/* ── Icons ── */
const IconSearch = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
const IconPlus = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
);
const IconPaperclip = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
);
const IconMic = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 19v3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" /></svg>
);
const IconMenu = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
);
const IconMessage = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
const IconSparkles = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" /></svg>
);
const IconZap = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconTarget = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
);
const IconChevronRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>
);
const IconArrowRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const IconTrash = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);
const IconSidebar = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <line x1="9" y1="5" x2="9" y2="19" />
    </svg>
);

/* ── Constants ── */
const SUGGESTED_PROMPTS = [
    { text: "Oi, what's Vought hiding this week?", icon: IconSearch, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { text: "Break down Compound V for me, mate", icon: IconZap, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { text: "How do I track a supe's movements?", icon: IconTarget, color: "text-red-400", bg: "bg-red-400/10" },
    { text: "Find dirt on Tek Knight's deals", icon: IconSparkles, color: "text-purple-400", bg: "bg-purple-400/10" },
    { text: "Analyze Homelander's psych profile", icon: IconMessage, color: "text-blue-400", bg: "bg-blue-400/10" },
    { text: "Best tactics for a stealth op", icon: IconZap, color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

/* ── Bulldog Logo ── */
const BulldogLogo = ({ className = "w-12 h-12", animated = false }) => (
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
        <path d="M20 85 L25 75 L30 85 L35 75 L40 85 L45 75 L50 85 L55 75 L60 85 L65 75 L70 85 L75 75 L80 85 L85 75 L90 85 L95 75 L100 85"
            fill="url(#collarGrad)" stroke="#6B7280" strokeWidth="2" />
        <path d="M25 80 C25 50 30 20 60 20 C90 20 95 50 95 80 C95 95 85 105 60 105 C35 105 25 95 25 80Z"
            fill="url(#bulldogGrad)" stroke="#6B7280" strokeWidth="2" />
        <path d="M28 35 C20 25 15 30 22 42 Z" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
        <path d="M92 35 C100 25 105 30 98 42 Z" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
        <g className={animated ? "animate-eye-scan" : ""}>
            <circle cx="42" cy="55" r="10" fill="#111827" stroke="#4B5563" strokeWidth="2" />
            <circle cx="42" cy="55" r="5" fill="#06B6D4" className={animated ? "animate-pulse" : ""} />
            <circle cx="44" cy="53" r="2" fill="white" opacity="0.8" />
        </g>
        <path d="M68 50 Q78 55 88 50" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        <path d="M72 52 Q78 58 84 52" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" className={animated ? "animate-pulse" : ""} />
        <ellipse cx="60" cy="72" rx="12" ry="8" fill="#111827" stroke="#4B5563" strokeWidth="2" />
        <ellipse cx="60" cy="70" rx="6" ry="3" fill="#374151" opacity="0.5" />
        <path d="M45 85 Q60 92 75 85" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 83 Q75 85 78 82" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 35 Q60 38 70 35" fill="none" stroke="#4B5563" strokeWidth="1" opacity="0.6" />
        <path d="M52 40 Q60 42 68 40" fill="none" stroke="#4B5563" strokeWidth="1" opacity="0.4" />
        {animated && (
            <>
                <circle cx="60" cy="60" r="55" fill="none" stroke="#06B6D4" strokeWidth="1" opacity="0.3" className="animate-ping-slow" />
                <circle cx="60" cy="60" r="48" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.2" className="animate-ping-slow" style={{ animationDelay: '0.5s' }} />
            </>
        )}
    </svg>
);

/* ── Floating Particles ── */
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.08 + 0.02,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-400 animate-float"
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
    );
};

/* ── Aurora Background ── */
const AuroraBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[120px] animate-aurora" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] animate-aurora" style={{ animationDelay: '-14s' }} />
        <div className="absolute inset-0 noise-bg" />
    </div>
);

/* ── Thinking Indicator ── */
const ThinkingIndicator = () => (
    <div className="flex items-start gap-4 max-w-3xl mx-auto w-full animate-message-in">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <BulldogLogo className="w-7 h-7" animated />
        </div>
        <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#111827]/80 backdrop-blur-sm border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-thinking" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-thinking" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-thinking" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="mt-1.5 text-[11px] text-gray-600 font-medium">Oi is thinking...</p>
        </div>
    </div>
);

/* ── Message Bubble ── */
const MessageBubble = ({ message, index }) => {
    const isUser = message.role === 'user';
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), index * 80);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className={`flex items-start gap-3.5 max-w-3xl mx-auto w-full transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    <BulldogLogo className="w-7 h-7" />
                </div>
            )}

            <div className={`flex-1 ${isUser ? 'ml-auto' : ''}`}>
                <div className={`inline-block max-w-full p-4 rounded-2xl border ${isUser
                    ? 'bg-[#1a1a1a] text-gray-100 rounded-tr-sm border-white/[0.06] ml-auto'
                    : 'bg-[#111111]/70 backdrop-blur-md text-gray-200 rounded-tl-sm border-white/[0.04]'
                    }`}>
                    {isUser ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <ReactMarkdown
                            components={{
                                p: ({ children }) => <p className='mb-3 last:mb-0 leading-relaxed text-sm'>{children}</p>,
                                ul: ({ children }) => <ul className='mb-3 list-disc pl-5 space-y-1 text-sm'>{children}</ul>,
                                ol: ({ children }) => <ol className='mb-3 list-decimal pl-5 space-y-1 text-sm'>{children}</ol>,
                                li: ({ children }) => <li className='text-gray-300'>{children}</li>,
                                code: ({ inline, children }) => inline
                                    ? <code className='rounded-md bg-white/[0.08] px-1.5 py-0.5 text-xs font-mono text-cyan-300 border border-white/[0.06]'>{children}</code>
                                    : <code className='text-xs font-mono'>{children}</code>,
                                pre: ({ children }) => (
                                    <pre className='mb-3 overflow-x-auto rounded-xl bg-black/40 border border-white/[0.06] p-4 text-xs font-mono text-gray-300 shadow-inner'>
                                        {children}
                                    </pre>
                                ),
                                h1: ({ children }) => <h1 className='text-lg font-bold mb-2 text-white'>{children}</h1>,
                                h2: ({ children }) => <h2 className='text-base font-bold mb-2 text-gray-100'>{children}</h2>,
                                h3: ({ children }) => <h3 className='text-sm font-bold mb-2 text-gray-200'>{children}</h3>,
                                blockquote: ({ children }) => <blockquote className='border-l-2 border-cyan-500/50 pl-3 my-3 text-gray-400 italic'>{children}</blockquote>,
                                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className='text-cyan-400 hover:text-cyan-300 underline underline-offset-2'>{children}</a>,
                                hr: () => <hr className='my-4 border-white/[0.06]' />,
                            }}
                            remarkPlugins={[remarkGfm]}
                        >
                            {message.content}
                        </ReactMarkdown>
                    )}
                </div>
                <div className={`mt-1 text-[11px] text-gray-600 ${isUser ? 'text-right pr-1' : 'text-left pl-1'}`}>
                    {isUser ? 'You' : 'Oi'}
                </div>
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/20">
                    Y
                </div>
            )}
        </div>
    );
};

/* ── Input Area ── */
const InputArea = ({ value, onChange, onSubmit, disabled }) => {
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
        }
    }, [value]);

    return (
        <div className="sticky bottom-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-2xl border-t border-white/[0.04] px-4 py-4">
            <div className="max-w-3xl mx-auto">
                <div className="relative group">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

                    <div className="relative bg-[#111111] rounded-2xl border border-white/[0.06] group-focus-within:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-black/50">
                        <div className="flex items-end gap-2 p-3">
                            <button type="button" className="p-2 rounded-xl hover:bg-white/[0.04] text-gray-500 hover:text-gray-300 transition-colors shrink-0">
                                <IconPaperclip className="w-5 h-5" />
                            </button>

                            <textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask Oi anything..."
                                rows={1}
                                className="flex-1 bg-transparent text-sm text-gray-200 placeholder:text-gray-600 resize-none outline-none py-2.5 max-h-32 custom-scrollbar"
                                disabled={disabled}
                            />

                            <div className="flex items-center gap-1 shrink-0">
                                <button type="button" className="p-2 rounded-xl hover:bg-white/[0.04] text-gray-500 hover:text-gray-300 transition-colors">
                                    <IconMic className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={!value.trim() || disabled}
                                    className={`p-2.5 rounded-xl transition-all duration-200 ${value.trim() && !disabled
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95'
                                        : 'bg-white/[0.04] text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    <IconArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-[11px] text-gray-700 mt-2.5 font-medium">
                    Oi can make mistakes. Consider checking important information. · Shift + Enter for new line
                </p>
            </div>
        </div>
    );
};

/* ── Empty State ── */
const EmptyState = ({ onPromptClick }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flex-1 flex flex-col items-center justify-center px-4 py-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative mb-10">
                <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-glow" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center shadow-2xl shadow-cyan-500/15">
                    <BulldogLogo className="w-14 h-14" animated />
                </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Oi, mate.
            </h2>
            <p className="text-base text-gray-500 mb-12 text-center max-w-md leading-relaxed">
                What are we looking for today? Ask me anything — I don't pull punches.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                        key={index}
                        onClick={() => onPromptClick(prompt.text)}
                        className={`flex items-center gap-3 p-4 rounded-2xl bg-[#111111]/60 border border-white/[0.04] hover:border-cyan-500/20 hover:bg-[#161616] transition-all duration-300 group text-left ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${index * 60 + 150}ms` }}
                    >
                        <div className={`w-9 h-9 rounded-xl ${prompt.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                            <prompt.icon className={`w-4 h-4 ${prompt.color}`} />
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-snug">
                            {prompt.text}
                        </span>
                        <IconChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                    </button>
                ))}
            </div>
        </div>
    );
};

/* ── Sidebar ── */
const Sidebar = ({ isOpen, setIsOpen, chats, currentChatId, onNewChat, onOpenChat, onDeleteChat }) => {
    const [hoveredChat, setHoveredChat] = useState(null);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/[0.04] flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                {/* Logo */}
                <div className="p-5 border-b border-white/[0.04] flex  items-center justify-between ">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-md" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                                <BulldogLogo className="w-7 h-7" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight">Oi</h1>
                            <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">AI Search</p>
                        </div>
                    </div>
                    <button className="cursor-ew-resize" onClick={() => {
                        if (isOpen) setIsOpen(false)
                        else setIsOpen(true);
                    }}>
                        <IconSidebar />
                    </button>
                </div>

                {/* New Chat */}
                <div className="p-4">
                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] text-sm"
                    >
                        <IconPlus className="w-4 h-4" />
                        <span>New Chat</span>
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 custom-scrollbar">
                    <div className="px-3 py-2.5 text-[11px] font-bold text-gray-600 uppercase tracking-widest">
                        Recent Chats
                    </div>

                    {Object.values(chats).sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).map((chat) => (
                        <div
                            key={chat.id}
                            className="relative group"
                            onMouseEnter={() => setHoveredChat(chat.id)}
                            onMouseLeave={() => setHoveredChat(null)}
                        >
                            <button
                                onClick={() => onOpenChat(chat.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${currentChatId === chat.id
                                    ? 'bg-white/[0.05] border border-white/[0.08] shadow-lg shadow-black/20'
                                    : 'hover:bg-white/[0.03] border border-transparent'
                                    }`}
                            >
                                <IconMessage className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${currentChatId === chat.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'}`} />

                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate transition-colors ${currentChatId === chat.id ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                        {chat.title}
                                    </p>
                                    <p className="text-[11px] text-gray-600 mt-0.5">
                                        {new Date(chat.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>

                                {currentChatId === chat.id && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                                )}
                            </button>

                            {/* Delete button on hover */}
                            {hoveredChat === chat.id && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteChat(chat.id);
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <IconTrash className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    ))}


                    {Object.keys(chats).length === 0 && (
                        <div className="px-3 py-8 text-center">
                            <p className="text-xs text-gray-600">No chats yet</p>
                            <p className="text-[11px] text-gray-700 mt-1">Start a new conversation</p>
                        </div>
                    )}
                </div>

                {/* Bottom Status */}
                <div className="p-4 border-t border-white/[0.04]">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                        <BulldogLogo className="w-7 h-7" />
                        <div className="flex-1">
                            <p className="text-xs font-medium text-gray-400">Oi Assistant</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] text-gray-600">Online · v2.4.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

/* ── Main Dashboard ── */
const Dashboard = () => {
    const chat = useChat();
    const [inputValue, setInputValue] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId);
    const isLoading = useSelector((state) => state.chat.isLoading);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        chat.initializeSocketConnection();
        chat.handleGetChats();
    }, []);

    useEffect(() => {
        if (currentChatId && activeChat === null) {
            setActiveChat(currentChatId);
        }
    }, [currentChatId]);

    useEffect(() => {
        scrollToBottom();
    }, [chats, activeChat, isLoading]);

    const handleNewChat = () => {
        setActiveChat(null);
        setInputValue('');
        setIsSidebarOpen(false);
    };

    const handlePromptClick = (promptText) => {
        setInputValue(promptText);
        setTimeout(() => {
            const chatIdToUse = activeChat || null;
            chat.handleSendMessage({ message: promptText, chatId: chatIdToUse });
        }, 100);
    };

    const openChat = (chatId) => {
        setActiveChat(chatId);
        setIsSidebarOpen(false);
        chat.handleOpenChat(chatId, chats);
    };

    const handleDeleteChat = async (chatId) => {
        // You can wire this to your deleteChat API
        // await deleteChat(chatId);
        if (activeChat === chatId) {
            setActiveChat(null);
        }
    };

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const chatIdToUse = activeChat || null;
        chat.handleSendMessage({ message: inputValue.trim(), chatId: chatIdToUse });
        setInputValue('');
    };

    return (
        <div className="min-h-screen bg-void text-gray-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
            <AuroraBackground />
            {/* <FloatingParticles /> */}

            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                chats={chats}
                currentChatId={currentChatId}
                onNewChat={handleNewChat}
                onOpenChat={openChat}
                onDeleteChat={handleDeleteChat}
            />

            <main className="md:ml-[280px] min-h-screen flex flex-col relative z-10">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-[#0a0a0a]/70 backdrop-blur-2xl border-b border-white/[0.04] px-4 py-3">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 -ml-2 rounded-xl hover:bg-white/[0.04] text-gray-400 transition-colors"
                            >
                                <IconMenu className="w-5 h-5" />
                            </button>

                            {activeChat ? (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-sm font-medium text-gray-300 truncate max-w-[200px] sm:max-w-md">
                                        {chats[activeChat]?.title || 'New Chat'}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-sm font-medium text-gray-500">New Conversation</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.04] text-[11px] text-gray-500 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Online
                            </div>
                        </div>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 min-h-[calc(100vh-180px)]">
                        {activeChat === null ? (
                            <EmptyState onPromptClick={handlePromptClick} />
                        ) : (
                            <>
                                {chats[activeChat]?.messages?.length > 0 ? (
                                    chats[activeChat].messages.map((message, index) => (
                                        <MessageBubble key={`${activeChat}-${index}`} message={message} index={index} />
                                    ))
                                ) : (
                                    <div className="flex-1 flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
                                                <IconMessage className="w-8 h-8 text-gray-700" />
                                            </div>
                                            <p className="text-sm text-gray-500">No messages yet. Start the conversation!</p>
                                        </div>
                                    </div>
                                )}
                                {isLoading && <ThinkingIndicator />}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </div>

                <InputArea
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleSubmitMessage}
                    disabled={isLoading}
                />
            </main>
        </div>
    );
};

export default Dashboard;