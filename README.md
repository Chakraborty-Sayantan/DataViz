# DataViz: AI-Powered Analytics Dashboard

![Project Banner](https://img.shields.io/badge/Status-Development-blue?style=for-the-badge) ![Tech Stack](https://img.shields.io/badge/Stack-Next.js_16_%7C_React_19_%7C_Tailwind_4-black?style=for-the-badge)

**DataViz** is a cutting-edge analytics platform designed to bridge the gap between complex data and actionable insights. Built with **Next.js 16** and **React 19**, it leverages Generative AI and dynamic visualizations to empower users with real-time financial intelligence, route optimization, and intuitive data exploration.

---

## 🚀 Key Features

### 🤖 AI Analyst (Gemini Powered)
*   **Natural Language Queries**: Ask questions about your data in plain English.
*   **Automated Insights**: Get instant summaries, trend analysis, and anomaly detection.
*   **Smart Charting**: The AI automatically selects and configures the best visualizations (Scatter, Pie, Line) for your query.

### 📊 Interactive Dashboard
*   **Dynamic Visualizations**: High-performance 2D and 3D charts powered by `Recharts` and `Framer Motion`.
*   **Real-Time Data**: Live updates for financial metrics, bookings, and user activity.
*   **Drill-Down Capabilities**: Interactively explore data hierarchies with smooth transitions.

### 💳 Digital Wallet System
*   **Points & Rewards**: Earn points for platform activity and convert them to currency.
*   **Transaction History**: Detailed tracking of all credits, debits, and conversions.
*   **Seamless Booking**: integrated payments for ride bookings and services.

### 🗺️ Geo-Intelligence
*   **Route Optimization**: Google Maps integration for AI-driven travel planning.
*   **Smart Estimates**: accurate travel times and cost predictions based on live traffic data.

---

## 🛠️ Tech Stack

### Core
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Library**: [React 19](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

### Styling & UI
*   **CSS Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Components**: Radix UI / Shadcn UI primitives

### Backend & AI
*   **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
*   **Model Provider**: Google Gemini API
*   **State Management**: Zustand
*   **Database**: (To be configured - e.g., Supabase/PostgreSQL)

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   **Node.js**: v18.17 or higher
*   **npm**: v9 or higher

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Chakraborty-Sayantan/DataViz.git
    cd DataViz
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add the following keys:
    ```env
    # AI Configuration
    GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key_here

    # Maps Configuration
    NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_maps_key_here
    
    # App Config
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 Scripts & Workflows

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with TurboPack. |
| `npm run build` | Builds the application for production usage. |
| `npm run start` | Starts a Next.js production server. |
| `npm run lint` | Runs ESLint to check for code quality and errors. |

---

## 🤝 Contributing

We welcome contributions! Please follow our [Git Workflow](.github/CONTRIBUTING.md) to ensure smooth collaboration.

1.  **Fork** the repository.
2.  **Create** a feature branch (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'feat: Add some AmazingFeature'`).
4.  **Push** to the branch (`git push origin feature/AmazingFeature`).
5.  **Open** a Pull Request.

---

<p align="center">
  Built with ❤️ by the DataViz Team
</p>
