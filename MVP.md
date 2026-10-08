# TaskFlow — Minimum Viable Product (MVP)

**Version:** 0.1
**Project Type:** Full-Stack Web Application
**Team:** 3 Computer Science Students
**Development Environment:** GitHub Codespaces
**Status:** MVP Planning and Verification

---

## 1. Project Overview

TaskFlow is a simple full-stack web application designed to help students organize, manage, and prioritize academic tasks.

The application allows students to create tasks, assign importance and urgency using the Eisenhower Decision Matrix, track completion status, and delete tasks.

TaskFlow is the team's first collaborative full-stack development project.

The primary goal is to understand how the frontend, backend, database, and GitHub collaboration workflow connect.

**Core Architecture:**

Frontend → Backend → Database → Backend → Frontend

AI tools may assist with development, but the team must understand and verify generated code.

---

## 2. Problem Statement

Students often manage multiple academic requirements from different subjects, including assignments, projects, quizzes, and examinations.

Without a centralized task tracker, students may struggle to organize their responsibilities and determine which tasks require immediate attention.

TaskFlow addresses this problem through a simple academic task management system with user-defined priorities.

---

## 3. Target Users

The primary target users are students who need a simple way to organize their academic responsibilities.

For MVP v0.1, the application does not support individual accounts. All tasks belong to one shared task collection.

---

## 4. Core Features

### 4.1 Create Academic Tasks

Users can create an academic task containing:

**Required Fields:**

- Task title
- Subject
- Due date
- Importance
- Urgency

**Optional Fields:**

- Description

Newly created tasks are automatically marked as incomplete.

### 4.2 View Academic Tasks

Users can view all existing tasks.

Each task displays:

- Task title
- Description (if provided)
- Subject
- Due date
- Eisenhower priority category
- Completion status

Tasks are retrieved from the database.

### 4.3 Eisenhower Decision Matrix

TaskFlow uses the Eisenhower Decision Matrix to categorize tasks based on two user-selected properties.

**Importance:**

- Important
- Not Important

**Urgency:**

- Urgent
- Not Urgent

These selections produce four possible categories:

| Importance    | Urgency    | Category  |
| ------------- | ---------- | --------- |
| Important     | Urgent     | DO        |
| Important     | Not Urgent | SCHEDULE  |
| Not Important | Urgent     | DELEGATE  |
| Not Important | Not Urgent | ELIMINATE |

The user manually selects importance and urgency.

TaskFlow automatically derives the corresponding category.

**Example:**

Task: Study for OOP Midterm
Importance: Important
Urgency: Urgent

Result: **DO**

Another example:

Task: Start Research Project
Importance: Important
Urgency: Not Urgent

Result: **SCHEDULE**

The application does not use AI to determine task priority.

The Eisenhower category is a recommendation label only. Tasks in the DELEGATE or ELIMINATE categories are not automatically delegated or deleted.

### 4.4 Mark Tasks as Completed

Users can mark tasks as completed.

Users can also return completed tasks to incomplete status.

Changes must be saved in the database.

### 4.5 Delete Tasks

Users can permanently delete existing tasks.

Deleted tasks must be removed from the database and must not reappear after refreshing the page.

---

## 5. Task Data Model

Each task contains the following information:

| Field        | Data Type         | Description            |
| ------------ | ----------------- | ---------------------- |
| id           | Integer           | Unique task identifier |
| title        | String            | Task name              |
| description  | String / Nullable | Optional task details  |
| subject      | String            | Academic subject       |
| due_date     | Date              | Task deadline          |
| is_important | Boolean           | Importance selection   |
| is_urgent    | Boolean           | Urgency selection      |
| completed    | Boolean           | Completion status      |

**Example Task:**

- id: 1
- title: Study for OOP Midterm
- description: Review inheritance, encapsulation, polymorphism, and abstraction.
- subject: Object-Oriented Programming
- due_date: 2026-10-15
- is_important: true
- is_urgent: true
- completed: false

