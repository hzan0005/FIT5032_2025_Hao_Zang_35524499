# FIT5032_2025_Hao_Zang_35524499
# A2 (15%): Basic Web App 
# Healthy Seniors Charity Website

This is a Vue 3 + Vite based web application designed for a charity organization focused on supporting older Australians. The website provides health information, community programs, digital skills training, and caregiver resources.

A responsive and secure web application designed to support older adults in accessing health, skill, community, and caregiving resources. This project implements multiple features according to **Business Requirements A, B, and C**.

---

## Overview

This application allows users to register, log in, browse different support sections, leave ratings and comments, and interact with accessibility and multilingual features. Admins have access to a dashboard for privileged operations.

---

## Implemented Business Requirements

### **Category A: General Functionality**
- **A.1 Multi-page Navigation**: Implemented using Vue Router. Supports navigation across `Home`, `About`, `Health`, `Community`, `Skills`, `Caregiver`, `Help`, and `Donate` pages.
- **A.2 Responsive Design**: Fully responsive layout using custom CSS and media queries (no CSS frameworks used).
- **A.3 Role-based Access**: Admin-only route (`/admin`) is protected and only visible to users with role `"admin"`.

---

### **Category B: Dynamic Behaviour & Validation**
- **B.1 Input Validation**:
  - Registration form validates:
    - Username (min 3 characters)
    - Password (min 8 characters with upper/lowercase, number, symbol)
  - Comments limited to safe lengths and formats
- **B.2 Dynamic Data Rendering**:
  - User reviews and ratings for each section (`Health`, `Skills`, `Community`, `Caregiver`) are loaded from a local JSON file and updated dynamically
  - Rating averages and pagination implemented

---

### **Category C: Authentication, Ratings & Security**
- **C.1 Authentication**:
  - LocalStorage-based login and registration system
  - Session stored as `currentUser` in `localStorage`
- **C.2 Role-based Access**:
  - Navigation and page access depend on user's role (`user` or `admin`)
- **C.3 Rating System**:
  - Each section includes a star rating system with comment input
  - User feedback is displayed with average rating and pagination
- **C.4 Security**:
  - Escaped user inputs to prevent XSS attacks (no `v-html` usage)
  - Front-end input validation for all form fields
  - All user-generated content is safely rendered as plain text
  - Measures follow [OWASP XSS prevention guidelines](https://owasp.org/www-community/xss-prevention)

---

## Tech Stack

- **Frontend**: Vue 3 + Vue Router + Composition API
- **Language Support**: i18n (`EN` / `中文` / `Urdu`)
- **Data Storage**: `localStorage` and local `.json` files
- **No CSS Framework**: All layout and styling use custom CSS

---

## Project Structure
<pre> src/ ├── assets/ ├── components/ │ └── Navbar.vue ├── views/ │ ├── HomeView.vue │ ├── LoginView.vue │ ├── RegisterView.vue │ ├── HealthView.vue │ ├── SkillsView.vue │ ├── CommunityView.vue │ ├── CaregiverView.vue │ ├── AboutView.vue │ ├── HelpView.vue │ ├── DonateView.vue │ ├── AdminView.vue │ └── AccessDenied.vue ├── data/ │ ├── users.json │ └── comments.json ├── router/ │ └── index.js ├── i18n/ │ └── messages.js ├── App.vue └── main.js </pre>

## Author
Zang Hao
Web Application Development – Assignment 2
Monash University, 2025

## License
This project is for educational use only.
No distribution or commercial use permitted.

