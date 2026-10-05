import React from 'react'

const base = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
}

export const IconSearch = ({ className }) => (
    <svg {...base} className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
)
export const IconPlus = ({ className }) => (
    <svg {...base} className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
)
export const IconPaperclip = ({ className }) => (
    <svg {...base} className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
)
export const IconMic = ({ className }) => (
    <svg {...base} className={className}><path d="M12 19v3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" /></svg>
)
export const IconArrowRight = ({ className }) => (
    <svg {...base} className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)
export const IconMenu = ({ className }) => (
    <svg {...base} className={className}><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
)
export const IconX = ({ className }) => (
    <svg {...base} className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)
export const IconMessage = ({ className }) => (
    <svg {...base} className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
)
export const IconSparkles = ({ className }) => (
    <svg {...base} className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" /></svg>
)
export const IconZap = ({ className }) => (
    <svg {...base} className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
)
export const IconTarget = ({ className }) => (
    <svg {...base} className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
)
export const IconChevronRight = ({ className }) => (
    <svg {...base} className={className}><path d="m9 18 6-6-6-6" /></svg>
)
export const IconMail = ({ className }) => (
    <svg {...base} className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
)
export const IconLock = ({ className }) => (
    <svg {...base} className={className}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)
export const IconUser = ({ className }) => (
    <svg {...base} className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)
export const IconEye = ({ className }) => (
    <svg {...base} className={className}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const IconEyeOff = ({ className }) => (
    <svg {...base} className={className}><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 8 10 8a17 17 0 0 1-2.29 3.36M6.1 6.1C3.2 7.9 2 12 2 12s3.5 8 10 8a9.7 9.7 0 0 0 5.15-1.45" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></svg>
)
export const IconAlert = ({ className }) => (
    <svg {...base} className={className}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
)
export const IconTrash = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);