**Derived Category:** DO

The Eisenhower category should be calculated using `is_important` and `is_urgent` rather than stored as a separate database field.

---

## 6. Application Architecture

TaskFlow follows a simple three-layer architecture.

### Frontend

Responsibilities:

- Display task information
- Provide task creation form
- Accept importance and urgency selections
- Display priority categories
- Handle completion controls
- Handle delete buttons
- Communicate with the backend API

### Backend

Responsibilities:

- Receive HTTP requests
- Validate task information
- Process task operations
- Communicate with the database
- Calculate or provide the Eisenhower category
- Return API responses

### Database

Responsibilities:

- Store task information permanently
- Retrieve existing tasks
- Update completion status
- Delete tasks

The initial database should contain only one table: `tasks`.

---

## 7. API Requirements

The backend must provide four core API endpoints.

| Method | Endpoint     | Purpose                  |
| ------ | ------------ | ------------------------ |
| GET    | `/tasks`     | Retrieve all tasks       |
| POST   | `/tasks`     | Create a new task        |
| PATCH  | `/tasks/:id` | Update completion status |
| DELETE | `/tasks/:id` | Delete a task            |

For MVP v0.1, task editing beyond completion status is not required.

The API must validate required fields and reject invalid task information.

---

## 8. User Interface Requirements

TaskFlow should use a simple single-page interface.

### Task Creation Form

The form contains:

- Title input
- Description text area
- Subject input
- Due date picker
- Importance selection
- Urgency selection
- Add Task button

Importance and urgency must each have exactly one selected value before a task can be submitted.

### Task List

Each task displays:

- Title
- Description
- Subject
- Due date
- Priority category
- Completion checkbox
- Delete button

The interface should remain simple, readable, and usable without unnecessary animations or complex dashboards.

A visual four-quadrant Eisenhower board is not required for this MVP.

---

## 9. Data Persistence

All task information must persist in the database.

The following actions must remain effective after refreshing the browser:

- Creating tasks
- Saving descriptions
- Saving importance and urgency
- Marking tasks complete or incomplete
- Deleting tasks

TaskFlow must not rely exclusively on temporary frontend state for persistent data.

---

## 10. Validation Requirements

The application must:

- Reject empty task titles
- Reject empty subjects
- Require a valid due date
- Require an importance selection
- Require an urgency selection
- Allow empty descriptions
- Assign incomplete status to newly created tasks
- Reject requests to update or delete nonexistent tasks with an appropriate response
- Display understandable error messages when an operation fails

Past due dates are allowed because students may want to record overdue tasks.

---

## 11. Out of Scope

The following features are excluded from MVP v0.1:

- Login and registration
- Authentication and authorization
- Multiple user accounts
- AI-generated task recommendations
- Automatic importance detection
- Automatic urgency detection
- Notifications
- Calendar integration
- Google Classroom integration
- Task sharing
- Collaboration inside the application
- File attachments
- Subtasks
- Analytics dashboards
- Drag-and-drop Eisenhower Matrix
- Automatic delegation
- Automatic task deletion based on priority
- Native mobile application

These features may be considered only after completing and verifying the MVP.

---

## 12. Team Development Workflow

TaskFlow is developed collaboratively by three Computer Science students using GitHub and GitHub Codespaces.

### Development Environment

Each team member has:

- Their own GitHub account
- Access to the shared TaskFlow repository
- Their own GitHub Codespace
- A separate Git branch for development

### Git Workflow

The team follows this process:

1. Start from the latest `main` branch.
2. Create a branch for a specific task or feature.
3. Make a small, focused change.
4. Test or review the change locally.
5. Commit the change with a meaningful message.
6. Push the branch to GitHub.
7. Open a Pull Request.
8. Ask another team member to review.
9. Merge the Pull Request after approval.
10. Synchronize local branches with the updated `main`.

