'use client';

import React from 'react';

type NeonIconProps = {
  size?: number;
  className?: string;
};

let uidCounter = 0;
const nextId = () => `neon-${++uidCounter}`;

const NeonIcon: React.FC<{
  id: string;
  size?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ id, size = 24, className, children }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`url(#${id})`}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`neon-icon ${className || ''}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22e0ff" />
          <stop offset="50%" stopColor="#ffe14d" />
          <stop offset="100%" stopColor="#ff4fd8" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
};

export const RocketIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </NeonIcon>
  );
};

export const FolderIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </NeonIcon>
  );
};

export const InboxIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </NeonIcon>
  );
};

export const FileIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </NeonIcon>
  );
};

export const ClipboardIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h4" />
    </NeonIcon>
  );
};

export const CheckIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M20 6L9 17l-5-5" />
    </NeonIcon>
  );
};

export const DownloadIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </NeonIcon>
  );
};

export const PrinterIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </NeonIcon>
  );
};

export const ScrollIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M6 19a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </NeonIcon>
  );
};

export const HomeIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </NeonIcon>
  );
};

export const InfoIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </NeonIcon>
  );
};

export const CalendarIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </NeonIcon>
  );
};

export const SunIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </NeonIcon>
  );
};

export const MoonIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </NeonIcon>
  );
};

export const LogoutIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </NeonIcon>
  );
};

export const LoginIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5M15 12H3" />
    </NeonIcon>
  );
};

export const LockIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </NeonIcon>
  );
};

export const AlertIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </NeonIcon>
  );
};

export const PlusIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M12 5v14M5 12h14" />
    </NeonIcon>
  );
};

export const XIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M18 6L6 18M6 6l12 12" />
    </NeonIcon>
  );
};

export const PaperclipIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </NeonIcon>
  );
};

export const LoaderIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a10 10 0 0 1 10 10M22 12h-3M2 12h3M12 22a10 10 0 0 1-10-10" />
    </NeonIcon>
  );
};

export const SparkleIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <path d="M12 3l1.9 4.9L19 9.8l-5.1 1.9L12 16.6l-1.9-4.9L5 9.8l5.1-1.9z" />
      <path d="M19 3l.7 1.8L21.5 5.5l-1.8.7L19 8l-.7-1.8-1.8-.7 1.8-.7z" />
      <path d="M5 15l.55 1.45L7 17l-1.45.55L5 19l-.55-1.45L3 17l1.45-.55z" />
    </NeonIcon>
  );
};

export const TargetIcon: React.FC<NeonIconProps> = (p) => {
  const id = React.useMemo(nextId, []);
  return (
    <NeonIcon id={id} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="url(#id)" stroke="none" />
    </NeonIcon>
  );
};
