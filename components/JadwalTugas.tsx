'use client';

import { useState } from 'react';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  done: boolean;
}

interface Props {
  initialTasks: Task[];
}

const NEAR_DAYS = 3;

export default function JadwalTugas({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

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
      headers: { 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return res;
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api({
        method: 'POST',
        body: { title: title.trim(), dueDate, done: false },
      });
      if (res.ok) {
        const item: Task = await res.json();
        setTasks((prev) => [item, ...prev]);
        setTitle('');
        setDueDate('');
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

  const TaskRow = ({ task }: { task: Task }) => {
    const days = daysUntil(task.dueDate);
    const late = days < 0;

    return (
      <li className="glass-soft rounded-2xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => toggleTask(task.id)}
          aria-label="Tandai selesai"
          className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-sm transition ${
            task.done
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-400 dark:border-gray-500 hover:border-green-500'
          }`}
        >
          {task.done && '✓'}
        </button>
        <div className="flex-1 min-w-0">
          <p
            className={`truncate font-medium ${
              task.done
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-800 dark:text-gray-100'
            }`}
          >
            {task.title}
          </p>
          {task.dueDate &&
            (task.done ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">📅 {formatDate(task.dueDate)}</p>
            ) : late ? (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                🚨 Terlambat! Deadline {formatDate(task.dueDate)}
              </p>
            ) : days === 0 ? (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                🚨 Deadlinenya hari ini!
              </p>
            ) : days <= NEAR_DAYS ? (
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                ⚠️ Hampir deadline — tersisa {days} hari (📅 {formatDate(task.dueDate)})
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">📅 {formatDate(task.dueDate)}</p>
            ))}
        </div>
        <button
          onClick={() => removeTask(task.id)}
          aria-label="Hapus tugas"
          className="shrink-0 text-red-500 hover:text-red-700 text-lg"
        >
          ✕
        </button>
      </li>
    );
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          📅{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300">
            Jadwal Tugas
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Catat tugas dan pantau deadline agar tidak ada yang terlewat.
        </p>
      </div>

      <div className="glass rounded-3xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Nama tugas..."
            className="flex-1 px-4 py-2.5 rounded-full bg-white/60 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-white/60 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <button
            onClick={addTask}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:scale-105 transition shadow"
          >
            ➕ Tambah
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
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚠️</span>
                <h2 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                  Hampir Deadline
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-300 text-xs font-bold">
                  {nearTasks.length}
                </span>
              </div>
              <ul className="space-y-2 border-l-2 border-orange-400 pl-3">
                {nearTasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </ul>
            </section>
          )}

          {upcomingTasks.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🗓️</span>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Belum Deadline
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold">
                  {upcomingTasks.length}
                </span>
              </div>
              <ul className="space-y-2">
                {upcomingTasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </ul>
            </section>
          )}

          {doneTasks.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">✅</span>
                <h2 className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Tugas Selesai
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 dark:text-green-300 text-xs font-bold">
                  {doneTasks.length}
                </span>
              </div>
              <ul className="space-y-2">
                {doneTasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </>
  );
}