The `main` branch represents the stable project version.

Temporary setup branches may be used for Git practice, but actual development branches should be named after tasks or features.

### Team Responsibilities

The team may assign temporary responsibilities:

**Member 1:** Frontend lead
**Member 2:** Backend lead
**Member 3:** Database and testing lead

These roles are not permanent.

All three members should understand how the complete application works.

---

## 13. AI-Assisted Development Rules

AI tools may assist with:

- Explaining programming concepts
- Planning application architecture
- Generating small code components
- Debugging errors
- Reviewing code
- Writing tests
- Improving documentation

However, the team must follow these principles:

1. Do not ask AI to generate the entire application in one step.
2. Implement one small requirement at a time.
3. Understand the purpose of generated code.
4. Verify how generated components communicate.
5. Test functionality before accepting changes.
6. Review AI-generated code before merging Pull Requests.
7. Avoid introducing unnecessary dependencies or frameworks.

At least one team member should be able to explain each code change before it is merged.

---

## 14. Development Milestones

### Milestone 1 — Planning and Setup

- Finalize MVP specification
- Establish shared GitHub repository
- Configure individual Codespaces
- Practice branches, commits, and Pull Requests
- Choose the technology stack

### Milestone 2 — Basic Application Structure

- Set up frontend project
- Set up backend project
- Establish frontend-to-backend communication
- Configure database connection

### Milestone 3 — Core Task Management

- Create task
- Save task to database
- Retrieve tasks
- Display task list

### Milestone 4 — Priority System

- Add importance selection
- Add urgency selection
- Implement Eisenhower category calculation
- Display task categories
- Verify all four combinations

### Milestone 5 — Completion and Deletion

- Mark tasks complete or incomplete
- Save completion status
- Delete tasks
- Verify database persistence

### Milestone 6 — Integration and Testing

- Test all core features
- Verify database persistence
- Test invalid inputs
- Fix integration issues
- Review the application as a team

---

## 15. Definition of Done

TaskFlow v0.1 is considered complete when:

### Task Creation

- [ ] Users can create tasks with valid required fields.
- [ ] Descriptions are optional.
- [ ] New tasks are incomplete by default.
- [ ] Tasks are stored in the database.

### Task Display

- [ ] Stored tasks appear on the webpage.
- [ ] All required task information is visible.
- [ ] The correct Eisenhower category is displayed.

### Priority System

- [ ] Important + Urgent produces DO.
- [ ] Important + Not Urgent produces SCHEDULE.
- [ ] Not Important + Urgent produces DELEGATE.
- [ ] Not Important + Not Urgent produces ELIMINATE.

### Task Completion

- [ ] Users can mark tasks complete.
- [ ] Users can return tasks to incomplete status.
- [ ] Completion status persists after refresh.

### Task Deletion

- [ ] Users can delete tasks.
- [ ] Deleted tasks are removed from the database.
- [ ] Deleted tasks do not reappear after refresh.

### Validation

- [ ] Required fields are validated.
- [ ] Invalid requests are handled.
- [ ] Users receive understandable error messages.

### Collaboration

- [ ] All members have contributed through GitHub.
- [ ] Team members understand branches and Pull Requests.
- [ ] Changes have been reviewed before merging.
- [ ] All members can explain the application's core architecture.

---

## 16. Success Criteria

TaskFlow is successful when the team can demonstrate a working full-stack application and explain:

1. How the frontend sends HTTP requests.
2. How the backend processes requests.
3. How the database stores and retrieves information.
4. How task data persists after refresh.
5. How the Eisenhower Matrix categorizes tasks.
6. How Git tracks project changes.
7. How GitHub branches and Pull Requests support collaboration.
8. How to debug problems across frontend, backend, and database components.

**Final Goal:** Build a small, functional academic task manager while developing a practical understanding of full-stack development, Git, GitHub, and AI-assisted software engineering.
