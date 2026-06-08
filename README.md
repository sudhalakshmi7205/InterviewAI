# InterviewAI 🤖 

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Llama3](https://img.shields.io/badge/Llama_3.3-Groq-FF5A00?style=for-the-badge)
![MediaPipe](https://img.shields.io/badge/MediaPipe-ML_Vision-4285F4?style=for-the-badge&logo=google)

InterviewAI is a full-stack, enterprise-grade AI interview platform. It simulates highly realistic technical and behavioral interviews by utilizing ultra-fast Large Language Models (Llama 3.3 via Groq) and runs real-time client-side machine learning for strict anti-cheat monitoring.

## ✨ Features

* **Hyper-Realistic AI Interviewer:** Powered by Llama 3.3, the AI parses candidate speech in real-time, refuses to accept generic answers, and asks highly personalized, technically deep follow-up questions.
* **Real-Time Cheat Detection:** Implements Google's `MediaPipe` WebAssembly vision models directly in the browser. It runs at 60fps to track the candidate's face, instantly flagging missing faces, multiple people in frame, and tab-switching violations.
* **Advanced Sentiment & Confidence Analytics:** Parses linguistics and filler words to generate a precise 1-10 "Confidence" and "Sentiment" score for every single answer.
* **Secure Admin Dashboard:** A protected overview hub for hiring managers to securely stream hidden `.webm` webcam recordings, read raw transcripts, and review anti-cheat security logs.
* **Database Security (RLS):** Built on Supabase (PostgreSQL) with strict Row Level Security (RLS) to ensure unauthorized users cannot scrape or leak candidate data.

## 🏗️ System Architecture

* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS (Glassmorphism UI)
* **Backend:** Next.js Server Actions, Supabase PostgreSQL
* **Authentication:** Clerk Auth + Middleware
* **AI & Machine Learning:** Groq (Llama 3.3 70B), Google MediaPipe Tasks Vision, Browser SpeechRecognition API
* **Storage:** Supabase Storage (for `.webm` video blobs)

## 🧠 Technical Challenges Solved

1. **Client-Side ML Performance:** Running facial recognition natively in the browser can destroy a user's CPU. I solved this by importing the lightweight `.wasm` MediaPipe model via CDN and executing the detection loop inside a heavily optimized `requestAnimationFrame` cycle.
2. **Database-Backed Rate Limiting:** Vercel's Serverless environment clears memory variables across regions. I mitigated API abuse by building a persistent, database-backed rate limiter directly in PostgreSQL that counts `messages` throughput on the edge.
3. **Resilient State Management:** If a candidate accidentally refreshes the page mid-interview, all React state is lost. I built a seamless session-restoration protocol that securely fetches the active `session_id` and existing chat history from Supabase before the DOM paints.

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* A free Supabase account
* A free Clerk account
* A free Groq API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interviewai.git
cd interviewai
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables (`.env.local`):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
GROQ_API_KEY=gsk_...
```

4. Run the development server:
```bash
npm run dev
```

## 📄 License
This project is open-source and available under the MIT License.
