# MedKura Fullstack Engineer Assessment

## Overview

This repository contains my submission for the **MedKura Health Fullstack Engineer Technical Assessment**.

MedKura builds a healthcare concierge platform that guides patients through the complex journey of surgery decisions. The goal of this assessment is to demonstrate full-stack engineering capability across frontend UI development, backend API design, database modelling, and AI integration.

The repository is structured into four independent tasks reflecting real product problems.

---

# Repository Structure

```
medkura-assessment/
│
├── task1-dashboard/
│   React + TypeScript Patient Case Dashboard
│
├── task2-api/
│   Node.js REST API for doctor availability
│
├── task3-schema/
│   PostgreSQL schema for patient journey
│
├── task4-ai/
│   Fullstack AI Medical Report Summariser
│
└── README.md
```

---

# Task 1 — Patient Case Dashboard

### Description

A responsive React component that displays a patient surgery case with stage progress tracking and timeline notifications.

### Key Features

* Patient Case Card UI
* 6-stage surgery journey pipeline
* Notification / timeline panel
* Urgency status badge with toggle
* Fully responsive layout (mobile friendly)
* Built using React + TypeScript

### Stages Implemented

```
Onboarded
Lab Tests
Second Opinion
Hospital Selected
Surgery Scheduled
Completed
```

### Run Locally

```
cd task1-dashboard
npm install
npm start
```

Application runs at:

```
http://localhost:3000
```

---

# Task 2 — Doctor Availability API

### Description

A REST API that allows users to view doctors and available consultation slots and create bookings.

### Tech Stack

* Node.js
* Express.js
* Joi validation
* In-memory data store

### API Endpoints

#### Get Doctors

```
GET /doctors
```

Filter example:

```
GET /doctors?specialty=cardiology&city=hyderabad
```

#### Get Available Slots

```
GET /doctors/:id/slots
```

Example:

```
GET /doctors/doc_001/slots
```

#### Book Appointment

```
POST /bookings
```

Request Body

```
{
  "doctorId": "doc_001",
  "slotDatetime": "2026-03-01T10:00:00+05:30",
  "patientName": "Ravi Sharma",
  "patientPhone": "9999999999"
}
```

### Run Locally

```
cd task2-api
npm install
node src/server.js
```

Server runs on:

```
http://localhost:5000
```

---

# Task 3 — Database Schema Design

### Description

A scalable PostgreSQL schema that models the full patient surgery journey.

### Entities Modelled

* Patients
* Care Representatives
* Cases (surgery journeys)
* Doctor Consultations
* Lab Orders
* Hospital Referrals
* Documents
* Case Stage History

### Key Design Decisions

* One patient can have multiple surgery cases.
* Case stage changes are tracked through an audit table (`case_stage_history`).
* ENUM is used to enforce valid stage values.
* Foreign key relationships maintain referential integrity.

### Indexes Added

Indexes were created to optimize common queries:

* cases by representative
* cases by stage
* case stage history lookup
* patient city search
* consultations by case

### File Location

```
task3-schema/schema.sql
```

---

# Task 4 — Claude AI Medical Report Summariser

### Description

A full-stack feature that allows a care representative to paste a medical report and receive a structured AI summary.

### Output Structure

The AI extracts:

* Key Findings
* Current Medications
* Red Flags
* Patient Query
* Suggested Specialist

### Backend

Node.js server that processes report text and returns structured JSON.

Endpoint:

```
POST /api/summarise
```

### Frontend

React interface that includes:

* Report input text area
* Submit button
* Loading state
* Structured output display

### Running the Backend

```
cd task4-ai/backend
npm install
node server.js
```

Server runs at:

```
http://localhost:5001
```

### Running the Frontend

```
cd task4-ai/frontend
npm install
npm start
```

---

# Claude API Integration

Since the Claude API key is not available during submission, the backend currently returns a **mock AI response**.

The prompt and integration logic are included in the code and can be activated by:

1. Obtaining a Claude API key
2. Creating a `.env` file
3. Adding

```
CLAUDE_API_KEY=your_api_key
```

---

# Key Design Decisions

* Tasks are separated into independent modules to match the assessment requirements.
* Backend APIs follow clear separation of concerns (routes, controllers, data layer).
* React components are modular and reusable.
* The database schema focuses on normalization and scalability.
* The AI integration returns structured JSON to simplify UI rendering.

---

# Assumptions

* Doctor slot data is stored in-memory for simplicity.
* Patient reports are pasted as text instead of uploaded files.
* The AI response format is deterministic JSON.

---

# What I Would Improve With More Time

* Add authentication for the API.
* Persist bookings in PostgreSQL instead of memory.
* Implement file upload for medical reports (PDF / images).
* Improve the patient dashboard with real-time case updates.
* Add unit tests and API integration tests.

---

# Final Notes

The goal of this project was to focus on **clean architecture, clarity of thought, and product-oriented engineering decisions** rather than overengineering the implementation.

Thank you for the opportunity to work on this assessment.

---
