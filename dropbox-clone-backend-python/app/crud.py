from sqlalchemy.orm import Session
from . import models

def create_file(db: Session, filename: str, filepath: str, filetype: str):
    db_file = models.File(filename=filename, filepath=filepath, filetype=filetype)
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

def get_files(db: Session):
    return db.query(models.File).all()

def get_file_by_id(db: Session, file_id: int):
    return db.query(models.File).filter(models.File.id == file_id).first()
