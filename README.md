# 📝 Markdown Notes App

**Project URL:** https://roadmap.sh/projects/markdown-note-taking-app

A full-stack Markdown note-taking application built with **Node.js**, **TypeScript**, **Express**, **Next.js**, **React**, and **TanStack Query**.

This project implements a Markdown note-taking REST API and a web frontend that allows users to create and save Markdown notes, view saved notes, render Markdown as HTML, and check the grammar of their notes using the **LanguageTool API**.

This project was developed as an implementation of the Markdown Notes project from [roadmap.sh](https://roadmap.sh/).

---

## 🚀 Features

### 📝 Notes

* Create and save Markdown notes
* Retrieve all saved notes
* Retrieve a single note by ID
* Render Markdown notes as HTML
* Preview saved notes
* Validate note content
* Persist notes using a JSON file

### ✍️ Grammar Checking

* Check the grammar of Markdown content
* Detect grammar and spelling issues
* Display detailed grammar errors
* Display suggested replacements
* Display the position of detected errors
* Handle grammar service failures

### 💻 Frontend

* Next.js App Router
* React Server Components and Client Components
* TanStack Query for server-state management
* TanStack Query mutations for creating notes and checking grammar
* Zod response validation
* Markdown rendering
* Structured API error handling
* Responsive UI with Tailwind CSS

### ⚙️ Backend

* RESTful API
* Express.js
* TypeScript
* Request validation using Zod
* Layered service architecture
* Structured error responses
* JSON file persistence
* Integration with the LanguageTool API

---

## 🛠️ Technologies Used

### Backend

* Node.js
* TypeScript
* Express.js
* Zod
* LanguageTool API
* Node.js File System API (`fs/promises`)
* JSON file storage

### Frontend

* Next.js
* React
* TypeScript
* TanStack Query
* Zod
* Tailwind CSS
* Markdown rendering

---

## 🏗️ Architecture

The project is divided into two applications:

```text
                         ┌──────────────────────┐
                         │       Next.js        │
                         │       Frontend       │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP / REST API
                                    ▼
                         ┌──────────────────────┐
                         │       Express        │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
                         ┌──────────┴───────────┐
                         │                      │
                         ▼                      ▼
                  ┌─────────────┐       ┌───────────────┐
                  │  notes.json │       │ LanguageTool  │
                  │   Storage   │       │      API      │
                  └─────────────┘       └───────────────┘
```

### 🏗️ Backend Architecture

The backend follows a layered architecture:

```text
Request
   ↓
Routes
   ↓
Validation Middleware
   ↓
Services
   ↓
File Storage / External API
```

Routes are responsible for handling HTTP requests, while services contain the application's business logic.

Zod is used to validate incoming request data before it reaches the service layer.

### 🎨 Frontend Architecture

The frontend uses TanStack Query to manage server state.

The general data flow is:

```text
Component
    ↓
Custom Hook
    ↓
TanStack Query
    ↓
API Function
    ↓
HTTP Client
    ↓
Backend API
```

Zod is used to validate API responses and infer TypeScript types.

---

## 📂 Project Structure

```text
markdown-notes/
├── backend/
│   ├── src/
│   │   ├── dtos/
│   │   ├── helpers/
│   │   ├── interfaces/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── services/
│   ├── notes.json
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── exceptions/
│   ├── hooks/
│   ├── mutations/
│   ├── providers/
│   ├── sample/
│   ├── schemas/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Requirements

Before running the application, make sure you have installed:

* Node.js 20+
* npm

---

## 🔧 Installation

Clone the repository:

```bash
git clone <https://github.com/tommycontreras11/markdown-notes><img width="1502" height="828" alt="Screenshot 2026-08-20 at 2 56 31 PM" src="https://github.com/user-attachments/assets/af4821c9-c842-4bd2-a716-498697b1035d" />

cd markdown-notes
```

### 📦 Backend Installation

```bash
cd backend
npm install
```

### 📦 Frontend Installation

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

The frontend requires one environment variable.

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

This variable specifies the URL of the backend API.

The backend currently does not require environment variables.

### 📄 Environment Example

You can create a `.env.example` file inside the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The actual `.env.local` file should not be committed to the repository.

---

## ▶️ Running the Application

The backend and frontend run as separate applications.

### 🖥️ Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### 🌐 Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3001
```

The exact port may vary depending on your Next.js configuration.

---

# 🔌 API

The backend exposes a RESTful API for managing Markdown notes and checking grammar.

The API base URL during local development is:

```text
http://localhost:3000
```

---

## 📝 Notes API

Base route:

```text
/api/notes
```

### 📋 Get All Notes

```http
GET /api/notes
```

Returns all saved notes.

Example response:

```json
{
  "data": [
    {
      "id": 1,
      "content": "# My First Note\n\nThis is my first Markdown note."
    },
    {
      "id": 2,
      "content": "Another **Markdown** note."
    }
  ]
}
```

### ➕ Create Note

```http
POST /api/notes
```

Request body:

```json
{
  "content": "# My Note\n\nThis is a **Markdown** note."
}
```

Successful response:

```json
{
  "message": "Note saved successfully"
}
```

### 👁️ Render Note

```http
GET /api/notes/render/:id
```

Example:

```http
GET /api/notes/render/1
```

Returns the requested note.

Example response:

```json
{
  "data": {
    "id": 1,
    "content": "# My First Note\n\nThis is my first Markdown note."
  }
}
```

The frontend renders the Markdown content as HTML.

---

## ✍️ Grammar Checking API

Base route:

```text
/api/notes/check-grammar
```

### 🔎 Check Grammar

```http
POST /api/notes/check-grammar
```

Request body:

```json
{
  "content": "This are a grammar mistake."
}
```

If grammar issues are found, the API returns:

```json
{
  "data": {
    "valid": false,
    "errors": [
      {
        "message": "The singular demonstrative pronoun ‘this’ does not agree with the plural verb ‘are’. Did you mean “these”?",
        "shortMessage": "Grammatical problem: use ‘these’",
        "offset": 0,
        "length": 4,
        "replacements": [
          "These"
        ]
      }
    ]
  }
}
```

If no grammar issues are found:

```json
{
  "data": {
    "valid": true
  }
}
```

A response with `valid: false` is still a successful request. It means the grammar service successfully analyzed the content and found grammar issues.

The backend only returns an HTTP error when the grammar service itself fails or the request is invalid.

---

## 🌐 LanguageTool Integration

Grammar checking is provided through the [LanguageTool API](https://languagetool.org/).

The backend sends the note content to LanguageTool after cleaning Markdown syntax so that Markdown formatting does not interfere with grammar analysis.

The grammar response contains:

* `message` — Detailed description of the detected issue
* `shortMessage` — Short description of the issue
* `offset` — Position of the issue in the text
* `length` — Number of characters affected
* `replacements` — Suggested replacements

---

## 🗄️ Data Storage

The backend currently uses a JSON file instead of a database.

Notes are stored in:

```text
backend/notes.json
```

Example:

```json
[
  {
    "id": 1,
    "content": "# My First Note\n\nThis is my first Markdown note."
  },
  {
    "id": 2,
    "content": "This is another **Markdown** note."
  }
]
```

Each note contains:

* `id` — Unique identifier
* `content` — Markdown content

When a new note is created, its ID is generated based on the ID of the last stored note.

---

## ✅ Validation

The backend uses Zod to validate incoming requests.

For example, creating a note requires a non-empty `content` field:

```json
{
  "content": "# My Note"
}
```

An invalid request returns a structured validation error:

```json
{
  "message": "Validation failed",
  "errors": {
    "fields": {
      "content": [
        "The min length is 1"
      ]
    }
  }
}
```

The frontend also uses Zod to validate API responses.

Response types are inferred directly from the Zod schemas:

```ts
export type CheckGrammarResponse = z.infer<
  typeof checkGrammarResponseSchema
>;
```

This keeps runtime validation and TypeScript types synchronized.

---

## ❌ Error Handling

The backend returns structured errors for invalid requests and service failures.

Example:

```json
{
  "message": "Validation failed",
  "errors": {
    "fields": {
      "content": [
        "The min length is 1"
      ]
    }
  }
}
```

The frontend preserves these structured errors so individual validation messages can be displayed to the user.

### 📊 Common HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | OK |
| `400` | Bad Request |
| `404` | Not Found |
| `503` | Service Unavailable |

Grammar findings are not treated as API errors. A successful grammar request can return `valid: false` when issues are detected.

---

## 🔄 Application Flow

### 📝 Creating a Note

```text
User enters Markdown
        ↓
Create Note Form
        ↓
TanStack Mutation
        ↓
POST /api/notes
        ↓
Backend Validation
        ↓
Save to notes.json
        ↓
Mutation succeeds
        ↓
Invalidate ["notes"] query
        ↓
Notes list is refreshed
```

### ✍️ Checking Grammar

```text
User enters Markdown
        ↓
Grammar Check Form
        ↓
TanStack Mutation
        ↓
POST /api/notes/check-grammar
        ↓
Backend
        ↓
LanguageTool API
        ↓
Grammar Results
        ↓
Frontend displays issues
```

### 👁️ Viewing a Note

```text
User selects a note
        ↓
/notes/:id
        ↓
GET /api/notes/render/:id
        ↓
Markdown Content
        ↓
Markdown → HTML
        ↓
Rendered Note
```

---

## 🎨 Frontend

The frontend is built with Next.js using the App Router.

Server Components are used by default, while Client Components are used when interactivity is required.

Examples of Client Components include:

* Note creation form
* Grammar checking form
* Components using TanStack Query hooks
* Interactive form controls

TanStack Query is used for:

* Fetching notes
* Fetching individual notes
* Creating notes
* Checking grammar
* Managing loading and error states
* Invalidating stale queries after mutations

---

## 📄 Markdown Rendering

Notes are stored as raw Markdown instead of pre-rendered HTML.

For example:

```md
# My Note

This is a **Markdown** note.

## Features

* Markdown support
* Grammar checking
* HTML rendering
```

The Markdown is converted to HTML when it is displayed by the frontend.

This allows the original Markdown content to remain available for future editing or processing.

---

## 📸 Screenshots

### 📝 Notes List

<img width="1509" height="862" alt="Screenshot 2026-08-20 at 2 52 18 PM" src="https://github.com/user-attachments/assets/e2652e57-4b5d-4aa0-b959-491b7a2824c6" />

### ➕ Create Note

<img width="1507" height="825" alt="Screenshot 2026-08-20 at 2 59 00 PM" src="https://github.com/user-attachments/assets/2be46519-64ab-458e-8dac-5ae0527c5b7a" />

### ✍️ Grammar Check

<img width="1502" height="826" alt="Screenshot 2026-08-20 at 2 59 46 PM" src="https://github.com/user-attachments/assets/83f17d61-001b-4e3f-9128-f59dc4f79b44" />

### 👁️ Rendered Markdown

<img width="1505" height="886" alt="Screenshot 2026-08-20 at 3 00 37 PM" src="https://github.com/user-attachments/assets/1cb37d50-dffb-4fa4-bd0f-4c7964542cae" />

---

## 🚧 Future Improvements

* Markdown file upload
* Edit existing notes
* Delete notes
* Database persistence
* Live Markdown preview
* Syntax highlighting
* Inline grammar error highlighting
* Authentication and authorization
* Pagination
* Automated unit and integration tests
* Docker support
* Production deployment
* Improved Markdown editor

---

## 🧑‍💻 Author

**Tommy Contreras**

---

## 📄 License

This project was created for educational purposes as part of a roadmap.sh project.
