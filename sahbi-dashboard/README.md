# Sahbi Admin Dashboard

Web admin panel to manage the Sahbi mobile app: events, users, bookings, and chats.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL**
   - Copy `.env.example` to `.env`
   - Set `VITE_API_URL` to your backend (e.g. `http://localhost:5000/api`)

3. **Create an admin user**
   - Register or use an existing user in the mobile app / backend
   - In MongoDB, set `role: "admin"` for that user:
     ```js
     db.users.updateOne(
       { email: "your-admin@email.com" },
       { $set: { role: "admin" } }
     )
     ```

4. **Run the dashboard**
   ```bash
   npm run dev
   ```

5. **Login**
   - Go to `/login`
   - Sign in with your admin account (email + password)

## Features

- **Dashboard** – Overview stats (users, events, bookings, chats)
- **Events** – Add, edit, delete events
- **Users** – View, edit, delete users; change role (user/admin)
- **Bookings** – View all bookings; update status (pending/confirmed/cancelled)
- **Chats** – View all chats, participants, and messages; delete chats
