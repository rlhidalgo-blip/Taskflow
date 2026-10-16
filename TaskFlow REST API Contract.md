# TaskFlow MVP v0.1 REST API Contract

## Base URL

All endpoints are under:

`/tasks`

## General Response Rules

- Request and response bodies use JSON.
- The backend sends `Content-Type: application/json`.
- Dates use the format `YYYY-MM-DD`.
- Boolean values must be actual JSON booleans: `true` or `false`, not `"true"` or `"false"`.
- The Eisenhower category is derived from `is_important` and `is_urgent`. It is returned to the frontend as `category`, but is not stored as a database column.

### Task Object Returned by the API

```json
{
  "id": 1,
  "title": "Study for OOP Midterm",
  "description": "Review inheritance and polymorphism.",
  "subject": "Object-Oriented Programming",
  "due_date": "2026-10-15",
  "is_important": true,
  "is_urgent": true,
  "completed": false,
  "category": "DO"
}
```

`description` may be `null` when no description was provided.

### Eisenhower Category Rules

| is_important | is_urgent | category |
|---|---|---|
| true | true | `DO` |
| true | false | `SCHEDULE` |
| false | true | `DELEGATE` |
| false | false | `ELIMINATE` |

### Standard Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required.",
    "fields": {
      "title": "Title cannot be empty."
    }
  }
}
```

The `fields` object is included when the error is caused by invalid input.

---

## 1. Retrieve All Tasks

### `GET /tasks`

Retrieves every task saved in the database.

### Request Data

No request body is required.

### Success Response

**Status:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "Study for OOP Midterm",
    "description": "Review inheritance and polymorphism.",
    "subject": "Object-Oriented Programming",
    "due_date": "2026-10-15",
    "is_important": true,
    "is_urgent": true,
    "completed": false,
    "category": "DO"
  }
]
```

If there are no tasks, return:

```json
[]
```

### Error Response

**Status:** `500 Internal Server Error`

Used when the server cannot retrieve tasks because of an unexpected server or database problem.

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Unable to retrieve tasks."
  }
}
```

---

## 2. Create a Task

### `POST /tasks`

Creates and saves a new academic task.

### Request Body

```json
{
  "title": "Study for OOP Midterm",
  "description": "Review inheritance and polymorphism.",
  "subject": "Object-Oriented Programming",
  "due_date": "2026-10-15",
  "is_important": true,
  "is_urgent": true
}
```

Do not send `id`, `completed`, or `category` when creating a task.

- The database generates `id`.
- The backend automatically assigns `completed` as `false`.
- The backend derives `category`.

### Input Validation

- `title` is required and must be a non-empty string after removing extra spaces.
- `subject` is required and must be a non-empty string after removing extra spaces.
- `description` is optional. If provided, it must be a string. It may be empty.
- `due_date` is required and must be a valid date in `YYYY-MM-DD` format.
- Past due dates are allowed.
- `is_important` is required and must be a boolean.
- `is_urgent` is required and must be a boolean.
- Additional fields not included in this contract must be rejected.

### Success Response

**Status:** `201 Created`

```json
{
  "id": 1,
  "title": "Study for OOP Midterm",
  "description": "Review inheritance and polymorphism.",
  "subject": "Object-Oriented Programming",
  "due_date": "2026-10-15",
  "is_important": true,
  "is_urgent": true,
  "completed": false,
  "category": "DO"
}
```

### Error Responses

**Status:** `400 Bad Request`

Used when required data is missing or data has an invalid type or format.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Task information is invalid.",
    "fields": {
      "due_date": "Due date must use YYYY-MM-DD format."
    }
  }
}
```

**Status:** `500 Internal Server Error`

Used when the task cannot be saved because of an unexpected server or database problem.

---

## 3. Update Task Completion Status

### `PATCH /tasks/:id`

Changes only a task's completion status.

Example endpoint:

`PATCH /tasks/1`

### Request Body

```json
{
  "completed": true
}
```

### Input Validation

- `id` in the URL must be a positive whole number.
- The task with that `id` must exist.
- `completed` is required and must be a boolean.
- Only `completed` can be updated in MVP v0.1.
- The request must not update title, subject, due date, description, importance, or urgency.

### Success Response

**Status:** `200 OK`

```json
{
  "id": 1,
  "title": "Study for OOP Midterm",
  "description": "Review inheritance and polymorphism.",
  "subject": "Object-Oriented Programming",
  "due_date": "2026-10-15",
  "is_important": true,
  "is_urgent": true,
  "completed": true,
  "category": "DO"
}
```

### Error Responses

**Status:** `400 Bad Request`

Used when `id` is invalid or `completed` is missing or is not a boolean.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Completion status must be true or false.",
    "fields": {
      "completed": "A boolean value is required."
    }
  }
}
```

**Status:** `404 Not Found`

Used when no task exists with the provided `id`.

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task with id 1 was not found."
  }
}
```

**Status:** `500 Internal Server Error`

Used when an unexpected server or database problem occurs.

---

## 4. Delete a Task

### `DELETE /tasks/:id`

Permanently removes a task from the database.

Example endpoint:

`DELETE /tasks/1`

### Request Data

No request body is required.

### Input Validation

- `id` in the URL must be a positive whole number.
- The task with that `id` must exist.

### Success Response

**Status:** `204 No Content`

No response body is returned.

### Error Responses

**Status:** `400 Bad Request`

Used when the `id` is not a positive whole number.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Task id must be a positive whole number."
  }
}
```

**Status:** `404 Not Found`

Used when no task exists with the provided `id`.

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task with id 1 was not found."
  }
}
```

**Status:** `500 Internal Server Error`

Used when an unexpected server or database problem occurs.

---

## Database Coordination Checklist

The Database Lead should confirm that the `tasks` table uses these matching field names:

- `id`
- `title`
- `description`
- `subject`
- `due_date`
- `is_important`
- `is_urgent`
- `completed`

The `category` field must not be added as a database column because the backend calculates it from `is_important` and `is_urgent`.

## Review and Approval

Before implementation:

- Frontend developer verifies that request and response structures work with the React interface.
- Database Lead verifies that the API field names match the `tasks` table schema.
- Backend developer verifies status codes and validation rules.
- Both developers approve this contract before Express routes are created.
