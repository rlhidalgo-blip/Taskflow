# TaskFlow — Database Design

**Version:** 0.1  
**Database:** SQLite  
**Status:** Draft — Pending Team Review  
**Owner:** Database Lead

## 1. Purpose

This document defines the database structure and integrity rules for TaskFlow MVP v0.1.

The database stores academic tasks and supports the four core operations: create, retrieve, update completion status, and delete.

## 2. Database Structure

The MVP uses a single table named `tasks`.

| Column | SQLite Type | Constraints / Rules |
|---|---|---|
| `id` | INTEGER | PRIMARY KEY |
| `title` | TEXT | NOT NULL, nonblank |
| `description` | TEXT | Nullable |
| `subject` | TEXT | NOT NULL, nonblank |
| `due_date` | TEXT | NOT NULL, valid YYYY-MM-DD date |
| `is_important` | INTEGER | NOT NULL, CHECK values 0 or 1 |
| `is_urgent` | INTEGER | NOT NULL, CHECK values 0 or 1 |
| `completed` | INTEGER | NOT NULL, DEFAULT 0, CHECK values 0 or 1 |

## 3. Design Decisions

### Primary Key

The `id` column uses SQLite's INTEGER PRIMARY KEY behavior.

Task IDs are automatically generated when omitted during insertion.

The AUTOINCREMENT keyword is unnecessary for MVP v0.1.

### Required Text Fields

`title` and `subject` cannot be NULL, empty, or composed entirely of whitespace.

The database will enforce nonblank values using CHECK constraints with trimming of ordinary spaces.

Express will perform additional input validation.

### Optional Description

The `description` column allows NULL.

When no meaningful description is provided, the backend should store NULL.

### Due Date

The `due_date` column stores dates as TEXT using the YYYY-MM-DD format.

Past dates are allowed.

Express is responsible for validating that the date exists on the calendar, including leap-year rules.

SQLite will enforce NOT NULL and basic date-format safeguards.

### Importance and Urgency

The `is_important` and `is_urgent` columns represent Boolean values using integers.

- 1 = True
- 0 = False

Both columns require a value and accept only 0 or 1.

The backend must validate these values before database insertion.

### Completion Status

The `completed` column defaults to 0.

- 0 = Incomplete
- 1 = Completed

NULL and other values are not permitted.

### Duplicate Tasks

Duplicate task titles, subjects, and deadlines are allowed.

Each task is uniquely identified by its primary key.

### Eisenhower Matrix

The priority category is derived from `is_important` and `is_urgent`.

| Important | Urgent | Category |
|---|---|---|
| 1 | 1 | DO |
| 1 | 0 | SCHEDULE |
| 0 | 1 | DELEGATE |
| 0 | 0 | ELIMINATE |

The category is not stored as a separate database column.

### Timestamps

The MVP does not include `created_at` or `updated_at`.

These fields may be considered in a future version if auditing or chronological sorting becomes necessary.

## 4. Data Integrity

The database must protect task information using:

- Primary key uniqueness
- Required-field constraints
- Nonblank text validation
- Boolean-value restrictions
- Default completion status
- Basic date-format safeguards

The backend provides additional validation and user-friendly error responses.

## 5. Scope Limitations

The MVP does not include:

- User accounts or ownership relationships
- Additional subject tables
- Priority lookup tables
- Task history
- Timestamps
- Database triggers
- Advanced reporting

## 6. Integration Requirements

The Express backend must use the field names defined in this document.

The backend must translate API Boolean values into SQLite-compatible values and return consistent task data to the React frontend.

The API contract must agree with this database design before implementation begins.

## 7. Review Checklist

- [ ] Database fields match MVP.md.
- [ ] SQLite types are appropriate.
- [ ] Primary key behavior is understood.
- [ ] Required and optional fields are correctly defined.
- [ ] Importance and urgency constraints are documented.
- [ ] Completion default is documented.
- [ ] Date validation responsibilities are clear.
- [ ] Database and API field names are consistent.
- [ ] Both developers approve the design.

## 8. Implementation Status

Database schema implementation has not started.

This document describes the agreed design and will guide the later SQL implementation.
