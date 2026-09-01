<div align="center">

# CIFAR-10 Full-Stack AI Application

A production-ready, high-performance deep learning web application built with a **FastAPI** inference backend and an **SEO-optimized Next.js** frontend.

[![FastAPI](https://img.shields.io/badge/FastAPI-0x005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)](https://www.tensorflow.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Overview

This project provides a robust framework for serving computer vision models in production. It features a modern Python backend using FastAPI and TensorFlow to process image classification queries against a trained CIFAR-10 `.keras` model, coupled with a responsive Next.js App Router client designed for lightning-fast user interactions and optimal search engine indexing.

---

## Architecture & Tech Stack

* **Backend:** FastAPI, Python 3.11+, TensorFlow/Keras, managed via `uv` for ultra-fast dependency resolution.
* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, managed via `pnpm`.
* **Infrastructure / Tunneling:** Cloudflare Tunnels for secure local development and external device previewing.

---

## Project Structure

```text
cifra10/
├── backend/
│   ├── models/
│   │   └── cifra10.keras       # Trained classification model weights
│   ├── main.py                 # FastAPI application and inference endpoints
│   ├── pyproject.toml          # Python project metadata and dependencies
│   ├── uv.lock                 # Locked dependency versions
│   └── README.md
├── frontend/
│   ├── app/                    # Next.js App Router pages, layout, and styles
│   ├── components/             # Reusable UI components (ImageClassifier, etc.)
│   ├── public/                 # Static assets and icons
│   ├── next.config.ts          # Next.js configuration and allowed dev origins
│   ├── package.json            # Node.js dependencies and scripts
│   └── tsconfig.json           # TypeScript configuration
└── README.md

```

---

## Getting Started & Installation

### Prerequisites

Ensure you have the following installed on your system:

* [Python 3.11+](https://www.google.com/search?q=https://www.python.org/)
* [`uv`](https://www.google.com/search?q=https://github.com/astral-sh/uv) (Fast Python package installer and resolver)
* [Node.js 18+](https://www.google.com/search?q=https://nodejs.org/)
* [`pnpm`](https://www.google.com/search?q=https://pnpm.io/) (Fast, disk space efficient package manager)

### 1. Clone the Repository

```bash
git clone git@github.com:dharmdevchai/cifra10.git
cd cifra10

```

### 2. Set Up and Run the Backend

Navigate to the backend directory, initialize your virtual environment, install dependencies, and launch the server:

```bash
cd backend

# Create virtual environment using uv
uv venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows (Command Prompt / PowerShell):
# .venv\Scripts\activate

# Install project dependencies
uv pip install -r pyproject.toml

# Run the FastAPI server
python main.py

```

*The backend API will be live at `http://localhost:8000` (API documentation accessible via `/docs`).*

### 3. Set Up and Run the Frontend

Open a **new terminal window**, navigate to the frontend directory, install package dependencies, and run the development build:

```bash
cd frontend

# Install dependencies with pnpm
pnpm install

# Start the Next.js development server
pnpm dev

```

*The frontend user interface will be live at `http://localhost:3000`.*

---

## Environment Variables & Configuration

### Frontend Configuration (`frontend/.env.local`)

To point your Next.js client application to your running FastAPI backend or an active Cloudflare Tunnel, create a `.env.local` file inside the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
# Or use your public tunnel URL during network testing:
# NEXT_PUBLIC_API_URL=[https://your-tunnel-url.trycloudflare.com](https://your-tunnel-url.trycloudflare.com)

```

### Handling Cross-Origin Dev Requests (`next.config.ts`)

If you access your Next.js dev server over local network IPs or public Cloudflare tunnels, ensure your hosts are whitelisted in `frontend/next.config.ts` under `allowedDevOrigins`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.19",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;

```

---

## Development Workflow

1. **Start Backend:** Keep the FastAPI server active in terminal tab 1 to handle inference calls.
2. **Expose (Optional):** Use Cloudflare Tunnels if you need to test live mobile access or remote sharing (`cloudflared tunnel --url http://localhost:3000` or `http://localhost:8000`).
3. **Start Frontend:** Run `pnpm dev` in terminal tab 2 to make code modifications with hot reloading enabled.

---

## License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
