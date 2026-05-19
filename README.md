# 🎵 Moodify – AI Mood-Based Music Player

Moodify is an AI-powered music player that detects user facial expressions and recommends songs based on mood analysis. The application combines real-time emotion detection with a secure full-stack architecture to deliver a personalized music experience.

---

## 🚀 Features

* 🔐 User Authentication (Login / Register)
* 🎭 Real-time facial expression detection using MediaPipe
* 🎵 Mood-based song recommendation system
* 📤 Song upload and retrieval functionality
* 🖼️ Image and media handling with ImageKit
* ⚡ Secure session handling with Redis token management
* 🚫 Token blacklisting for improved authentication security
* 🌐 RESTful APIs with modular backend architecture
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Redis

### AI / Media

* MediaPipe
* ImageKit

### Tools

* Git
* GitHub
* Postman

---

## 📂 Project Structure

Backend follows a modular architecture:

```bash
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── validators
├── app.js
```

Frontend structure:

```bash
├── app
├── features
├── main.jsx
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/krishnakansal004/Moodify.git
```

Move into project directory:

```bash
cd Moodify
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
PORT=
MONGO_URI=
JWT_SECRET=
REDIS_URL=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Run project:

```bash
npm run dev
```

---

## 💡 Future Improvements

* Spotify API integration
* Playlist generation based on detected mood
* Real-time music streaming
* User listening history
* Favorite songs and playlists
* Recommendation optimization
* Use AI assistance for UI refinement and styling suggestions while keeping the project logic and implementation manual.

---

## 👨‍💻 Author

Krishna Kansal

GitHub: https://github.com/krishnakansal004

LinkedIn: https://linkedin.com/in/krishna-kansal

---

If you found this project interesting, consider giving it a ⭐
