from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
from . import database, models, crud, schemas, utils

models.Base.metadata.create_all(bind=database.engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For testing; restrict to ["http://localhost:5173"] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

ALLOWED_TYPES = ['text/plain', 'image/jpeg', 'image/png', 'application/json' , "application/pdf" ]

@app.post("/upload", response_model=schemas.FileSchema)
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_location = os.path.join(utils.UPLOAD_FOLDER, file.filename)

    with open(file_location, "wb") as f:
        f.write(await file.read())

    file_size = os.path.getsize(file_location)

    db_file = crud.create_file(
        db,
        filename=file.filename,
        filepath=file_location,
        filetype=file.content_type,
        size=file_size
    )
    return db_file

@app.get("/files", response_model=list[schemas.FileSchema])
def list_files(db: Session = Depends(get_db)):
    return crud.get_files(db)


@app.get("/files/{file_id}/download")
def download_file(file_id: int, db: Session = Depends(get_db)):
    db_file = crud.get_file_by_id(db, file_id)
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(path=db_file.filepath, filename=db_file.filename)


@app.get("/files/{file_id}/view")
def view_file(file_id: int, db: Session = Depends(get_db)):
    db_file = crud.get_file_by_id(db, file_id)
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    metadata = {
        "id": db_file.id,
        "filename": db_file.filename,
        "filetype": db_file.filetype,
        "upload_date": db_file.upload_date,
    }

    if db_file.filetype.startswith("text") or db_file.filetype == "application/json":
        with open(db_file.filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        metadata['content'] = content
        return metadata

    elif db_file.filetype.startswith("image") or db_file.filetype == "application/pdf":
        return FileResponse(path=db_file.filepath, media_type=db_file.filetype)

    else:
        raise HTTPException(status_code=415, detail="Unsupported file type for viewing")