stream-forge-client/
├── public/
├── src/
│ ├── assets/ # Logos, icons, images
│ ├── components/ # Reusable UI (buttons, forms, modals)
│ │ ├── ui/ # Shadcn & daisyui-based components
│ │ └── shared/ # Shared components (Avatar, Navbar, Sidebar)
│ ├── features/ # Role-based feature areas
│ │ ├── creator/ # Creator-specific pages & components
│ │ │ ├── Dashboard.jsx
│ │ │ ├── VideoApproval.jsx
│ │ │ └── Comments.jsx
│ │ ├── editor/ # Editor-specific pages & components
│ │ │ ├── UploadVideo.jsx
│ │ │ ├── Revisions.jsx
│ │ │ └── Chat.jsx
│ ├── layouts/ # Layouts (MainLayout, AuthLayout, etc.)
│ ├── lib/ # Utilities (cn(), socket.js, api.js)
│ ├── pages/ # Page-level routes
│ │ ├── login.jsx
│ │ ├── signup.jsx
│ │ └── app.jsx # Routes all dashboard logic
│ ├── router/ # React Router v6 setup
│ ├── store/ # Zustand store (auth, chat, user state)
│ ├── styles/ # Global CSS, Tailwind entry
│ └── App.jsx # App entry point
├── index.html
├── jsconfig.json # Path aliases
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
