import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import TaskList from './components/TaskList.jsx'
import TaskModal from './components/TaskModal.jsx'

const starterTasks = [
  {
    id: 1,
    title: 'Review for Algorithms exam',
    description: 'Focus on graph traversal, dynamic programming, and practice problems.',
    subject: 'Data Structures & Algorithms',
    dueDate: '2026-10-18',
    isImportant: true,
    isUrgent: true,
    completed: false,
  },
  {
    id: 2,
    title: 'Draft research proposal',
    description: 'Outline the problem statement and initial methodology.',
    subject: 'Research Methods',
    dueDate: '2026-10-28',
    isImportant: true,
    isUrgent: false,
    completed: false,
  },
  {
    id: 3,
    title: 'Send meeting notes to group',
    description: '',
    subject: 'Software Engineering',
    dueDate: '2026-10-16',
    isImportant: false,
    isUrgent: true,
    completed: true,
  },
  {
    id: 4,
    title: 'Organize old course files',
    description: 'Archive last semester’s reference materials.',
    subject: 'General',
    dueDate: '2026-11-02',
    isImportant: false,
    isUrgent: false,
    completed: false,
  },
]

function getInitialTheme() {
  const savedTheme = localStorage.getItem('taskflow-theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [tasks, setTasks] = useState(starterTasks)
  const [theme, setTheme] = useState(getInitialTheme)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('taskflow-theme', theme)
  }, [theme])

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  function addTask(taskDetails) {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        ...taskDetails,
        id: Date.now(),
        completed: false,
      },
    ])
    setIsModalOpen(false)
  }

  return (
    <div className="app-shell" id="top">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <main className="main-content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Student workspace</p>
            <h1>My tasks</h1>
            <p className="section-description">
              Keep your academic work clear, focused, and moving forward.
            </p>
          </div>
          <button className="new-task-button" type="button" onClick={() => setIsModalOpen(true)}>
            <span aria-hidden="true">＋</span>
            New task
          </button>
        </div>

        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      {isModalOpen && (
        <TaskModal onAddTask={addTask} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

export default App
