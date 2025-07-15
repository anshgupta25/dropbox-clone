# Dropbox Clone (Fullstack Project)

This is a fullstack Dropbox-like clone where users can:
- Upload files
- View uploaded files
- Download files
- Preview supported formats (text, images, PDFs)
- View file metadata like size, type, upload date

---

## 🔧 Tech Stack

- **Backend**: Python, FastAPI, SQLite, SQLAlchemy
- **Frontend**: React (Vite), Material UI

---

## ✅ Requirements

- **Python 3.9+**
- **Node.js 16+**
- **npm** (comes with Node.js)
- **Git** (optional, for cloning repository)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/anshgupta25/dropbox-clone.git
cd dropbox-clone
2️⃣ Install All Dependencies
Run the batch script to install dependencies for both frontend & backend:

bash
Copy
Edit
setup_dependencies.bat
Alternatively, install them manually:

🔵 Backend Setup
bash
Copy
## 1️⃣ Clone the Repository
cd dropbox-clone-backend-python
python -m venv venv
venv\Scripts\activate
## 2️⃣ Install Dependencies
🟢 Frontend Setup
bash
Copy
Edit
cd ..\dropbox-clone-frontend
npm install
▶️ Running the Application
Start Backend
bash
Copy
Edit
cd dropbox-clone-backend-python
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
## ▶️ Running the Application

### Start Backend
👉 http://localhost:8000

Start Frontend
bash
Copy
Edit
cd ..\dropbox-clone-frontend
npm run dev
Runs at:
👉 http://localhost:5173

✅ Features
Upload: .txt, .png, .jpg, .json, .pdf

View file content (Text, JSON, Images, PDFs)

Download files

See file metadata: filename, size, type, uploaded date

Responsive frontend with Material UI

🛠 Technology Stack
Layer	Technology
Backend	FastAPI (Python)
Database	SQLite
Frontend	React + Vite + Material UI