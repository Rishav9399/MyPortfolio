readme_content = """
<div align="center">

# ⟨ NEURAL_OS // V1.0 ⟩

<br />

<img src="https://img.shields.io/badge/NEXT.JS_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/FRAMER_MOTION-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
<img src="https://img.shields.io/badge/TAILWIND_V4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<br />
<img src="https://img.shields.io/badge/FASTAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
<img src="https://img.shields.io/badge/PYTHON-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/RAG_AI_PIPELINE-BC13FE?style=for-the-badge&logo=openai&logoColor=white" alt="GenAI" />

<br /><br />

> *"A physics-driven, AI-integrated portfolio environment engineered for the modern web."*

<br />

</div>

---

## ⚡ [01] SYSTEM_OVERVIEW

**Neural OS (v1.0)** is not a static portfolio template. It is a custom-engineered web application operating as a **"living" environment**. Bridging the gap between heavy AI backend logic and fluid, human-centric interfaces, this project utilizes liquid physics, momentum scrolling, dynamic layout morphing, and native browser sensory APIs to create an immersive, game-like experience.

The system serves as a digital proxy for **Rishav**, an iterative builder specializing in robust RAG pipelines, FastAPI orchestration, and Next.js frontend architecture.

---

## 🏗️ [02] CORE_ARCHITECTURE & TECHNOLOGIES

This system operates on a split-monorepo design, separating the high-speed client rendering from the heavy AI inference engine.

| LAYER | TECHNOLOGY STACK | PURPOSE |
| :--- | :--- | :--- |
| **CLIENT OS** | `Next.js 16` • `React Hooks` | App Router & Core Rendering Engine |
| **PHYSICS** | `Framer Motion` • `Lenis` | Spring Mathematics, Layout Morphing & Scroll Hijacking |
| **STYLING** | `Tailwind v4` • `Lucide` | Utility classes & Scalable SVG Iconography |
| **SENSORY** | `Web Audio API` • `Speech API` | Real-time mathematical click synthesis & AI voice generation |
| **NEURAL PROXY**| `FastAPI` • `Python 3.10` | High-performance async backend & Route Handling |
| **BRAIN (RAG)** | `LangChain` • `Qdrant` | Context Engineering & Vector Search on `me.md` |

---

## 🧮 [03] PHYSICS_&_MATH_PROTOCOLS

<details>
<summary><b>▸ SPRING PHYSICS (EXPAND)</b></summary>
<br/>
Instead of linear CSS transitions, UI elements use simulated spring mathematics to follow a damped harmonic oscillator model.
<ul>
<li><b>The Tuning:</b> <code>stiffness: 280, damping: 25, mass: 0.8</code>.</li>
<li><b>Result:</b> Elements react aggressively but settle firmly, creating a sensation of interacting with heavy, expensive machinery. Applied globally to the <code>BentoGrid</code> layout engine.</li>
</ul>
</details>

<details>
<summary><b>▸ INTERPOLATION TIMELINES (SCROLL MAPPING)</b></summary>
<br/>
The user's vertical scroll position (0 to 1) is mapped directly to multidimensional arrays controlling horizontal translation and opacity.
<ul>
<li><b>Example:</b> <code>useTransform(smoothScroll, [0, 0.05, 0.4, 1], ["0%", "0%", "-150%", "-150%"])</code></li>
<li><b>Result:</b> The massive <code>SYS_ARCHITECT</code> watermark splits dynamically to reveal the bio exactly based on mouse wheel momentum.</li>
</ul>
</details>

<details>
<summary><b>▸ NATIVE SENSORY ALGORITHMS</b></summary>
<br/>
<b>No .mp3 files are used.</b> 
<ul>
<li><b>Audio Oscillators:</b> Mechanical clicks are generated via a <code>square</code> wave oscillator starting at 400Hz and decaying to 0.001 instantly.</li>
<li><b>Voice Synthesis:</b> An aggressive hunting algorithm scans the OS registry for premium female voices (e.g., <i>Samantha</i>, <i>Zira</i>) tuned to pitch <code>1.1</code> and rate <code>0.95</code> for ultimate fluidity.</li>
</ul>
</details>

---

## 🤖 [04] THE NEURAL PROXY (AI AGENT)

The system features a floating HUD acting as a digital clone of the creator.

* **The Interface:** Designed as a secure Unix terminal featuring isolated scroll-containment (`onWheel={(e) => e.stopPropagation()}`) to prevent background physics bleed.
* **The Fuel Gauge:** A dynamic progress bar tied to state (`remaining / 33 CYCLES`) reflecting active API usage limits.
* **The Brain:** When queried, the React frontend executes a payload to the Python/FastAPI server. A **RAG Pipeline** scans a custom context file (`me.md`) to stream a contextually accurate response about Rishav's technical specs.

---

## 🚀 [05] BOOT_PROTOCOL (INSTALL)

To instantiate Neural OS locally, execute the following directives via Terminal.

▸ INITIATE BACKEND (NEURAL CORE)
Bash
cd backend
python -m venv venv

# Activate:
# [Windows]: venv\Scripts\activate 
# [Mac/Linux]: source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
Wait for the terminal to confirm: [INFO] RAG Context Engine online.

▸ INITIATE FRONTEND (CLIENT OS)
Open a new terminal window:

Bash
cd frontend
npm install
npm run dev --turbo
Navigate to http://localhost:3000 to begin the Boot Sequence.
