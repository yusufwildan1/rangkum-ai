import DocPage from '@/components/DocPage';
import JadwalTugasVisual from '@/components/JadwalTugasVisual';
import { CalendarIcon } from '@/components/icons/NeonIcons';

export const metadata = {
  title: 'Documentation - Jadwal Tugas | Student Lab',
};

export default function JadwalTugasDocumentationPage() {
  return (
    <DocPage
      title="Jadwal Tugas"
      tagline="Manage your deadlines and college assignments in one tidy, organized place."
      badge="Documentation"
      icon={<CalendarIcon size={38} />}
      color="var(--neon-pink)"
      glow="rgba(255, 79, 216, 0.35)"
      overview="Jadwal Tugas is a tool for managing all your college assignments. Add tasks with their due dates, mark completed ones, and keep your schedule tidy — all in one easy-to-use list."
      capabilities={[
        'Add assignments with due dates using the calendar picker.',
        'Mark assignments as done with a smooth strikethrough animation.',
        'Remove assignments you no longer need.',
        'Show neatly formatted dates (example: 27 Agu 2026).',
        'Your task list is stored privately for each user.',
      ]}
      visualExamples={[
        {
          title: 'Visual preview (animated)',
          note: 'A live example of the task list in action',
          view: <JadwalTugasVisual />,
        },
      ]}
      sections={[
        {
          title: 'Getting started',
          body: [
            '1. Open the Jadwal Tugas menu (make sure you are logged in).',
            '2. Use the input field to add the task title and pick a date via the calendar icon.',
            '3. Click the "Add" button to place the task on the list.',
            '4. Manage your tasks from the list that appears automatically.',
          ],
        },
        {
          title: 'Marking done & deleting',
          body: [
            'Click the checkmark on a task to mark it done — shown with a strikethrough animation.',
            'Use the delete button to remove tasks you no longer need.',
            'Completed tasks move automatically within the list.',
          ],
        },
        {
          title: 'Tips to stay productive',
          body: [
            'Add a due date to every assignment so nothing is missed.',
            'Mark tasks as done as soon as you finish to keep the list up to date.',
            'Make it a habit to review your task list regularly.',
          ],
        },
      ]}
      toolHref="/jadwal-tugas"
      toolLabel="Jadwal Tugas"
    />
  );
}
