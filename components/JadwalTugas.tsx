'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarIcon,
  AlertIcon,
  PlusIcon,
  CheckIcon,
  FileIcon,
  PaperclipIcon,
  XIcon,
} from '@/components/icons/NeonIcons';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  done: boolean;
  fileName?: string | null;
  content?: string | null;
}

interface Props {
  initialTasks: Task[];
}

const NEAR_DAYS = 3;

export default function JadwalTugas({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [viewing, setViewing] = useState<Task | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const api = async ({
    method,
    body,
    query = '',
  }: {
    method: string;
    body?: unknown;
    query?: string;
  }) => {
    const res = await fetch(`/api/tasks${query}`, {
      method,
      headers: body instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : (body as BodyInit),
    });
    return res;
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const form = new FormData();
      form.append('title', title.trim());
      if (dueDate) form.append('dueDate', dueDate);
      if (file) form.append('file', file);

      const res = await fetch('/api/tasks', { method: 'POST', body: form });
      if (res.ok) {
        const item: Task = await res.json();
        setTasks((prev) => [item, ...prev]);
        setTitle('');
        setDueDate('');
        setFile(null);
      }
    } catch {
      // gagal menambah tugas
    }
  };

  const toggleTask = async (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    const next = !target.done;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: next } : t)));
    await api({ method: 'PATCH', body: { id, done: next } });
  };

  const removeTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (viewing?.id === id) setViewing(null);
    await api({ method: 'DELETE', query: `?id=${encodeURIComponent(id)}` });
  };

  const daysUntil = (dueDate: string): number => {
    if (!dueDate) return Infinity;
    const due = new Date(dueDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((due.getTime() - today.getTime()) / 86400000);
  };

  const isNearDeadline = (task: Task) => {
    if (task.done) return false;
    const days = daysUntil(task.dueDate);
    return days <= NEAR_DAYS;
  };

  const nearTasks = tasks.filter(isNearDeadline);
  const upcomingTasks = tasks.filter((t) => !t.done && !isNearDeadline(t));
  const doneTasks = tasks.filter((t) => t.done);

  const formatDate = (dueDate: string) =>
    new Date(dueDate + 'T00:00:00').toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatDateShort = (dueDate: string) =>
    new Date(dueDate + 'T00:00:00').toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const openPicker = () => {
    dateInputRef.current?.showPicker?.();
  };

  const dateBadge = (task: Task) => {
    const days = daysUntil(task.dueDate);
    const late = days < 0;
    if (task.done) {
      return (
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <CalendarIcon size={15} /> {formatDate(task.dueDate)}
        </p>
      );
    }
    if (late) {
      return (
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center gap-1.5">
          <AlertIcon size={16} /> Terlambat! {formatDate(task.dueDate)}
        </p>
      );
    }
    if (days === 0) {
      return (
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center gap-1.5">
          <AlertIcon size={16} /> Deadline hari ini!
        </p>
      );
    }
    if (days <= NEAR_DAYS) {
      return (
        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex flex-wrap items-center gap-x-1.5">
          <AlertIcon size={16} /> Hampir deadline — tersisa {days} hari (
          <CalendarIcon size={14} /> {formatDate(task.dueDate)})
        </p>
      );
    }
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
        <CalendarIcon size={15} /> {formatDate(task.dueDate)}
      </p>
    );
  };

  const TaskRow = ({ task }: { task: Task }) => {
    return (
      <motion.li
        layout
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="glass-soft rounded-2xl px-4 py-3 flex items-center gap-3"
      >
        <button
          onClick={() => toggleTask(task.id)}
          aria-label="Tandai selesai"
          className={`nk-btn-anim w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-sm hover:scale-110 nk-btn-glow-green ${
            task.done
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-400 dark:border-gray-500 hover:border-green-500'
          }`}
        >
          {task.done && <CheckIcon size={14} />}
        </button>
        <button onClick={() => setViewing(task)} className="nk-btn-anim flex-1 min-w-0 text-left group text-gray-800 dark:text-gray-100">
          <p
            className={`truncate font-semibold text-base ${
              task.done ? 'line-through text-gray-400 dark:text-gray-500' : 'group-hover:text-[--neon-cyan] transition'
            }`}
          >
            {task.title}
          </p>
          <div className="mt-0.5 space-y-0.5">
            {task.dueDate && dateBadge(task)}
            {task.fileName && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <PaperclipIcon size={14} /> {task.fileName}
              </p>
            )}
          </div>
        </button>
        <button
          onClick={() => removeTask(task.id)}
          aria-label="Hapus tugas"
          className="nk-btn-anim nk-btn-glow-red shrink-0 p-1.5 rounded-full text-red-500 hover:text-red-700"
        >
          <XIcon size={18} />
        </button>
      </motion.li>
    );
  };

  const SectionHeader = ({
    icon,
    titleText,
    count,
    textClass,
    badgeClass,
  }: {
    icon: React.ReactNode;
    titleText: string;
    count: number;
    textClass: string;
    badgeClass: string;
  }) => (
    <div className="flex items-center gap-2.5 mb-3">
      {icon}
      <h2 className={`text-xl font-bold ${textClass}`}>{titleText}</h2>
      <span className={`px-2 py-0.5 rounded-full ${badgeClass} text-xs font-bold`}>{count}</span>
    </div>
  );

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="hero-title">
          <span className="swash"><span className="squiggle">Jadwal</span></span>{' '}
          <span className="rot">Tugas</span>
        </h1>
        <p className="hero-note mt-4">catat &amp; pantau deadline tugasmu</p>
      </div>

      <div className="glass rounded-3xl p-5 mb-6 pr-5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Nama tugas..."
            className="flex-1 min-w-[8rem] px-5 py-3 bg-[--card-bg] border-2 border-[--card-border] text-[--ink] placeholder-[--ink-soft] focus:outline-none focus:border-[--neon-cyan] focus:shadow-[3px_3px_0_0_var(--neon-cyan)] transition"
          />
          <button
            type="button"
            onClick={openPicker}
            aria-label="Pilih tanggal"
            title={dueDate ? `Ubah tanggal: ${formatDateShort(dueDate)}` : 'Pilih tanggal'}
            className="nk-btn-anim shrink-0 flex items-center gap-2 px-3 py-2.5 bg-[#2a2d37] border-2 border-[#000] text-[--ink-soft] hover:text-[#3b2004] hover:bg-[#ffd58a] hover:border-[#a0651a] hover:shadow-[3px_3px_0_0_#a0651a] transition"
          >
            <CalendarIcon size={22} className="shrink-0" />
            {dueDate && (
              <span className="text-sm font-semibold text-[--ink] whitespace-nowrap">
                {formatDateShort(dueDate)}
              </span>
            )}
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            onClick={openPicker}
            className="js-date sr-only"
          />
          <label className="me-1 shrink-0 flex items-center gap-2 px-4 py-3 rounded-full cursor-pointer border border-[--card-border] bg-[--card-bg] text-[--ink] hover:border-[--neon-pink]/60 hover:scale-[1.03] transition text-sm">
            <PaperclipIcon size={18} className="text-[--neon-pink]" />
            <span className="max-w-[9rem] truncate">{file ? file.name : 'Lampirkan'}</span>
            <input
              type="file"
              accept=".pdf,.txt,.md,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <button
            onClick={addTask}
            className="btn-fill ml-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 font-extrabold"
          >
            <PlusIcon size={18} /> Tambah
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-soft rounded-3xl p-10 text-center text-gray-500 dark:text-gray-400">
          Belum ada tugas. Tambahkan tugas pertamamu di atas.
        </div>
      ) : (
        <div className="space-y-8">
          {nearTasks.length > 0 && (
            <section>
              <SectionHeader
                icon={<AlertIcon size={22} />}
                titleText="Hampir Deadline"
                count={nearTasks.length}
                textClass="text-orange-600 dark:text-orange-400"
                badgeClass="bg-orange-500/20 text-orange-600 dark:text-orange-300"
              />
              <AnimatePresence initial={false}>
                <motion.ul layout className="space-y-2 border-l-2 border-orange-400 pl-3">
                  {nearTasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </motion.ul>
              </AnimatePresence>
            </section>
          )}

          {upcomingTasks.length > 0 && (
            <section>
              <SectionHeader
                icon={<CalendarIcon size={22} />}
                titleText="Belum Deadline"
                count={upcomingTasks.length}
                textClass="text-gray-700 dark:text-gray-200"
                badgeClass="bg-blue-500/20 text-blue-600 dark:text-blue-300"
              />
              <AnimatePresence initial={false}>
                <motion.ul layout className="space-y-2">
                  {upcomingTasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </motion.ul>
              </AnimatePresence>
            </section>
          )}

          {doneTasks.length > 0 && (
            <section>
              <SectionHeader
                icon={<CheckIcon size={22} />}
                titleText="Tugas Selesai"
                count={doneTasks.length}
                textClass="text-green-600 dark:text-green-400"
                badgeClass="bg-green-500/20 text-green-600 dark:text-green-300"
              />
              <AnimatePresence initial={false}>
                <motion.ul layout className="space-y-2">
                  {doneTasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </motion.ul>
              </AnimatePresence>
            </section>
          )}
        </div>
      )}

      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setViewing(null)}
        >
          <div
            className="glass rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-gray-100 truncate">{viewing.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-400">
                  {viewing.dueDate && (
                    <span className="text-sm flex items-center gap-1">
                      <CalendarIcon size={15} /> {formatDate(viewing.dueDate)}
                    </span>
                  )}
                  {viewing.fileName && (
                    <span className="text-sm flex items-center gap-1">
                      <FileIcon size={15} /> {viewing.fileName}
                    </span>
                  )}
                  {viewing.done && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 font-semibold">
                      Selesai
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setViewing(null)}
                aria-label="Tutup"
                className="nk-btn-anim nk-btn-glow-red shrink-0 p-1.5 rounded-full hover:bg-white/10 text-gray-300"
              >
                <XIcon size={20} />
              </button>
            </div>
            <div className="px-6 pb-6 overflow-y-auto">
              {viewing.content ? (
                <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-200 bg-black/30 border border-[--card-border] rounded-2xl p-4">
                  {viewing.content}
                </pre>
              ) : (
                <p className="text-sm text-gray-400">
                  Tidak ada lampiran untuk tugas ini.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
