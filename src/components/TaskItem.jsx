import { useEffect, useRef, useState } from 'react'

function getCategory(task) {
  if (task.isImportant && task.isUrgent) return 'DO'
  if (task.isImportant) return 'SCHEDULE'
  if (task.isUrgent) return 'DELEGATE'
  return 'ELIMINATE'
}

function formatDueDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`)
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function TaskItem({ task, onToggle, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const category = getCategory(task)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    function closeMenu(event) {
      if (!menuRef.current?.contains(event.target)) setIsMenuOpen(false)
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeMenu)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeMenu)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  return (
    <article className={`task-row${task.completed ? ' task-row--completed' : ''}`}>
      <button
        className="complete-button"
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={`${task.completed ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
        aria-pressed={task.completed}
      >
        {task.completed && <span aria-hidden="true">✓</span>}
      </button>

      <div className="task-details">
        <h2>{task.title}</h2>
        {task.description && <p className="task-description">{task.description}</p>}
        <p className="task-meta">
          <span>{task.subject}</span>
          <span aria-hidden="true">•</span>
          <span>Due {formatDueDate(task.dueDate)}</span>
        </p>
      </div>

      <span className={`category category--${category.toLowerCase()}`}>{category}</span>

      <div className="task-actions" ref={menuRef}>
        <button
          className="more-button"
          type="button"
          aria-label={`Actions for ${task.title}`}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true">•••</span>
        </button>
        {isMenuOpen && (
          <div className="action-menu" role="menu">
            <button type="button" role="menuitem" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default TaskItem
