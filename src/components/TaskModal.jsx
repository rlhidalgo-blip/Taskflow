import { useEffect, useRef, useState } from 'react'

const emptyForm = {
  title: '',
  description: '',
  subject: '',
  dueDate: '',
  importance: '',
  urgency: '',
}

function ChoiceGroup({ legend, name, value, options, onChange, error }) {
  return (
    <fieldset className="choice-fieldset" aria-describedby={error ? `${name}-error` : undefined}>
      <legend>
        {legend} <span aria-hidden="true">*</span>
      </legend>
      <div className="choice-group">
        {options.map((option) => (
          <label key={option.value} className={value === option.value ? 'choice--selected' : ''}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </fieldset>
  )
}

function TaskModal({ onAddTask, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const titleInputRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    titleInputRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()

      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, input, textarea, [href], [tabindex]:not([tabindex="-1"])',
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!form.title.trim()) nextErrors.title = 'Enter a task title.'
    if (!form.subject.trim()) nextErrors.subject = 'Enter a subject.'
    if (!form.dueDate) nextErrors.dueDate = 'Choose a due date.'
    if (!form.importance) nextErrors.importance = 'Choose an importance level.'
    if (!form.urgency) nextErrors.urgency = 'Choose an urgency level.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onAddTask({
      title: form.title.trim(),
      description: form.description.trim(),
      subject: form.subject.trim(),
      dueDate: form.dueDate,
      isImportant: form.importance === 'important',
      isUrgent: form.urgency === 'urgent',
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Add to your workspace</p>
            <h2 id="task-form-title">New task</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close new task form">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="title">Title <span aria-hidden="true">*</span></label>
            <input
              ref={titleInputRef}
              id="title"
              name="title"
              value={form.title}
              onChange={updateField}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
              placeholder="e.g. Finish database assignment"
            />
            {errors.title && <span className="field-error" id="title-error">{errors.title}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="description">Description <span className="optional">Optional</span></label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Add helpful details"
              rows="3"
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={updateField}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                placeholder="e.g. Web Development"
              />
              {errors.subject && <span className="field-error" id="subject-error">{errors.subject}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="dueDate">Due date <span aria-hidden="true">*</span></label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={updateField}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'date-error' : undefined}
              />
              {errors.dueDate && <span className="field-error" id="date-error">{errors.dueDate}</span>}
            </div>
          </div>

          <div className="form-grid form-grid--choices">
            <ChoiceGroup
              legend="Importance"
              name="importance"
              value={form.importance}
              onChange={updateField}
              error={errors.importance}
              options={[
                { value: 'important', label: 'Important' },
                { value: 'not-important', label: 'Not important' },
              ]}
            />
            <ChoiceGroup
              legend="Urgency"
              name="urgency"
              value={form.urgency}
              onChange={updateField}
              error={errors.urgency}
              options={[
                { value: 'urgent', label: 'Urgent' },
                { value: 'not-urgent', label: 'Not urgent' },
              ]}
            />
          </div>

          <div className="modal-footer">
            <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
            <button className="submit-button" type="submit">Add task</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
