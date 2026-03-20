<div align="center">

# 🎵 Music App — Spotify-like Streaming Platform

A full-featured music streaming web application built with React, inspired by Spotify's UI and UX.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.16-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.2-FF6B35?style=for-the-badge)

</div>

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

> **Requires:** Backend running at `http://localhost:8080/mymusic/v1`

---

## ✨ Features

### 🎧 Music Player
- Full audio playback with HTML5 `<audio>` element
- Play / Pause / Previous / Next track controls
- Seekable progress bar with timestamp display
- Volume slider control
- Auto-play next song in queue
- Queue-based playback system
- Now Playing display (cover art, song name, artist)

### 🔍 Search
- Multi-type search: Songs, Artists, Playlists
- Real-time search with URL query parameters
- Top Results tab with combined results
- Instant suggestions while typing

### 📂 Playlists
- Create, update, and delete personal playlists
- Add / remove songs from playlists
- View full playlist with song table (artist, date, duration)
- Currently playing indicator in playlist view
- Empty playlist state with inline song search

### 🎤 Artists
- Artist profile page with banner and bio
- Verified artist badge and follower count
- Popular songs listing with listener counts
- Play all songs by artist

### 💿 Albums
- Album detail page with cover art and metadata
- Full tracklist with individual play controls
- Album total duration display

### 🎵 Song Details
- Track detail page with large cover art
- Full metadata: artist, album, release date, duration, listen count
- Add to playlist from track page

### 👤 Authentication
- Email/password login with session token
- User registration (name, email, date of birth, password)
- Forgot password with email verification and OTP code
- Persistent session via `sessionStorage`
- User dropdown: Account settings and Logout

### 💎 Premium Plans
| Plan | Price | Highlights |
|------|-------|-----------|
| Mini | 30,000đ / month | Up to 30 offline songs, basic quality |
| Individual | 79,000đ / 3 months | Premium account, cancel anytime |
| Super | 169,500đ / 6 months | Verified account, ~28,000đ/month |
| Diamond | 349,000đ / year | Verified account, best value |

- Ad-free listening, offline downloads, high audio quality
- Payment gateway integration

### 👤 User Profile
- Edit name, email, date of birth
- Password update with validation

### 🛠️ Admin Panel *(admin accounts only)*
- **Dashboard Stats** — Total songs, albums, artists, users, playlists
- **Songs** — Full CRUD with audio & image upload
- **Albums** — Create and manage albums
- **Artists** — Manage artists with image, follower count, linked songs
- **Users** — View and manage user accounts
- **Playlists** — Admin-level playlist management
- **File Upload** — Audio (MP3) and image uploads with delete support

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + React Router 7 |
| Build Tool | Vite 6 with SWC |
| State Management | Zustand 5 |
| Styling | Tailwind CSS 3 + shadcn/ui + Radix UI |
| HTTP Client | Axios 1.7 |
| Authentication | Session token (sessionStorage) + Clerk |
| Icons | Lucide React + FontAwesome 6 |
| Notifications | React Hot Toast |
| Date Utilities | date-fns 3 |

---

## 📁 Project Structure

```
src/
├── pages/              # Top-level pages (Home, Admin, Account, Login)
├── features/
│   ├── admin/          # Admin CRUD panels (Songs, Albums, Artists, Users, Playlists)
│   ├── main/           # User features (search, playlists, artists, albums, tracks)
│   ├── account/        # Profile and Premium pages
│   ├── auth/           # Login, SignUp, Forgot Password, Verify Code
│   └── player/         # Audio player and playback controls
├── UI/                 # Layout: AppLayout, LeftSidebar, Header, DeleteDialog
├── store/              # Zustand stores (auth, music, player, playlist, search, ...)
├── services/           # API call functions
├── providers/          # AuthProvider context
├── components/ui/      # shadcn/ui primitives
├── lib/                # Axios instance, utilities
└── loadingSkeleton/    # Skeleton loading components
```

---

## 🌐 API

Base URL: `http://localhost:8080/mymusic/v1`

Key endpoint groups: `/auth`, `/songs`, `/albums`, `/artists`, `/playlists`, `/users`, `/search-by-priority`, `/file/upload`, `/payment`

