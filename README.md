# Prepmate 🤖

### Your personal AI interview coach. Practice with AI, land the job.

Prepmate is a web application designed to help students and aspiring developers practice for technical interviews. Users can sign in, upload their resume, and engage in a realistic, AI-powered interview that asks questions based on their specific skills and projects.

This project is being built for the [**Sagar Ghodke YouTube Channel**] (https://youtube.com/YOUR_CHANNEL_LINK_HERE) to demonstrate how to build a full-stack, AI-powered application from scratch.

![Prepmate Demo](https://link-to-your-demo-gif-or-screenshot.png)
*(**Note:** Replace this line with a screenshot or GIF of your app!)*

---

## ✨ Features

* **Google Authentication:** Secure sign-up and login using Supabase Auth.
* **Resume-Aware Interviews:** Upload your resume (PDF/DOCX) via Supabase Storage.
* **Dynamic Interview Setup:** Choose your desired role (Frontend, Backend, etc.).
* **Sequential Typing Animations:** An engaging hero section with looping, sequential typing.
* **Interactive AI Chat:** A distraction-free chat interface for the live interview.
* **Interview History Dashboard:** Fetches and displays all past interview reports from Supabase.
* **Row Level Security (RLS):** Securely handles user data so you can only access your own resumes and reports.

---

## 🛠️ Tech Stack

* **Frontend:** [React.js](https://react.dev/) (via Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Backend (BaaS):** [Supabase](https://supabase.com/)
    * **Auth:** Google Sign-In & User Management
    * **Database:** PostgreSQL for storing user profiles and interview history
    * **Storage:** For hosting user-uploaded resumes
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

To run this project locally, you will need to set up your own Supabase backend.

### 1. Supabase Backend Setup

1.  **Create a Project:** Go to [Supabase.com](https://supabase.com) and create a new project.
2.  **Get API Keys:** Go to **Project Settings** > **API**. You will need the **Project URL** and the **`anon` public key**.
3.  **Enable Google Auth:** Go to **Authentication** > **Providers** > **Google**. Follow the steps to add your Google Client ID and Secret.
4.  **Create Storage Bucket:** Go to **Storage** > **New bucket**.
    * Name the bucket `resumes`.
    * Make it a **Public** bucket.

5.  **Create Database Tables & RLS Policies:**
    Go to the **SQL Editor** and run the following queries one by one.

    ```sql
    -- 1. CREATE 'profiles' TABLE (to store resume URLs)
    CREATE TABLE public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      resume_url TEXT,
      resume_name TEXT,
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    -- 2. CREATE 'interview_history' TABLE (to store reports)
    CREATE TABLE public.interview_history (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT now(),
      role TEXT,
      overall_score INT,
      report_summary TEXT
    );

    -- 3. ENABLE ROW LEVEL SECURITY (RLS) FOR BOTH TABLES
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.interview_history ENABLE ROW LEVEL SECURITY;

    -- 4. CREATE RLS POLICIES FOR 'profiles'
    -- Allow users to read their own profile
    CREATE POLICY "Allow users to read their own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

    -- Allow users to create/update their own profile
    CREATE POLICY "Allow users to update their own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
    
    -- Allow users to create their profile if it doesn't exist
    CREATE POLICY "Allow users to create their profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

    -- 5. CREATE RLS POLICIES FOR 'interview_history'
    -- Allow users to read their own interview history
    CREATE POLICY "Allow users to read their own history"
    ON public.interview_history FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

    -- Allow users to create new interview history
    CREATE POLICY "Allow users to create new history"
    ON public.interview_history FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

    -- 6. CREATE RLS POLICIES FOR 'resumes' STORAGE
    -- Allow authenticated users to upload to the 'resumes' bucket
    CREATE POLICY "Allow authenticated users to upload resumes"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'resumes');
    ```

### 2. Frontend Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/Prepmate.git](https://github.com/your-username/Prepmate.git)
    cd Prepmate
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create your environment file:**
    Create a new file named `.env` in the root of the project. Copy your Supabase keys into it.
    ```
    VITE_SUPABASE_URL="YOUR_PROJECT_URL_HERE"
    VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY_HERE"
    ```

### 3. Run the App

1.  Start the Vite development server:
    ```sh
    npm run dev
    ```
2.  Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧑‍💻 Contact



Project Link: [https://github.com/your-username/Prepmate](https://github.com/your-username/Prepmate)