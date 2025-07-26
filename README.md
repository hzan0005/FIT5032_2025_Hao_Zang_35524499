# FIT5032_2025_Hao_Zang_35524499
# A2 (15%): Basic Web App 
# Healthy Seniors Charity Website

This is a Vue 3 + Vite based web application designed for a charity organization focused on supporting older Australians. The website provides health information, community programs, digital skills training, and caregiver resources.

---

## Features

- **Responsive Navigation Bar:**  
  Supports multi-language switching (English, Chinese, Urdu), font size adjustment, and accessibility options.

- **User Registration and Login:**  
  Includes robust client-side validation for usernames and passwords with password strength enforcement.

- **Localization:**  
  Fully internationalized interface with `vue-i18n`.

- **Dynamic Content:**  
  Data-driven pages loading from JSON and Vue state.

- **Global Footer Component:**  
  Consistent footer across all pages.

- **State Management:**  
  Local storage used for user data persistence (with potential for backend integration).

- **Routing:**  
  Vue Router used for seamless page navigation.

- **Accessibility:**  
  Font size controls and screen reader support.

---

## Project Structure

- `/src/components` — Reusable Vue components like `Navbar.vue` and `Footer.vue`  
- `/src/views` — Page components (`HomeView.vue`, `LoginView.vue`, `RegisterView.vue`, `LoginView.vue`, `AboutView.vue`)  
- `/public/data` — Static JSON files for initial user data and other content  
- `/src/i18n.js` — Localization setup and language messages  
- `/src/App.vue` — Root component containing global layout (navbar, footer, router-view)

---

## Setup and Run

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Start development server:**

    ```bash
    npm run dev
    ```

3. **Build for production:**

    ```bash
    npm run build
    ```

4. **Preview production build locally:**

    ```bash
    npm run preview
    ```

---

## User Management Notes

- User registration data is currently stored in the browser's **localStorage**.  
- Initial user data is seeded from a static JSON file (`/public/data/users.json`).  
- Login verifies credentials against both the JSON data and locally stored users.  
- Future improvements may include backend API integration for persistent user management.

---

## Internationalization (i18n)

- Supported languages:  
  - English (`en`)  
  - Simplified Chinese (`zh`)  
  - Urdu (`ur`)  

- All UI text, buttons, validation messages, navigation items, and footer content are localized.  
- Language switcher in the header updates the interface dynamically.

---

## Accessibility Features

- Adjustable font size controls to improve readability.  
- Screen reader support button for enhanced accessibility.  
- Responsive design for desktop and mobile devices.

---

## Contribution

Contributions are welcome! Please fork the repository and submit pull requests for bug fixes or enhancements.

---

## License

This project is licensed under the MIT License.

---

© 2025 Healthy Seniors Charity
