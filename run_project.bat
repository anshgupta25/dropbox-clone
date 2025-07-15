@echo off
echo ============================================
echo Setting up Dropbox Clone Backend
echo ============================================
cd dropbox-clone-backend-python

echo Creating virtual environment if not present...
if not exist "venv" (
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing backend dependencies...
pip install -r requirements.txt

echo Starting backend server on http://localhost:8000 ...
start cmd /k "cd dropbox-clone-backend-python && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

cd ..
timeout /t 3

echo ============================================
echo Setting up Dropbox Clone Frontend
echo ============================================
cd dropbox-clone-frontend

echo Installing frontend dependencies...
npm install

echo Starting frontend dev server on http://localhost:5173 ...
start cmd /k "cd dropbox-clone-frontend && npm run dev"

echo ============================================
echo Dropbox Clone is starting:
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:5173
echo ============================================
pause
