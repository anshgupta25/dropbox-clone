
---

## ✅ **setup_dependencies.bat**

```bat
@echo off
echo ============================================
echo Installing Backend Dependencies
echo ============================================
cd dropbox-clone-backend-python

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

cd ..
echo ============================================
echo Backend dependencies installed
echo ============================================

echo ============================================
echo Installing Frontend Dependencies
echo ============================================
cd dropbox-clone-frontend
npm install

cd ..
echo ============================================
echo All dependencies installed!
echo ============================================
pause
