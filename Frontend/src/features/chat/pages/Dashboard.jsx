import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'
import BulldogLogo from '../../../components/brand/BulldogLogo'
import FloatingParticles from '../../../components/brand/FloatingParticles'
import {
    IconPlus,
    IconPaperclip,
    IconMic,
    IconArrowRight,
    IconMenu,
    IconX,
    IconMessage,
    IconSparkles,
    IconZap,
    IconTarget,
    IconSearch,
    IconChevronRight,
} from '../../../components/icons'


const SUGGESTED_PROMPTS = [
    { text: "Oi, what's Vought hiding this week?", icon: IconSearch, color: "text-cyan-400" },
    { text: "Break down Compound V for me, mate", icon: IconZap, color: "text-yellow-400" },
    { text: "How do I track a supe's movements?", icon: IconTarget, color: "text-red-400" },
    { text: "Find dirt on Tek Knight's deals", icon: IconSparkles, color: "text-purple-400" },
    { text: "Analyze Homelander's psych profile", icon: IconMessage, color: "text-blue-400" },
    { text: "Best tactics for a stealth op", icon: IconZap, color: "text-green-400" },
];


const MessageBubble = ({ message, index }) => {
    const isUser = message.role === 'user';
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className={`flex items-start gap-4 max-w-3xl mx-auto w-full transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    <BulldogLogo className="w-8 h-8" />
                </div>
            )}

            <div className={`flex-1 ${isUser ? 'ml-auto' : ''}`}>
                <div className={`inline-block max-w-full p-4 rounded-2xl border ${isUser
                    ? 'bg-linear-to-br from-blue-600/15 to-cyan-600/10 text-gray-100 rounded-tr-sm border-cyan-500/20 ml-auto'
                    : 'bg-[#111827]/80 backdrop-blur-sm text-gray-200 rounded-tl-sm border-white/5'
                    }`}>
                    {isUser ? <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p> : <ReactMarkdown
                        components={{
                            p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                            ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                            ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                            code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                            pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
                        }}
                        remarkPlugins={[remarkGfm]}
                    >
                        {message.content}
                    </ReactMarkdown>}
                </div>
                <div className={`mt-1.5 font-mono text-[10px] uppercase tracking-wide text-gray-600 ${isUser ? 'text-right' : 'text-left'}`}>
                    Just now
                </div>
            </div>


            {isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                    You
                </div>
            )}
        </div>
    );
};


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
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value]);

    return (
        <div className="sticky bottom-0 bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-white/5 p-4">
            <div className="max-w-3xl mx-auto">
                <div className="relative group">
                    {/* Gradient border glow */}
                    <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-50 group-focus-within:opacity-100 transition-opacity" />

                    <div className="relative bg-[#111827] rounded-2xl border border-white/10 focus-within:border-cyan-500/30 transition-colors shadow-xl">
                        <div className="flex items-end gap-2 p-3">
                            <button type="button" className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors shrink-0">
                                <IconPaperclip className="w-5 h-5" />
                            </button>

                            <textarea
                                ref={textareaRef}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask Oi anything..."
                                rows={1}
                                className="flex-1 bg-transparent text-gray-200 placeholder-gray-600 text-sm resize-none outline-none py-2 max-h-32 custom-scrollbar"
                                disabled={disabled}
                            />

                            <div className="flex items-center gap-1 shrink-0">
                                <button type="button" className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors">
                                    <IconMic className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={!value.trim() || disabled}
                                    className={`p-2 rounded-lg transition-all duration-200 ${value.trim() && !disabled
                                        ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105'
                                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    <IconArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-700 mt-2">
                    Oi can make mistakes. Consider checking important information. • Press Enter to send
                </p>
            </div>
        </div>
    );
};


const EmptyState = ({ onPromptClick }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);

    return (
        <div className={`flex-1 flex flex-col items-center justify-center px-4 py-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            {/* Large Logo */}
            <div className="relative mb-8">
                <div className="absolute -inset-8 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="relative w-24 h-24 rounded-2xl bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                    <BulldogLogo className="w-16 h-16" animated />
                </div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Oi, <span className="text-cyan-400">mate.</span>
            </h2>
            <p className="text-lg text-gray-500 mb-10 text-center max-w-md">
                What are we looking for today? Ask me anything — I don't pull punches.
            </p>

            {/* Suggested Prompts Grid */}
            <div className="w-full max-w-2xl">
                <p className="mb-3 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">
                    Pick a lead
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SUGGESTED_PROMPTS.map((prompt, index) => (
                        <button
                            key={index}
                            onClick={() => onPromptClick(prompt.text)}
                            className={`flex items-center gap-3 p-4 rounded-xl bg-[#111827] border border-white/5 hover:border-cyan-500/30 hover:bg-[#1a2234] transition-all duration-300 group text-left ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                            style={{ transitionDelay: `${index * 75 + 200}ms` }}
                        >
                            <div className={`w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                                <prompt.icon className={`w-4 h-4 ${prompt.color}`} />
                            </div>
                            <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                                {prompt.text}
                            </span>
                            <IconChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Dashboard = () => {

    const chat = useChat()

    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [activeChat, setActiveChat] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const chats = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state) => state.chat.currentChatId)
    const messagesEndRef = useRef(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        chat.initializeSocketConnection(),
            chat.handleGetChats()
    }, [])

    useEffect(() => {
        // When a new chat is created (from prompt click), sync activeChat with Redux currentChatId
        if (currentChatId && activeChat === null) {
            setActiveChat(currentChatId);
        }
    }, [currentChatId])

    useEffect(() => {
        scrollToBottom();
    }, [chats, activeChat]);

    const handleNewChat = () => {
        setActiveChat(null);
        setInputValue('');
        setIsOpen(false);
    };

    const handlePromptClick = (promptText) => {
        setInputValue(promptText);
        setTimeout(() => {
            // If no active chat, the message will create a new one
            const chatIdToUse = activeChat || null;
            chat.handleSendMessage({ message: promptText, chatId: chatIdToUse })
        }, 100);
    };

    const openChat = (chatId) => {
        setActiveChat(chatId)
        setIsOpen(false);

        chat.handleOpenChat(chatId, chats)
    }



    const handleSubmitMessage = (e) => {
        e.preventDefault()

        if (!inputValue.trim() || isThinking) return;

        const chatIdToUse = activeChat || null;
        chat.handleSendMessage({ message: inputValue.trim(), chatId: chatIdToUse })

        setInputValue('')

        // chat.handleGetChats()
    };


    return (

        <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">

            {/* Custom Styles & Animations */}
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
                    .animate-float { animation: float linear infinite; }
                    .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
                    .animate-ping-slow-delayed { animation: ping-slow-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s; }
                    .animate-eye-scan { animation: eye-scan 2s ease-in-out infinite; }
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4B5563; }
                    @media (prefers-reduced-motion: reduce) {
                        .animate-float, .animate-ping-slow, .animate-ping-slow-delayed,
                        .animate-eye-scan, .animate-pulse { animation: none !important; }
                    }
                `}</style>

            <FloatingParticles />

            {/* Mobile backdrop, closes the sidebar on tap outside */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                />
            )}

            <aside className={`fixed top-0 left-0 z-50 h-full w-70 bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

                {/* Logo */}
                <div className="p-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <BulldogLogo className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">Oi</h1>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">AI Search</p>
                        </div>
                    </div>
                </div>


                {/* New Chat Button */}
                <div className="p-4">
                    <button
                        onClick={handleNewChat}
                        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <IconPlus className="w-4 h-4" />
                        <span>New Chat</span>
                    </button>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 custom-scrollbar">
                    <div className="px-3 py-2 font-mono text-[10px] font-semibold text-gray-600 uppercase tracking-[0.2em]">
                        Recent Chats
                    </div>

                    {Object.values(chats).map((chatItem) => (
                        <button
                            onClick={() => { openChat(chatItem.id) }}
                            key={chatItem.id}
                            type='button'
                            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group ${currentChatId === chatItem.id
                                ? 'bg-white/5 border border-white/10 shadow-lg shadow-black/20'
                                : 'hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <IconMessage className={`w-4 h-4 mt-0.5 shrink-0 ${currentChatId === chatItem.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'
                                }`} />

                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${currentChatId === chatItem.id ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'
                                    }`}>
                                    {chatItem.title}
                                </p>
                                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-gray-600">1 day ago</p>
                            </div>
                            {currentChatId === chatItem.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>


                {/* Bottom Info */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                        <BulldogLogo className="w-6 h-6" />
                        <div>
                            <p className="text-xs font-medium text-gray-400">Oi Assistant</p>
                            <p className="font-mono text-[10px] uppercase tracking-wide text-gray-600">v2.4.0 • Online</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="md:ml-70 min-h-screen flex flex-col relative z-10">

                {/* Header */}

                <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 px-4 py-3">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsOpen((v) => !v)}
                                className="md:hidden p-2 -ml-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"
                                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isOpen ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
                            </button>

                            {activeChat && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-sm font-medium text-gray-300">
                                        {chats[activeChat]?.title || 'New Chat'}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Online
                            </div>
                        </div>
                    </div>
                </header>


                <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 flex-1 flex flex-col">
                    {activeChat === null ? (
                        <EmptyState onPromptClick={handlePromptClick} />
                    ) : (
                        <>
                            {chats[activeChat]?.messages?.length > 0 ? (
                                chats[activeChat].messages.map((message, index) => (
                                    <MessageBubble key={index} message={message} index={index} />
                                ))
                            ) : (
                                <div className="text-center text-gray-500">No messages yet. Start a conversation!</div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                <InputArea
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleSubmitMessage}
                    disabled={isThinking}
                />
            </main>
        </div>

    )
}

export default Dashboard
